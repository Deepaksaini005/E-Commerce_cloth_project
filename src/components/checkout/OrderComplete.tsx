import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import WhatsAppOrderShare from '@/components/WhatsAppOrderShare';

interface OrderCompleteProps {
  email: string;
  orderId: string;
  grandTotal?: number;
  itemCount?: number;
}

const OrderComplete = ({ email, orderId, grandTotal = 0, itemCount = 0 }: OrderCompleteProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg animate-fade-in">
        {/* Success Animation */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-accent/10 rounded-full animate-ping" />
          <div className="relative w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-accent" />
          </div>
        </div>

        <h1 className="font-display text-3xl md:text-4xl mb-3">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-1">Thank you for shopping with ÉLAN.</p>
        <p className="text-sm text-muted-foreground mb-8">
          Order #{orderId}
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 border border-border rounded-lg text-left">
            <Mail size={18} className="text-accent mb-2" />
            <p className="text-sm font-medium">Confirmation Email</p>
            <p className="text-xs text-muted-foreground mt-1">
              Sent to {email}
            </p>
          </div>
          <div className="p-4 border border-border rounded-lg text-left">
            <Package size={18} className="text-accent mb-2" />
            <p className="text-sm font-medium">Shipping Updates</p>
            <p className="text-xs text-muted-foreground mt-1">
              You'll receive tracking info via email
            </p>
          </div>
        </div>

        {/* WhatsApp Verification */}
        <div className="mb-8 text-left">
          <WhatsAppOrderShare orderId={orderId} grandTotal={grandTotal} itemCount={itemCount} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => navigate(`/track-order?order=${orderId}`)} className="btn-primary group">
            Track Order
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button onClick={() => navigate('/shop')} variant="outline" className="btn-secondary">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
