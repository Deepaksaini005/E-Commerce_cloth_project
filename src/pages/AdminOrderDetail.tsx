import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  ArrowLeft, Package, MapPin, CreditCard, Gift, 
  Clock, CheckCircle, Truck, XCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Order {
  id: string;
  order_number: string;
  status: string;
  grand_total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  created_at: string;
  updated_at: string;
  items: any[];
  shipping_address: any;
  payment_method: string | null;
  promo_code: string | null;
  gift_wrap: boolean | null;
  gift_message: string | null;
  user_id: string | null;
}

const statusOptions = [
  { value: 'pending', label: 'Pending', icon: Clock, color: 'text-amber-500' },
  { value: 'processing', label: 'Processing', icon: Package, color: 'text-blue-500' },
  { value: 'shipped', label: 'Shipped', icon: Truck, color: 'text-purple-500' },
  { value: 'delivered', label: 'Delivered', icon: CheckCircle, color: 'text-green-500' },
  { value: 'cancelled', label: 'Cancelled', icon: XCircle, color: 'text-destructive' },
];

const AdminOrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, isAdmin, isLoading } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/admin');
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (id && user && isAdmin) {
      fetchOrder();
    }
  }, [id, user, isAdmin]);

  const fetchOrder = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id!)
      .maybeSingle();

    if (data) setOrder(data as Order);
    else if (error) toast.error('Failed to load order');
    setLoading(false);
  };

  const updateStatus = async (newStatus: string) => {
    if (!order) return;
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', order.id);

    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success(`Status updated to ${newStatus}`);
      setOrder({ ...order, status: newStatus });
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl mb-4">Order not found</h2>
          <Button onClick={() => navigate('/admin/dashboard')} className="btn-primary">Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const address = order.shipping_address as any;

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return map[status] || 'bg-secondary text-secondary-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin/dashboard')}
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft size={16} className="mr-2" /> Back
            </Button>
            <div>
              <h1 className="font-display text-xl font-semibold">Order #{order.order_number}</h1>
              <p className="text-xs text-primary-foreground/60">
                {new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
          <Select value={order.status} onValueChange={updateStatus}>
            <SelectTrigger className="w-40 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(s => (
                <SelectItem key={s.value} value={s.value}>
                  <span className="flex items-center gap-2">
                    <s.icon size={14} className={s.color} />
                    {s.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="px-5 py-4 bg-muted/30 border-b border-border">
                <h2 className="font-display text-lg flex items-center gap-2">
                  <Package size={18} /> Order Items ({(order.items as any[]).length})
                </h2>
              </div>
              <div className="divide-y divide-border">
                {(order.items as any[]).map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded border border-border" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Size: {item.selectedSize} · Color: {item.selectedColor}
                      </p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${(Number(item.price) * Number(item.quantity)).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Timeline */}
            <div className="border border-border rounded-lg p-5">
              <h2 className="font-display text-lg mb-4">Order Status</h2>
              <div className="space-y-4">
                {statusOptions.map((s, i) => {
                  const currentIndex = statusOptions.findIndex(opt => opt.value === order.status);
                  const isActive = i <= currentIndex;
                  const isCurrent = s.value === order.status;
                  
                  if (order.status === 'cancelled' && s.value !== 'cancelled' && s.value !== 'pending') return null;

                  return (
                    <div key={s.value} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCurrent ? 'bg-accent text-accent-foreground' : isActive ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
                      }`}>
                        <s.icon size={14} />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</p>
                        {isCurrent && (
                          <p className="text-xs text-muted-foreground">Current status</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <div className="border border-border rounded-lg p-5">
              <h3 className="font-display text-lg mb-4">Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${Number(order.subtotal).toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>${Number(order.shipping).toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${Number(order.tax).toFixed(2)}</span></div>
                {Number(order.discount) > 0 && (
                  <div className="flex justify-between text-green-600"><span>Discount</span><span>-${Number(order.discount).toFixed(2)}</span></div>
                )}
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between font-medium text-base">
                  <span>Total</span><span>${Number(order.grand_total).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping */}
            {address && (
              <div className="border border-border rounded-lg p-5">
                <h3 className="font-display text-lg mb-3 flex items-center gap-2"><MapPin size={16} /> Shipping</h3>
                <div className="text-sm space-y-1">
                  <p className="font-medium">{address.firstName} {address.lastName}</p>
                  <p className="text-muted-foreground">{address.address}</p>
                  {address.apartment && <p className="text-muted-foreground">{address.apartment}</p>}
                  <p className="text-muted-foreground">{address.city}, {address.postalCode}</p>
                  <p className="text-muted-foreground">{address.country}</p>
                  {address.phone && <p className="text-muted-foreground mt-2">📞 {address.phone}</p>}
                  {address.email && <p className="text-muted-foreground">✉️ {address.email}</p>}
                </div>
              </div>
            )}

            {/* Payment */}
            <div className="border border-border rounded-lg p-5">
              <h3 className="font-display text-lg mb-3 flex items-center gap-2"><CreditCard size={16} /> Payment</h3>
              <p className="text-sm capitalize">{order.payment_method || 'N/A'}</p>
              {order.promo_code && (
                <p className="text-xs text-accent mt-2">Promo: {order.promo_code}</p>
              )}
            </div>

            {/* Gift */}
            {order.gift_wrap && (
              <div className="border border-border rounded-lg p-5">
                <h3 className="font-display text-lg mb-3 flex items-center gap-2"><Gift size={16} /> Gift Wrap</h3>
                <p className="text-sm text-muted-foreground">{order.gift_message || 'No message'}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminOrderDetail;
