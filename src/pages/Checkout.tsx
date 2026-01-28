import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'info' | 'payment' | 'complete'>('info');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const shipping = totalPrice > 150 ? 0 : 15;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.firstName || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }
    setStep('payment');
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cardNumber || !formData.expiry || !formData.cvv) {
      toast.error('Please fill in all payment details');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setStep('complete');
    clearCart();
  };

  if (items.length === 0 && step !== 'complete') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate('/')} className="btn-primary">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-md animate-fade-in">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-accent" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-2">Thank you for your purchase.</p>
          <p className="text-muted-foreground mb-8">
            A confirmation email has been sent to {formData.email}
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Order #ORD-{Date.now().toString().slice(-8)}
          </p>
          <Button onClick={() => navigate('/')} className="btn-primary">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-6">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back</span>
          </button>
          <h1 className="font-display text-2xl font-semibold">ÉLAN</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock size={16} />
            <span className="text-sm">Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <div>
            {/* Progress */}
            <div className="flex items-center gap-4 mb-10">
              <div className={`flex items-center gap-2 ${step === 'info' ? 'text-foreground' : 'text-muted-foreground'}`}>
                <span className="w-8 h-8 rounded-full border flex items-center justify-center text-sm font-medium">1</span>
                <span className="text-sm font-medium">Information</span>
              </div>
              <div className="flex-1 h-px bg-border" />
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-foreground' : 'text-muted-foreground'}`}>
                <span className="w-8 h-8 rounded-full border flex items-center justify-center text-sm font-medium">2</span>
                <span className="text-sm font-medium">Payment</span>
              </div>
            </div>

            {step === 'info' && (
              <form onSubmit={handleSubmitInfo} className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full btn-primary h-12">
                  Continue to Payment
                </Button>
              </form>
            )}

            {step === 'payment' && (
              <form onSubmit={handleSubmitPayment} className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl mb-6">Payment Details</h2>
                  <div className="p-4 bg-secondary/50 rounded-lg mb-6">
                    <p className="text-sm text-muted-foreground">
                      Shipping to: {formData.firstName} {formData.lastName}, {formData.address}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStep('info')}
                      className="text-sm text-accent hover:underline mt-2"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative mt-1">
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                        />
                        <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          type="password"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" disabled={isProcessing} className="w-full btn-primary h-12">
                  {isProcessing ? 'Processing...' : `Pay $${grandTotal.toFixed(2)}`}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Your payment information is secure and encrypted
                </p>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:pl-12 lg:border-l border-border">
            <h2 className="font-display text-2xl mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded"
                    />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-muted-foreground text-primary-foreground rounded-full text-xs flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.selectedColor} / {item.selectedSize}
                    </p>
                    <p className="font-medium text-sm mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium pt-3 border-t border-border">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {shipping > 0 && (
              <p className="text-sm text-muted-foreground mt-4">
                Add ${(150 - totalPrice).toFixed(2)} more for free shipping
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
