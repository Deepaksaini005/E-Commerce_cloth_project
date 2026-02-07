import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import CheckoutProgress from '@/components/checkout/CheckoutProgress';
import ShippingForm, { ShippingData, getShippingCost } from '@/components/checkout/ShippingForm';
import PaymentForm, { PaymentData } from '@/components/checkout/PaymentForm';
import OrderSummary, { GIFT_WRAP_PRICE } from '@/components/checkout/OrderSummary';
import OrderComplete from '@/components/checkout/OrderComplete';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'info' | 'payment' | 'complete'>('info');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId] = useState(() => `ORD-${Date.now().toString().slice(-8)}`);

  const [shippingData, setShippingData] = useState<ShippingData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    postalCode: '',
    shippingMethod: 'standard',
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: 'card',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    saveCard: false,
  });

  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  const shipping = useMemo(() => getShippingCost(shippingData.shippingMethod, totalPrice), [shippingData.shippingMethod, totalPrice]);
  const discountAmount = useMemo(() => discount > 0 ? (totalPrice * discount) / 100 : 0, [discount, totalPrice]);
  const tax = useMemo(() => (totalPrice - discountAmount) * 0.08, [totalPrice, discountAmount]);
  const grandTotal = useMemo(() => {
    let total = totalPrice - discountAmount + shipping + tax;
    if (giftWrap) total += GIFT_WRAP_PRICE;
    return Math.max(0, total);
  }, [totalPrice, discountAmount, shipping, tax, giftWrap]);

  const handleApplyPromo = (code: string, disc: number) => {
    setPromoCode(code);
    setDiscount(disc);
    toast.success(`Promo code "${code}" applied!`);
  };

  const handleRemovePromo = () => {
    setPromoCode(null);
    setDiscount(0);
    toast.info('Promo code removed');
  };

  const handleShippingSubmit = () => {
    if (!shippingData.email || !shippingData.firstName || !shippingData.address || !shippingData.city || !shippingData.postalCode) {
      toast.error('Please fill in all required fields');
      return;
    }
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = async () => {
    if (paymentData.method === 'card') {
      if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv || !paymentData.cardName) {
        toast.error('Please fill in all card details');
        return;
      }
    }

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsProcessing(false);
    setStep('complete');
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shippingAddress = `${shippingData.firstName} ${shippingData.lastName}, ${shippingData.address}${shippingData.apartment ? ` ${shippingData.apartment}` : ''}, ${shippingData.city}`;

  if (items.length === 0 && step !== 'complete') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some items before checking out</p>
          <Button onClick={() => navigate('/shop')} className="btn-primary">
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader />

      {step === 'complete' ? (
        <OrderComplete email={shippingData.email} orderId={orderId} />
      ) : (
        <main className="container mx-auto px-6 py-8 md:py-12">
          <div className="grid lg:grid-cols-[1fr,380px] gap-12 lg:gap-16">
            {/* Left: Forms */}
            <div>
              <CheckoutProgress step={step} />

              {step === 'info' && (
                <ShippingForm
                  data={shippingData}
                  onChange={setShippingData}
                  onSubmit={handleShippingSubmit}
                  totalPrice={totalPrice}
                />
              )}

              {step === 'payment' && (
                <PaymentForm
                  data={paymentData}
                  shippingAddress={shippingAddress}
                  onChange={setPaymentData}
                  onSubmit={handlePaymentSubmit}
                  onBack={() => setStep('info')}
                  isProcessing={isProcessing}
                  grandTotal={grandTotal}
                />
              )}
            </div>

            {/* Right: Order Summary */}
            <OrderSummary
              items={items}
              subtotal={totalPrice}
              shipping={shipping}
              tax={tax}
              discount={discountAmount}
              grandTotal={grandTotal}
              promoCode={promoCode}
              onApplyPromo={handleApplyPromo}
              onRemovePromo={handleRemovePromo}
              giftWrap={giftWrap}
              giftMessage={giftMessage}
              onGiftWrapChange={setGiftWrap}
              onGiftMessageChange={setGiftMessage}
            />
          </div>
        </main>
      )}
    </div>
  );
};

export default Checkout;
