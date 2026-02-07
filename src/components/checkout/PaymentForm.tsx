import { CreditCard, Smartphone, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export type PaymentMethod = 'card' | 'paypal' | 'applepay' | 'googlepay';

export interface PaymentData {
  method: PaymentMethod;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  saveCard: boolean;
}

interface PaymentFormProps {
  data: PaymentData;
  shippingAddress: string;
  onChange: (data: PaymentData) => void;
  onSubmit: () => void;
  onBack: () => void;
  isProcessing: boolean;
  grandTotal: number;
}

const paymentMethods: { id: PaymentMethod; label: string; icon: string; description: string }[] = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', description: 'Visa, Mastercard, Amex' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️', description: 'Pay with your PayPal account' },
  { id: 'applepay', label: 'Apple Pay', icon: '🍎', description: 'Quick & secure with Apple Pay' },
  { id: 'googlepay', label: 'Google Pay', icon: '🔵', description: 'Fast checkout with Google Pay' },
];

const formatCardNumber = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  return parts.length ? parts.join(' ') : v;
};

const formatExpiry = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  if (v.length >= 2) return v.substring(0, 2) + '/' + v.substring(2, 4);
  return v;
};

const PaymentForm = ({ data, shippingAddress, onChange, onSubmit, onBack, isProcessing, grandTotal }: PaymentFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping summary */}
      <div className="p-4 bg-secondary/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Shipping to</p>
            <p className="text-sm">{shippingAddress}</p>
          </div>
          <button type="button" onClick={onBack} className="text-sm text-accent hover:underline">
            Edit
          </button>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div>
        <h2 className="font-display text-xl md:text-2xl mb-5">Payment Method</h2>
        <div className="grid grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-all text-center ${
                data.method === method.id
                  ? 'border-accent bg-accent/5 shadow-sm'
                  : 'border-border hover:border-muted-foreground/30'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={data.method === method.id}
                onChange={() => onChange({ ...data, method: method.id })}
                className="sr-only"
              />
              <span className="text-2xl">{method.icon}</span>
              <span className="text-sm font-medium">{method.label}</span>
              <span className="text-xs text-muted-foreground">{method.description}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Card Details (only for card payment) */}
      {data.method === 'card' && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="font-display text-lg">Card Details</h3>
          <div>
            <Label htmlFor="cardName">Name on Card</Label>
            <Input
              id="cardName"
              value={data.cardName}
              onChange={(e) => onChange({ ...data, cardName: e.target.value })}
              placeholder="John Doe"
              className="mt-1.5"
              required
            />
          </div>
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative mt-1.5">
              <Input
                id="cardNumber"
                value={data.cardNumber}
                onChange={(e) => onChange({ ...data, cardNumber: formatCardNumber(e.target.value) })}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
              <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                value={data.expiry}
                onChange={(e) => onChange({ ...data, expiry: formatExpiry(e.target.value) })}
                placeholder="MM/YY"
                maxLength={5}
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <div className="relative mt-1.5">
                <Input
                  id="cvv"
                  type="password"
                  value={data.cvv}
                  onChange={(e) => onChange({ ...data, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                  placeholder="•••"
                  maxLength={4}
                  required
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
              </div>
            </div>
          </div>

          {/* Save card checkbox */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.saveCard}
              onChange={(e) => onChange({ ...data, saveCard: e.target.checked })}
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
            />
            <span className="text-sm text-muted-foreground">Save card for future purchases</span>
          </label>
        </div>
      )}

      {/* Express Pay Placeholder */}
      {data.method !== 'card' && (
        <div className="p-8 border border-dashed border-border rounded-lg text-center animate-fade-in">
          <Smartphone size={32} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            You'll be redirected to {paymentMethods.find(m => m.id === data.method)?.label} to complete your payment securely.
          </p>
        </div>
      )}

      {/* Submit */}
      <Button type="submit" disabled={isProcessing} className="w-full btn-primary h-12 text-sm">
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          `Pay $${grandTotal.toFixed(2)}`
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Lock size={12} />
        <span>Your payment information is encrypted and secure</span>
      </div>
    </form>
  );
};

export default PaymentForm;
