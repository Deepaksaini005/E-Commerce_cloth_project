import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Package, Clock, CheckCircle, Truck, XCircle, 
  Search, ArrowLeft, MapPin, CreditCard
} from 'lucide-react';

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
  items: any[];
  shipping_address: any;
  payment_method: string | null;
}

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: Clock, description: 'Your order has been received and is being processed.' },
  { key: 'processing', label: 'Processing', icon: Package, description: 'We are preparing your items for shipment.' },
  { key: 'shipped', label: 'Shipped', icon: Truck, description: 'Your order is on its way!' },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle, description: 'Your order has been delivered.' },
];

const OrderTrackingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('order') || '');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (searchParams.get('order')) handleSearch();
  }, []);

  const handleSearch = async () => {
    const query = searchQuery.trim();
    if (!query) return;
    setLoading(true);
    setSearched(true);
    const { data } = await supabase.from('orders').select('*').eq('order_number', query).maybeSingle();
    setOrder(data as Order | null);
    setLoading(false);
  };

  const currentStep = order && order.status !== 'cancelled' 
    ? statusSteps.findIndex(s => s.key === order.status) 
    : -1;

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="pt-20 pb-20">
        {/* Banner */}
        <div className="gradient-banner py-16 md:py-20 banner-glow">
          <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
            <Truck size={32} className="mx-auto mb-4 text-accent" />
            <h1 className="font-display text-3xl md:text-5xl text-primary-foreground glow-text mb-3">Track Your Order</h1>
            <p className="text-primary-foreground/60 text-sm">Enter your order number for real-time updates</p>
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-3xl -mt-6 relative z-10">
          {/* Search Card */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-md mb-8">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter order number (e.g., ORD-12345678)"
                  className="pl-10 h-12 rounded-lg" onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
              </div>
              <Button onClick={handleSearch} className="btn-primary h-12 px-8 rounded-lg" disabled={loading}>
                {loading ? 'Searching...' : 'Track'}
              </Button>
            </div>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          )}

          {!loading && searched && !order && (
            <div className="text-center py-16 border border-border rounded-xl bg-card">
              <XCircle size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="font-display text-xl mb-2">Order Not Found</h3>
              <p className="text-muted-foreground text-sm">Please check your order number and try again.</p>
            </div>
          )}

          {!loading && order && (
            <div className="animate-fade-in space-y-6">
              {/* Order Header */}
              <div className="flex items-center justify-between p-6 border border-border rounded-xl bg-card shadow-sm">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Order Number</p>
                  <p className="font-display text-2xl font-semibold mt-1">#{order.order_number}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Total</p>
                  <p className="font-display text-2xl font-semibold mt-1">${Number(order.grand_total).toFixed(2)}</p>
                </div>
              </div>

              {/* Status Timeline */}
              {order.status === 'cancelled' ? (
                <div className="border border-destructive/30 bg-destructive/5 rounded-xl p-8 text-center">
                  <XCircle size={40} className="mx-auto text-destructive mb-3" />
                  <h3 className="font-display text-xl mb-1">Order Cancelled</h3>
                  <p className="text-sm text-muted-foreground">This order has been cancelled.</p>
                </div>
              ) : (
                <div className="border border-border rounded-xl p-6 bg-card">
                  <h2 className="font-display text-lg mb-6">Delivery Progress</h2>
                  <div className="relative">
                    <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-border" />
                    <div className="absolute left-[15px] top-0 w-0.5 bg-accent transition-all duration-700"
                      style={{ height: `${Math.max(0, (currentStep / (statusSteps.length - 1)) * 100)}%` }} />
                    <div className="space-y-8">
                      {statusSteps.map((step, i) => {
                        const isActive = i <= currentStep;
                        const isCurrent = i === currentStep;
                        return (
                          <div key={step.key} className="flex items-start gap-4 relative">
                            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                              isCurrent ? 'bg-accent text-accent-foreground shadow-md scale-110' :
                              isActive ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
                            }`}>
                              <step.icon size={14} />
                            </div>
                            <div className="pt-1">
                              <p className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {step.label}
                              </p>
                              {isCurrent && (
                                <p className="text-xs text-muted-foreground mt-0.5 animate-fade-in">{step.description}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping & Payment Info */}
              {order.shipping_address && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 border border-border rounded-xl bg-card">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin size={16} className="text-accent" />
                      <h3 className="text-sm font-medium">Shipping Address</h3>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p className="text-foreground font-medium">
                        {(order.shipping_address as any).firstName} {(order.shipping_address as any).lastName}
                      </p>
                      <p>{(order.shipping_address as any).address}</p>
                      <p>{(order.shipping_address as any).city}, {(order.shipping_address as any).postalCode}</p>
                      <p>{(order.shipping_address as any).country}</p>
                    </div>
                  </div>
                  <div className="p-5 border border-border rounded-xl bg-card">
                    <div className="flex items-center gap-2 mb-3">
                      <CreditCard size={16} className="text-accent" />
                      <h3 className="text-sm font-medium">Payment</h3>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p className="text-foreground font-medium capitalize">{order.payment_method || 'N/A'}</p>
                      <p>Subtotal: ${Number(order.subtotal).toFixed(2)}</p>
                      <p>Shipping: ${Number(order.shipping).toFixed(2)}</p>
                      {Number(order.discount) > 0 && <p className="text-green-600">Discount: -${Number(order.discount).toFixed(2)}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="border border-border rounded-xl overflow-hidden bg-card">
                <div className="px-5 py-4 bg-secondary/30 border-b border-border">
                  <h2 className="font-display text-lg">Items ({(order.items as any[]).length})</h2>
                </div>
                <div className="divide-y divide-border">
                  {(order.items as any[]).map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-4">
                      <img src={item.image} alt={item.name} className="w-14 h-[72px] object-cover rounded-lg border border-border" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedSize} · {item.selectedColor} · Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">${(Number(item.price) * Number(item.quantity)).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <Button onClick={() => navigate('/shop')} variant="outline" className="rounded-lg">Continue Shopping</Button>
                <Button onClick={() => navigate('/account')} className="btn-primary rounded-lg">My Account</Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderTrackingPage;
