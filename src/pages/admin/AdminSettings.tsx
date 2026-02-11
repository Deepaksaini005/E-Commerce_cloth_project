import { useState } from 'react';
import { Store, Globe, Bell, Shield } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const AdminSettings = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'ÉLAN',
    storeEmail: 'contact@elan.com',
    currency: 'USD',
    taxRate: 8,
  });
  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    newReviews: true,
    newCustomers: false,
  });

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <AdminLayout title="Settings" subtitle="Configure your store preferences">
      <div className="animate-fade-in space-y-8 max-w-2xl">
        {/* Store Info */}
        <div className="border border-border rounded-lg p-6">
          <h2 className="font-display text-lg flex items-center gap-2 mb-6"><Store size={18} /> Store Information</h2>
          <div className="space-y-4">
            <div>
              <Label>Store Name</Label>
              <Input value={storeSettings.storeName} onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label>Contact Email</Label>
              <Input value={storeSettings.storeEmail} onChange={(e) => setStoreSettings({ ...storeSettings, storeEmail: e.target.value })} className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Currency</Label>
                <Input value={storeSettings.currency} onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Tax Rate (%)</Label>
                <Input type="number" value={storeSettings.taxRate} onChange={(e) => setStoreSettings({ ...storeSettings, taxRate: Number(e.target.value) })} className="mt-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="border border-border rounded-lg p-6">
          <h2 className="font-display text-lg flex items-center gap-2 mb-6"><Bell size={18} /> Notification Preferences</h2>
          <div className="space-y-4">
            {[
              { key: 'newOrders', label: 'New orders', desc: 'Get notified when a new order is placed' },
              { key: 'lowStock', label: 'Low stock alerts', desc: 'Get notified when products are running low' },
              { key: 'newReviews', label: 'New reviews', desc: 'Get notified when customers leave reviews' },
              { key: 'newCustomers', label: 'New signups', desc: 'Get notified when new customers register' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={notifications[item.key as keyof typeof notifications]}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                />
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} className="btn-primary">
          Save Settings
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
