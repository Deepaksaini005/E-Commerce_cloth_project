import { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Flag } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Review {
  id: string;
  customer: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'flagged';
}

const mockReviews: Review[] = [
  { id: '1', customer: 'Sarah M.', product: 'Cashmere Ribbed Sweater', rating: 5, comment: 'Absolutely love this sweater! The cashmere is so soft and the fit is perfect.', date: '2026-02-08', status: 'approved' },
  { id: '2', customer: 'James K.', product: 'Italian Leather Oxfords', rating: 4, comment: 'Great quality shoes. Took a day to break in but very comfortable now.', date: '2026-02-07', status: 'approved' },
  { id: '3', customer: 'Emma L.', product: 'Silk Wrap Dress', rating: 5, comment: 'The most elegant dress I own. Gets compliments every time I wear it.', date: '2026-02-06', status: 'pending' },
  { id: '4', customer: 'Mike R.', product: 'Wool Blend Overcoat', rating: 3, comment: 'Decent coat but the sizing runs a bit large. Order a size down.', date: '2026-02-05', status: 'pending' },
  { id: '5', customer: 'Anonymous', product: 'Premium Face Serum', rating: 1, comment: 'Not worth the price. Caused breakouts.', date: '2026-02-04', status: 'flagged' },
];

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'flagged'>('all');

  const updateStatus = (id: string, status: Review['status']) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast.success(`Review ${status}`);
  };

  const filtered = filter === 'all' ? reviews : reviews.filter(r => r.status === filter);

  const statusColors: Record<string, string> = {
    approved: 'bg-green-100 text-green-800',
    pending: 'bg-amber-100 text-amber-800',
    flagged: 'bg-red-100 text-red-800',
  };

  return (
    <AdminLayout title="Reviews" subtitle="Moderate customer reviews">
      <div className="animate-fade-in space-y-6">
        <div className="flex gap-2">
          {(['all', 'pending', 'approved', 'flagged'] as const).map(f => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f} {f !== 'all' && `(${reviews.filter(r => r.status === f).length})`}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
              <p>No reviews found</p>
            </div>
          ) : filtered.map(review => (
            <div key={review.id} className="border border-border rounded-lg p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-sm font-medium">{review.customer}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[review.status]}`}>
                      {review.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    on <span className="font-medium text-foreground">{review.product}</span> · {review.date}
                  </p>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < review.rating ? 'fill-accent text-accent' : 'text-muted-foreground/30'} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  {review.status !== 'approved' && (
                    <Button variant="ghost" size="sm" onClick={() => updateStatus(review.id, 'approved')}>
                      <ThumbsUp size={14} />
                    </Button>
                  )}
                  {review.status !== 'flagged' && (
                    <Button variant="ghost" size="sm" onClick={() => updateStatus(review.id, 'flagged')} className="text-destructive hover:text-destructive">
                      <Flag size={14} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReviews;
