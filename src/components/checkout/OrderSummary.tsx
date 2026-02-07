import { Gift } from 'lucide-react';
import { CartItem } from '@/types/product';
import PromoCode from './PromoCode';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  grandTotal: number;
  promoCode: string | null;
  onApplyPromo: (code: string, discount: number) => void;
  onRemovePromo: () => void;
  giftWrap: boolean;
  giftMessage: string;
  onGiftWrapChange: (enabled: boolean) => void;
  onGiftMessageChange: (message: string) => void;
}

const GIFT_WRAP_PRICE = 5;

const OrderSummary = ({
  items,
  subtotal,
  shipping,
  tax,
  discount,
  grandTotal,
  promoCode,
  onApplyPromo,
  onRemovePromo,
  giftWrap,
  giftMessage,
  onGiftWrapChange,
  onGiftMessageChange,
}: OrderSummaryProps) => {
  return (
    <div className="lg:pl-12 lg:border-l border-border">
      <h2 className="font-display text-xl md:text-2xl mb-6">Order Summary</h2>

      {/* Items */}
      <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto scrollbar-hide">
        {items.map((item) => (
          <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
            <div className="relative flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-20 object-cover rounded"
              />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-muted-foreground text-primary-foreground rounded-full text-[10px] flex items-center justify-center font-medium">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{item.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.selectedColor} / {item.selectedSize}
              </p>
              <p className="font-medium text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="mb-5">
        <PromoCode
          onApply={onApplyPromo}
          onRemove={onRemovePromo}
          appliedCode={promoCode}
          discount={discount}
        />
      </div>

      {/* Gift Wrap */}
      <div className="mb-6 p-4 border border-border rounded-lg">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={giftWrap}
            onChange={(e) => onGiftWrapChange(e.target.checked)}
            className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
          />
          <Gift size={16} className="text-muted-foreground" />
          <div className="flex-1">
            <span className="text-sm font-medium">Gift Wrapping</span>
            <span className="text-xs text-muted-foreground ml-2">+${GIFT_WRAP_PRICE.toFixed(2)}</span>
          </div>
        </label>
        {giftWrap && (
          <div className="mt-3 animate-fade-in">
            <textarea
              value={giftMessage}
              onChange={(e) => onGiftMessageChange(e.target.value)}
              placeholder="Add a gift message (optional)"
              maxLength={200}
              className="w-full p-3 text-sm border border-border rounded-lg bg-background resize-none h-20 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">{giftMessage.length}/200</p>
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="border-t border-border pt-4 space-y-2.5">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-accent">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? <span className="text-accent">Free</span> : `$${shipping.toFixed(2)}`}</span>
        </div>
        {giftWrap && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Gift Wrap</span>
            <span>${GIFT_WRAP_PRICE.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Estimated delivery */}
      <div className="mt-5 p-3 bg-secondary/50 rounded-lg text-center">
        <p className="text-xs text-muted-foreground">
          📦 Estimated delivery: <span className="font-medium text-foreground">Jan 15 – Jan 20</span>
        </p>
      </div>
    </div>
  );
};

export { GIFT_WRAP_PRICE };
export default OrderSummary;
