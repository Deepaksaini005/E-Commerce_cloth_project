import { useState } from 'react';
import { Plus, Pencil, Trash2, Ticket } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  isActive: boolean;
  usageCount: number;
}

// Static coupons matching existing promo system
const initialCoupons: Coupon[] = [
  { id: '1', code: 'ELAN10', type: 'percentage', value: 10, minOrder: 0, isActive: true, usageCount: 45 },
  { id: '2', code: 'SAVE50', type: 'fixed', value: 50, minOrder: 200, isActive: true, usageCount: 23 },
  { id: '3', code: 'WELCOME20', type: 'percentage', value: 20, minOrder: 100, isActive: true, usageCount: 89 },
];

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [form, setForm] = useState<{ code: string; type: 'percentage' | 'fixed'; value: number; minOrder: number; isActive: boolean }>({ code: '', type: 'percentage', value: 0, minOrder: 0, isActive: true });

  const openAdd = () => {
    setEditingCoupon(null);
    setForm({ code: '', type: 'percentage', value: 0, minOrder: 0, isActive: true });
    setDialogOpen(true);
  };

  const openEdit = (c: Coupon) => {
    setEditingCoupon(c);
    setForm({ code: c.code, type: c.type, value: c.value, minOrder: c.minOrder, isActive: c.isActive });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.code || !form.value) {
      toast.error('Code and value are required');
      return;
    }
    if (editingCoupon) {
      setCoupons(prev => prev.map(c => c.id === editingCoupon.id ? { ...c, ...form } : c));
      toast.success('Coupon updated');
    } else {
      setCoupons(prev => [...prev, { ...form, id: Date.now().toString(), usageCount: 0 }]);
      toast.success('Coupon created');
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this coupon?')) return;
    setCoupons(prev => prev.filter(c => c.id !== id));
    toast.success('Coupon deleted');
  };

  return (
    <AdminLayout title="Coupons" subtitle="Manage discount codes and promotions">
      <div className="animate-fade-in space-y-6">
        <div className="flex justify-end">
          <Button onClick={openAdd} className="btn-primary">
            <Plus size={16} className="mr-2" /> Create Coupon
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.map(coupon => (
            <div key={coupon.id} className="border border-border rounded-lg p-5 relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Ticket size={18} className="text-accent" />
                </div>
                <div>
                  <p className="font-mono text-sm font-semibold">{coupon.code}</p>
                  <p className="text-xs text-muted-foreground">
                    {coupon.type === 'percentage' ? `${coupon.value}% off` : `$${coupon.value} off`}
                  </p>
                </div>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                {coupon.minOrder > 0 && <p>Min order: ${coupon.minOrder}</p>}
                <p>Used {coupon.usageCount} times</p>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-secondary text-muted-foreground'
                }`}>
                  {coupon.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(coupon)}>
                    <Pencil size={14} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(coupon.id)} className="text-destructive hover:text-destructive">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                {editingCoupon ? 'Edit Coupon' : 'Create Coupon'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Code</Label>
                <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} className="mt-1 font-mono" placeholder="e.g. SAVE20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as 'percentage' | 'fixed' })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Value</Label>
                  <Input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: Number(e.target.value) })} className="mt-1" />
                </div>
              </div>
              <div>
                <Label>Minimum Order ($)</Label>
                <Input type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })} className="mt-1" />
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="rounded" />
                Active
              </label>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave} className="btn-primary flex-1">
                  {editingCoupon ? 'Update' : 'Create'}
                </Button>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminCoupons;
