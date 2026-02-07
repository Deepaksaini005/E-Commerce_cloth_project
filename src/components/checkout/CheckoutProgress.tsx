import { Check } from 'lucide-react';

interface CheckoutProgressProps {
  step: 'info' | 'payment' | 'complete';
}

const steps = [
  { key: 'info', label: 'Information' },
  { key: 'payment', label: 'Payment' },
  { key: 'complete', label: 'Confirmation' },
] as const;

const CheckoutProgress = ({ step }: CheckoutProgressProps) => {
  const currentIdx = steps.findIndex(s => s.key === step);

  return (
    <div className="flex items-center gap-2 mb-10">
      {steps.map((s, i) => {
        const isComplete = i < currentIdx;
        const isCurrent = i === currentIdx;

        return (
          <div key={s.key} className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-2">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  isComplete
                    ? 'bg-accent text-accent-foreground'
                    : isCurrent
                    ? 'border-2 border-accent text-accent'
                    : 'border border-border text-muted-foreground'
                }`}
              >
                {isComplete ? <Check size={16} /> : i + 1}
              </span>
              <span
                className={`text-sm font-medium hidden sm:inline transition-colors ${
                  isCurrent ? 'text-foreground' : isComplete ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px mx-2">
                <div
                  className={`h-full transition-colors ${
                    isComplete ? 'bg-accent' : 'bg-border'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutProgress;
