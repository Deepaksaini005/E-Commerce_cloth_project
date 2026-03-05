import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, Heart, LogOut, Settings, ChevronRight, MapPin, ShoppingBag, Star, Truck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Order {
  id: string;
  order_number: string;
  status: string;
  grand_total: number;
  created_at: string;
  items: any[];
}

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, profile, isLoading, signOut, updateProfile } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', phone: '' });

  useEffect(() => {
    if (!isLoading && !user) navigate('/auth');
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (profile) setFormData({ full_name: profile.full_name || '', phone: profile.phone || '' });
  }, [profile]);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) setOrders(data as Order[]);
  };

  const handleSaveProfile = async () => {
    const { error } = await updateProfile(formData);
    if (error) { toast.error(error); } else { toast.success('Profile updated!'); setEditMode(false); }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-secondary text-secondary-foreground border-border';
    }
  };

  const orderStats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    active: orders.filter(o => ['pending', 'processing', 'shipped'].includes(o.status)).length,
    totalSpent: orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + Number(o.grand_total), 0),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const tabs = [
    { key: 'profile' as const, label: 'Profile', icon: User },
    { key: 'orders' as const, label: 'Orders', icon: Package },
    { key: 'addresses' as const, label: 'Addresses', icon: MapPin },
  ];

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="pt-20 pb-20">
        {/* Profile Header Banner */}
        <div className="gradient-banner py-16 md:py-20 banner-glow">
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent/30 flex items-center justify-center glow-border">
                <span className="font-display text-2xl text-accent font-semibold">
                  {(profile?.full_name || user.email || '?')[0].toUpperCase()}
                </span>
              </div>
              <div className="text-center md:text-left">
                <h1 className="font-display text-3xl md:text-4xl text-primary-foreground glow-text">
                  {profile?.full_name || 'Welcome Back'}
                </h1>
                <p className="text-primary-foreground/60 text-sm mt-1">{user.email}</p>
                <p className="text-primary-foreground/40 text-xs mt-1">
                  Member since {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-5xl -mt-6 relative z-10">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Total Orders', value: orderStats.total, icon: ShoppingBag },
              { label: 'Delivered', value: orderStats.delivered, icon: Star },
              { label: 'Active', value: orderStats.active, icon: Truck },
              { label: 'Total Spent', value: `$${orderStats.totalSpent.toFixed(0)}`, icon: Package },
            ].map(({ label, value, icon: StatIcon }) => (
              <div key={label} className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <StatIcon size={14} className="text-accent" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
                <p className="font-display text-xl font-semibold">{value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-border mb-8 overflow-x-auto">
            {tabs.map(({ key, label, icon: TabIcon }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                  activeTab === key ? 'border-accent text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <TabIcon size={16} /> {label}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 border border-border rounded-xl bg-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl">Personal Information</h2>
                  {!editMode && (
                    <Button variant="outline" size="sm" onClick={() => setEditMode(true)} className="rounded-lg">
                      <Settings size={14} className="mr-2" /> Edit
                    </Button>
                  )}
                </div>

                {editMode ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input id="full_name" value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="mt-1.5 rounded-lg" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1.5 rounded-lg" />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button onClick={handleSaveProfile} className="btn-primary rounded-lg">Save Changes</Button>
                      <Button variant="outline" onClick={() => setEditMode(false)} className="rounded-lg">Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: 'Full Name', value: profile?.full_name || 'Not set' },
                      { label: 'Email', value: user.email },
                      { label: 'Phone', value: profile?.phone || 'Not set' },
                      { label: 'Member Since', value: new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) },
                    ].map(({ label, value }) => (
                      <div key={label} className="p-4 bg-secondary/30 rounded-lg">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
                        <p className="text-sm font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={() => navigate('/wishlist')}
                  className="flex items-center justify-between p-5 border border-border rounded-xl bg-card hover:border-accent/30 hover:shadow-sm transition-all text-left group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Heart size={18} className="text-accent" />
                    </div>
                    <div>
                      <span className="text-sm font-medium block">My Wishlist</span>
                      <span className="text-xs text-muted-foreground">Saved items</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigate('/track-order')}
                  className="flex items-center justify-between p-5 border border-border rounded-xl bg-card hover:border-accent/30 hover:shadow-sm transition-all text-left group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Truck size={18} className="text-accent" />
                    </div>
                    <div>
                      <span className="text-sm font-medium block">Track Order</span>
                      <span className="text-xs text-muted-foreground">Real-time updates</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <Button variant="outline" onClick={handleSignOut} className="text-destructive hover:text-destructive rounded-lg">
                <LogOut size={16} className="mr-2" /> Sign Out
              </Button>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="animate-fade-in">
              {orders.length === 0 ? (
                <div className="text-center py-16 border border-border rounded-xl bg-card">
                  <Package size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-display text-xl mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
                  <Button onClick={() => navigate('/shop')} className="btn-primary rounded-lg">Browse Products</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="p-5 border border-border rounded-xl bg-card hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm font-semibold">Order #{order.order_number}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <span className="font-display text-lg font-semibold">${Number(order.grand_total).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 overflow-x-auto">
                          {(order.items as any[]).slice(0, 4).map((item: any, i: number) => (
                            <img key={i} src={item.image} alt={item.name} className="w-14 h-[72px] object-cover rounded-lg border border-border" />
                          ))}
                          {(order.items as any[]).length > 4 && (
                            <div className="w-14 h-[72px] bg-secondary rounded-lg border border-border flex items-center justify-center text-xs text-muted-foreground">
                              +{(order.items as any[]).length - 4}
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/track-order?order=${order.order_number}`)}
                          className="text-xs shrink-0 rounded-lg">
                          Track Order
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="animate-fade-in text-center py-16 border border-border rounded-xl bg-card">
              <MapPin size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="font-display text-xl mb-2">No saved addresses</h3>
              <p className="text-muted-foreground text-sm">Addresses from your orders will appear here.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountPage;
