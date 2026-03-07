import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Users, Clock, Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface GroupDealProps {
  productId: string;
  productName: string;
  productPrice: number;
}

interface GroupDeal {
  id: string;
  invite_code: string;
  min_members: number;
  discount_percent: number;
  expires_at: string;
  status: string;
  members_count: number;
}

const GroupDeal = ({ productId, productName, productPrice }: GroupDealProps) => {
  const { user } = useAuth();
  const [deal, setDeal] = useState<GroupDeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    fetchActiveDeal();
  }, [productId]);

  useEffect(() => {
    if (!deal) return;
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(deal.expires_at).getTime();
      const diff = end - now;
      if (diff <= 0) {
        setTimeLeft('Expired');
        clearInterval(timer);
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, [deal?.expires_at]);

  const fetchActiveDeal = async () => {
    setLoading(true);
    const { data: deals } = await supabase
      .from('group_deals')
      .select('*')
      .eq('product_id', productId)
      .eq('status', 'active')
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1);

    if (deals && deals.length > 0) {
      const d = deals[0];
      // Count members
      const { count } = await supabase
        .from('group_deal_members')
        .select('*', { count: 'exact', head: true })
        .eq('group_deal_id', d.id);

      setDeal({
        id: d.id,
        invite_code: d.invite_code,
        min_members: d.min_members,
        discount_percent: Number(d.discount_percent),
        expires_at: d.expires_at,
        status: d.status,
        members_count: count || 0,
      });
    }
    setLoading(false);
  };

  const createDeal = async () => {
    if (!user) {
      toast.error('Please sign in to start a group deal');
      return;
    }
    setCreating(true);
    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase.from('group_deals').insert({
      product_id: productId,
      creator_user_id: user.id,
      invite_code: inviteCode,
      min_members: 4,
      discount_percent: 25,
      expires_at: expiresAt,
    }).select().single();

    if (error) {
      toast.error('Failed to create group deal');
      setCreating(false);
      return;
    }

    // Creator joins automatically
    await supabase.from('group_deal_members').insert({
      group_deal_id: data.id,
      user_id: user.id,
    });

    toast.success('Group deal created! Share the link with friends.');
    setCreating(false);
    fetchActiveDeal();
  };

  const joinDeal = async () => {
    if (!user) {
      toast.error('Please sign in to join a group deal');
      return;
    }
    if (!deal) return;

    const { error } = await supabase.from('group_deal_members').insert({
      group_deal_id: deal.id,
      user_id: user.id,
    });

    if (error) {
      if (error.code === '23505') toast.info('You already joined this group deal!');
      else toast.error('Failed to join group deal');
      return;
    }

    toast.success('You joined the group deal!');
    fetchActiveDeal();
  };

  const copyInviteLink = () => {
    if (!deal) return;
    const link = `${window.location.origin}/product/${productId}?group=${deal.invite_code}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success('Invite link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const discountedPrice = useMemo(() => {
    if (!deal) return productPrice;
    return productPrice * (1 - deal.discount_percent / 100);
  }, [deal, productPrice]);

  const progress = deal ? (deal.members_count / deal.min_members) * 100 : 0;
  const isComplete = deal ? deal.members_count >= deal.min_members : false;

  if (loading) return null;

  return (
    <div className="border border-accent/20 rounded-xl p-5 bg-gradient-to-br from-accent/5 to-transparent">
      <div className="flex items-center gap-2 mb-3">
        <Users size={18} className="text-accent" />
        <h3 className="font-display text-base font-semibold">Group Buy Deal</h3>
      </div>

      {!deal ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Start a group deal! Get <span className="text-accent font-semibold">25% off</span> when 4 friends join within 24 hours.
          </p>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground line-through">${productPrice}</span>
            <span className="text-accent font-bold text-lg">${(productPrice * 0.75).toFixed(0)}</span>
            <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">per person</span>
          </div>
          <Button onClick={createDeal} disabled={creating} className="w-full" variant="outline">
            <Users size={16} className="mr-2" />
            {creating ? 'Creating...' : 'Start Group Deal'}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Progress */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">{deal.members_count}/{deal.min_members} joined</span>
              {isComplete ? (
                <span className="text-green-500 font-medium">✓ Deal Unlocked!</span>
              ) : (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock size={14} />
                  <span>{timeLeft}</span>
                </div>
              )}
            </div>
            <Progress value={progress} className="h-2.5" />
          </div>

          {/* Price comparison */}
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground line-through text-sm">${productPrice}</span>
            <span className={`font-bold text-lg ${isComplete ? 'text-green-500' : 'text-accent'}`}>
              ${discountedPrice.toFixed(0)}
            </span>
            <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
              Save {deal.discount_percent}%
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {!isComplete && (
              <Button onClick={joinDeal} className="flex-1" size="sm">
                Join Deal
              </Button>
            )}
            <Button onClick={copyInviteLink} variant="outline" size="sm" className="flex-1">
              {copied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
              {copied ? 'Copied!' : 'Share Link'}
            </Button>
          </div>

          {/* Members visual */}
          <div className="flex items-center gap-1">
            {Array.from({ length: deal.min_members }).map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-colors ${
                  i < deal.members_count
                    ? 'bg-accent/20 border-accent text-accent'
                    : 'bg-muted/30 border-border text-muted-foreground'
                }`}
              >
                {i < deal.members_count ? '✓' : '?'}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDeal;
