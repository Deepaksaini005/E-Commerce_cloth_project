import { X, Minus, Plus, ShoppingBag, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-large transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display text-2xl font-medium">Shopping Bag ({totalItems})</h2>
            <button onClick={onClose} className="p-2 hover:text-accent transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag size={48} className="text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Your bag is empty</p>
                <p className="text-muted-foreground mb-6">Add items to get started</p>
                <Button onClick={onClose} className="btn-secondary">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-32 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.selectedColor} / {item.selectedSize}
                      </p>
                      <p className="font-medium mt-2">${item.price}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)
                          }
                          className="p-1 hover:text-accent transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)
                          }
                          className="p-1 hover:text-accent transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                          className="ml-auto text-sm text-muted-foreground hover:text-destructive transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border space-y-4">
              {/* Free shipping progress */}
              {totalPrice < 150 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Add ${(150 - totalPrice).toFixed(2)} more for free shipping</span>
                    <span>${totalPrice.toFixed(0)} / $150</span>
                  </div>
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (totalPrice / 150) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {totalPrice >= 150 && (
                <p className="text-xs text-accent flex items-center gap-1.5">
                  <Truck size={14} /> You qualify for free shipping!
                </p>
              )}

              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping, taxes & promo codes applied at checkout
              </p>
              <Button onClick={handleCheckout} className="w-full btn-primary h-12">
                Proceed to Checkout
              </Button>
              <Button onClick={onClose} variant="ghost" className="w-full text-sm text-muted-foreground hover:text-foreground">
                Continue Shopping
              </Button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-6 pt-3 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Shield size={12} /> Secure
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <RotateCcw size={12} /> 30-Day Returns
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Truck size={12} /> Fast Delivery
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
