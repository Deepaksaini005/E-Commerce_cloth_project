import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Package, Users, DollarSign, Clock, TrendingUp, ArrowUpRight } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';

interface Order {
  id: string;
  order_number: string;
  status: string;
  grand_total: number;
  created_at: string;
  items: any[];
}

const AdminOverview = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [ordersRes, customersRes] = await Promise.all([
    supabase.from('orders').select('*').order('created_at', { ascending: false }),
    supabase.from('profiles').select('id', { count: 'exact', head: true })]
    );
    if (ordersRes.data) setOrders(ordersRes.data as Order[]);
    setCustomerCount(customersRes.count || 0);
    setLoading(false);
  };

  const totalRevenue = orders.reduce((acc, o) => acc + Number(o.grand_total), 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  const getStatusBadge = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colorMap[status] || 'bg-secondary text-secondary-foreground'}`}>
        {status}
      </span>);

  };

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>);

  }

  return (
    <AdminLayout title="Dashboard" subtitle="Welcome back! Here's your store overview.">
      <div className="animate-fade-in space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
          { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: DollarSign, trend: '+12.5%' },
          { label: 'Total Orders', value: orders.length, icon: Package, trend: '+8.2%' },
          { label: 'Pending Orders', value: pendingOrders, icon: Clock, trend: null },
          { label: 'Customers', value: customerCount, icon: Users, trend: '+15.3%' }].
          map((stat) =>
          <div key={stat.label} className="p-6 border border-border rounded-lg bg-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <stat.icon size={18} className="text-accent" />
              </div>
              <p className="font-display text-3xl font-semibold">{stat.value}</p>
              {stat.trend &&
            <p className="text-xs text-accent mt-2 flex items-center gap-1 bg-destructive">
                  <TrendingUp size={12} /> {stat.trend} from last month
                </p>
            }
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl">Recent Orders</h2>
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/orders')}>
              View All <ArrowUpRight size={14} className="ml-1" />
            </Button>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Order</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Items</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.slice(0, 5).map((order) =>
                <tr
                  key={order.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => navigate(`/admin/order/${order.id}`)}>
                  
                    <td className="px-4 py-3 text-sm font-medium">#{order.order_number}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{(order.items as any[]).length} items</td>
                    <td className="px-4 py-3 text-sm font-medium text-right">${Number(order.grand_total).toFixed(2)}</td>
                  </tr>
                )}
                {orders.length === 0 &&
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No orders yet</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>);

};

export default AdminOverview;