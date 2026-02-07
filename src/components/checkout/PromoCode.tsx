import { useState } from 'react';
import { Tag, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PromoCodeProps {
  onApply: (code: string, discount: number) => void;
  onRemove: () => void;
  appliedCode: string | null;
  discount: number;
}

const VALID_CODES: Record<string, { discount: number; type: 'percent' | 'fixed'; label: string }> = {
  ELAN10: { discount: 10, type: 'percent', label: '10% off' },
  ELAN20: { discount: 20, type: 'percent', label: '20% off' },
  WELCOME: { discount: 15, type: 'percent', label: '15% off your first order' },
  FREESHIP: { discount: 0, type: 'fixed', label: 'Free shipping' },
  SAVE50: { discount: 50, type: 'fixed', label: '$50 off' },
};

const PromoCode = ({ onApply, onRemove, appliedCode, discount }: PromoCodeProps) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    const upperCode = code.trim().toUpperCase();
    const promo = VALID_CODES[upperCode];
    if (promo) {
      onApply(upperCode, promo.type === 'percent' ? promo.discount : promo.discount);
      setError('');
      setCode('');
    } else {
      setError('Invalid promo code');
    }
  };

  if (appliedCode) {
    const promo = VALID_CODES[appliedCode];
    return (
      <div className="flex items-center justify-between p-3 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-center gap-2">
          <Check size={16} className="text-accent" />
          <span className="text-sm font-medium">{appliedCode}</span>
          <span className="text-xs text-muted-foreground">— {promo?.label}</span>
        </div>
        <button onClick={onRemove} className="text-muted-foreground hover:text-destructive transition-colors">
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-sm text-accent hover:underline"
        >
          <Tag size={14} />
          Have a promo code?
        </button>
      ) : (
        <div className="space-y-2 animate-fade-in">
          <div className="flex gap-2">
            <Input
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(''); }}
              placeholder="Enter promo code"
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleApply()}
            />
            <Button type="button" onClick={handleApply} variant="outline" size="sm" className="px-4">
              Apply
            </Button>
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <p className="text-xs text-muted-foreground">Try: ELAN10, WELCOME, SAVE50</p>
        </div>
      )}
    </div>
  );
};

export default PromoCode;
