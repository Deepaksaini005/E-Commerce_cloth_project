import { useState } from 'react';
import { Bell, Package, Users, MessageSquare, AlertTriangle, Check } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  type: 'order' | 'customer' | 'review' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', type: 'order', title: 'New Order Received', message: 'Order #ORD-2026-001 for $489.00', time: '2 minutes ago', read: false },
  { id: '2', type: 'customer', title: 'New Customer Signup', message: 'sarah@example.com just created an account', time: '15 minutes ago', read: false },
  { id: '3', type: 'review', title: 'New Review', message: '5-star review on Cashmere Ribbed Sweater', time: '1 hour ago', read: false },
  { id: '4', type: 'alert', title: 'Low Stock Alert', message: 'Italian Leather Oxfords - Only 2 left in size 42', time: '3 hours ago', read: true },
  { id: '5', type: 'order', title: 'Order Delivered', message: 'Order #ORD-2026-002 was marked as delivered', time: '5 hours ago', read: true },
  { id: '6', type: 'review', title: 'Flagged Review', message: 'A review on Premium Face Serum needs moderation', time: '1 day ago', read: true },
];

const iconMap = {
  order: Package,
  customer: Users,
  review: MessageSquare,
  alert: AlertTriangle,
};

const colorMap = {
  order: 'bg-blue-100 text-blue-600',
  customer: 'bg-green-100 text-green-600',
  review: 'bg-purple-100 text-purple-600',
  alert: 'bg-amber-100 text-amber-600',
};

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AdminLayout title="Notifications" subtitle={`${unreadCount} unread notifications`}>
      <div className="animate-fade-in space-y-6">
        {unreadCount > 0 && (
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={markAllRead}>
              <Check size={14} className="mr-2" /> Mark all as read
            </Button>
          </div>
        )}

        <div className="space-y-2">
          {notifications.map(notif => {
            const Icon = iconMap[notif.type];
            return (
              <div
                key={notif.id}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-colors cursor-pointer ${
                  notif.read
                    ? 'border-border bg-background'
                    : 'border-accent/30 bg-accent/5'
                }`}
                onClick={() => markRead(notif.id)}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorMap[notif.type]}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{notif.title}</p>
                    {!notif.read && <span className="w-2 h-2 rounded-full bg-accent shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications;
