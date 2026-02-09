import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Package, Clock, CheckCircle, Truck, XCircle, 
  Search, MapPin, CreditCard, ArrowLeft 
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
  const { user } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('order') || '');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (searchParams.get('order')) {
      handleSearch();
    }
  }, []);

  const handleSearch = async () => {
    const query = searchQuery.trim();
    if (!query) return;
    
    setLoading(true);
    setSearched(true);

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', query)
      .maybeSingle();

    if (data) {
      setOrder(data as Order);
    } else {
      setOrder(null);
    }
    setLoading(false);
  };

  const getCurrentStepIndex = () => {
    if (!order) return -1;
    if (order.status === 'cancelled') return -1;
    return statusSteps.findIndex(s => s.key === order.status);
  };

  const currentStep = getCurrentStepIndex();

  return (
    <div className="min-h-screen">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back</span>
          </button>

          <h1 className="font-display text-3xl md:text-4xl mb-2">Track Your Order</h1>
          <p className="text-muted-foreground mb-8">Enter your order number to see real-time updates.</p>

          {/* Search */}
          <div className="flex gap-3 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter order number (e.g., ORD-12345678)"
                className="pl-10 h-12"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="btn-primary h-12 px-6" disabled={loading}>
              {loading ? 'Searching...' : 'Track'}
            </Button>
          </div>

          {/* Results */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          )}

          {!loading && searched && !order && (
            <div className="text-center py-12 border border-border rounded-lg">
              <XCircle size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="font-display text-xl mb-2">Order Not Found</h3>
              <p className="text-muted-foreground text-sm">Please check your order number and try again.</p>
            </div>
          )}

          {!loading && order && (
            <div className="animate-fade-in space-y-8">
              {/* Order Header */}
              <div className="flex items-center justify-between p-5 border border-border rounded-lg bg-card">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-display text-xl font-semibold">#{order.order_number}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Placed on {new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-display text-xl font-semibold">${Number(order.grand_total).toFixed(2)}</p>
                </div>
              </div>

              {/* Status Timeline */}
              {order.status === 'cancelled' ? (
                <div className="border border-destructive/30 bg-destructive/5 rounded-lg p-6 text-center">
                  <XCircle size={40} className="mx-auto text-destructive mb-3" />
                  <h3 className="font-display text-xl mb-1">Order Cancelled</h3>
                  <p className="text-sm text-muted-foreground">This order has been cancelled.</p>
                </div>
              ) : (
                <div className="border border-border rounded-lg p-6">
                  <h2 className="font-display text-lg mb-6">Delivery Progress</h2>
                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-border" />
                    <div 
                      className="absolute left-[15px] top-0 w-0.5 bg-accent transition-all duration-500"
                      style={{ height: `${Math.max(0, (currentStep / (statusSteps.length - 1)) * 100)}%` }}
                    />

                    <div className="space-y-8">
                      {statusSteps.map((step, i) => {
                        const isActive = i <= currentStep;
                        const isCurrent = i === currentStep;

                        return (
                          <div key={step.key} className="flex items-start gap-4 relative">
                            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                              isCurrent ? 'bg-accent text-accent-foreground shadow-md' :
                              isActive ? 'bg-accent/20 text-accent' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              <step.icon size={14} />
                            </div>
                            <div className="pt-1">
                              <p className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {step.label}
                              </p>
                              {isCurrent && (
                                <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="px-5 py-4 bg-muted/30 border-b border-border">
                  <h2 className="font-display text-lg">Items ({(order.items as any[]).length})</h2>
                </div>
                <div className="divide-y divide-border">
                  {(order.items as any[]).map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-4">
                      <img src={item.image} alt={item.name} className="w-14 h-18 object-cover rounded border border-border" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedSize} · {item.selectedColor} · Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium">${(Number(item.price) * Number(item.quantity)).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
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
