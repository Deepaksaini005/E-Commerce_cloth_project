import { Leaf } from 'lucide-react';

interface EcoScoreProps {
  score: number | null | undefined;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

const EcoScore = ({ score, showLabel = false, size = 'sm' }: EcoScoreProps) => {
  if (!score || score <= 0) return null;

  const getColor = () => {
    if (score >= 70) return { bg: 'bg-green-500/10', text: 'text-green-600', border: 'border-green-500/20' };
    if (score >= 40) return { bg: 'bg-yellow-500/10', text: 'text-yellow-600', border: 'border-yellow-500/20' };
    return { bg: 'bg-red-500/10', text: 'text-red-600', border: 'border-red-500/20' };
  };

  const getLabel = () => {
    if (score >= 70) return 'Eco Friendly';
    if (score >= 40) return 'Moderate Impact';
    return 'High Impact';
  };

  const colors = getColor();
  const iconSize = size === 'sm' ? 12 : 16;

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
      <Leaf size={iconSize} />
      <span className={`font-medium ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>{score}</span>
      {showLabel && <span className={`${size === 'sm' ? 'text-xs' : 'text-sm'}`}>· {getLabel()}</span>}
    </div>
  );
};

export default EcoScore;
