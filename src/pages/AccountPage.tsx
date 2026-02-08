import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, Heart, LogOut, Settings, ChevronRight } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
  });

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setOrders(data as Order[]);
  };

  const handleSaveProfile = async () => {
    const { error } = await updateProfile(formData);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Profile updated!');
      setEditMode(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="font-display text-3xl md:text-4xl mb-2">My Account</h1>
          <p className="text-muted-foreground mb-8">{user.email}</p>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-border mb-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'profile' ? 'border-accent text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <User size={16} /> Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'orders' ? 'border-accent text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Package size={16} /> Orders
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl">Personal Information</h2>
                  {!editMode && (
                    <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                      <Settings size={14} className="mr-2" /> Edit
                    </Button>
                  )}
                </div>

                {editMode ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={handleSaveProfile} className="btn-primary">Save Changes</Button>
                      <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Full Name</p>
                        <p className="text-sm font-medium">{profile?.full_name || 'Not set'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                        <p className="text-sm font-medium">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Phone</p>
                        <p className="text-sm font-medium">{profile?.phone || 'Not set'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Member Since</p>
                        <p className="text-sm font-medium">
                          {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate('/wishlist')}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-accent/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <Heart size={18} className="text-accent" />
                    <span className="text-sm font-medium">My Wishlist</span>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-accent/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <Package size={18} className="text-accent" />
                    <span className="text-sm font-medium">Order History</span>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
              </div>

              {/* Sign Out */}
              <Button variant="outline" onClick={handleSignOut} className="text-destructive hover:text-destructive">
                <LogOut size={16} className="mr-2" /> Sign Out
              </Button>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="animate-fade-in">
              {orders.length === 0 ? (
                <div className="text-center py-16">
                  <Package size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-display text-xl mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
                  <Button onClick={() => navigate('/shop')} className="btn-primary">
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="p-5 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm font-medium">Order #{order.order_number}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                              year: 'numeric', month: 'long', day: 'numeric',
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <span className="font-medium">${Number(order.grand_total).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 overflow-x-auto">
                        {(order.items as any[]).slice(0, 4).map((item: any, i: number) => (
                          <img key={i} src={item.image} alt={item.name} className="w-14 h-18 object-cover rounded border border-border" />
                        ))}
                        {(order.items as any[]).length > 4 && (
                          <div className="w-14 h-18 bg-secondary rounded border border-border flex items-center justify-center text-xs text-muted-foreground">
                            +{(order.items as any[]).length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountPage;
