import { Truck, Zap, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export interface ShippingData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  postalCode: string;
  shippingMethod: 'standard' | 'express' | 'overnight';
}

interface ShippingFormProps {
  data: ShippingData;
  onChange: (data: ShippingData) => void;
  onSubmit: () => void;
  totalPrice: number;
}

const shippingMethods = [
  {
    id: 'standard' as const,
    label: 'Standard Shipping',
    time: '5-7 business days',
    price: 15,
    freeAbove: 150,
    icon: Truck,
  },
  {
    id: 'express' as const,
    label: 'Express Shipping',
    time: '2-3 business days',
    price: 25,
    freeAbove: null,
    icon: Zap,
  },
  {
    id: 'overnight' as const,
    label: 'Overnight Shipping',
    time: 'Next business day',
    price: 45,
    freeAbove: null,
    icon: Clock,
  },
];

export const getShippingCost = (method: string, totalPrice: number) => {
  const m = shippingMethods.find(s => s.id === method);
  if (!m) return 15;
  if (m.freeAbove && totalPrice >= m.freeAbove) return 0;
  return m.price;
};

const ShippingForm = ({ data, onChange, onSubmit, totalPrice }: ShippingFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact */}
      <div>
        <h2 className="font-display text-xl md:text-2xl mb-5">Contact Information</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" value={data.email} onChange={handleChange} placeholder="your@email.com" className="mt-1.5" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" value={data.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="mt-1.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h2 className="font-display text-xl md:text-2xl mb-5">Shipping Address</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" name="firstName" value={data.firstName} onChange={handleChange} className="mt-1.5" required />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" name="lastName" value={data.lastName} onChange={handleChange} className="mt-1.5" required />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Address *</Label>
            <Input id="address" name="address" value={data.address} onChange={handleChange} placeholder="123 Main Street" className="mt-1.5" required />
          </div>
          <div>
            <Label htmlFor="apartment">Apartment, suite, etc.</Label>
            <Input id="apartment" name="apartment" value={data.apartment} onChange={handleChange} placeholder="Apt 4B" className="mt-1.5" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input id="city" name="city" value={data.city} onChange={handleChange} className="mt-1.5" required />
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code *</Label>
              <Input id="postalCode" name="postalCode" value={data.postalCode} onChange={handleChange} className="mt-1.5" required />
            </div>
            <div>
              <Label htmlFor="country">Country *</Label>
              <Input id="country" name="country" value={data.country} onChange={handleChange} className="mt-1.5" required />
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div>
        <h2 className="font-display text-xl md:text-2xl mb-5">Shipping Method</h2>
        <div className="space-y-3">
          {shippingMethods.map((method) => {
            const isFree = method.freeAbove && totalPrice >= method.freeAbove;
            const Icon = method.icon;
            return (
              <label
                key={method.id}
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                  data.shippingMethod === method.id
                    ? 'border-accent bg-accent/5 shadow-sm'
                    : 'border-border hover:border-muted-foreground/30'
                }`}
              >
                <input
                  type="radio"
                  name="shippingMethod"
                  value={method.id}
                  checked={data.shippingMethod === method.id}
                  onChange={() => onChange({ ...data, shippingMethod: method.id })}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  data.shippingMethod === method.id ? 'border-accent' : 'border-border'
                }`}>
                  {data.shippingMethod === method.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                  )}
                </div>
                <Icon size={18} className="text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{method.label}</p>
                  <p className="text-xs text-muted-foreground">{method.time}</p>
                </div>
                <span className="text-sm font-medium">
                  {isFree ? (
                    <span className="text-accent">Free</span>
                  ) : (
                    `$${method.price.toFixed(2)}`
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <Button type="submit" className="w-full btn-primary h-12 text-sm">
        Continue to Payment
      </Button>
    </form>
  );
};

export default ShippingForm;
