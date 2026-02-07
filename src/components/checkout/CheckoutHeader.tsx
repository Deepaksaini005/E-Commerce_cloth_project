import { ArrowLeft, Lock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckoutHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline text-sm">Back</span>
        </button>
        <h1 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">ÉLAN</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Shield size={14} />
          <Lock size={14} />
          <span className="text-xs hidden sm:inline">Secure Checkout</span>
        </div>
      </div>
    </header>
  );
};

export default CheckoutHeader;
