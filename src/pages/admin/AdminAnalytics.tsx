import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BarChart3, TrendingUp, ShoppingBag, DollarSign } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminAnalytics = () => {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, avgOrder: 0, topCategory: '' });
  const [monthlyData, setMonthlyData] = useState<{ month: string; revenue: number; orders: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: orders } = await supabase.from('orders').select('*');
      if (orders) {
        const revenue = orders.reduce((sum, o) => sum + Number(o.grand_total), 0);
        const avgOrder = orders.length > 0 ? revenue / orders.length : 0;

        // Category breakdown
        const categoryCounts: Record<string, number> = {};
        orders.forEach(o => {
          (o.items as any[]).forEach((item: any) => {
            const cat = item.category || 'unknown';
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
          });
        });
        const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

        // Monthly aggregation
        const monthly: Record<string, { revenue: number; orders: number }> = {};
        orders.forEach(o => {
          const month = new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
          if (!monthly[month]) monthly[month] = { revenue: 0, orders: 0 };
          monthly[month].revenue += Number(o.grand_total);
          monthly[month].orders += 1;
        });

        setStats({ revenue, orders: orders.length, avgOrder, topCategory });
        setMonthlyData(Object.entries(monthly).map(([month, data]) => ({ month, ...data })));
      }
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <AdminLayout title="Analytics">
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Analytics" subtitle="Sales performance and insights">
      <div className="animate-fade-in space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: 'Total Revenue', value: `$${stats.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: DollarSign },
            { label: 'Total Orders', value: stats.orders, icon: ShoppingBag },
            { label: 'Avg Order Value', value: `$${stats.avgOrder.toFixed(2)}`, icon: TrendingUp },
            { label: 'Top Category', value: stats.topCategory, icon: BarChart3 },
          ].map(stat => (
            <div key={stat.label} className="p-6 border border-border rounded-lg bg-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <stat.icon size={18} className="text-accent" />
              </div>
              <p className="font-display text-2xl font-semibold capitalize">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Monthly Breakdown */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="px-5 py-4 bg-muted/30 border-b border-border">
            <h2 className="font-display text-lg">Monthly Breakdown</h2>
          </div>
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Month</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Revenue</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Orders</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Avg Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {monthlyData.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No data available</td></tr>
              ) : monthlyData.map(row => (
                <tr key={row.month} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium">{row.month}</td>
                  <td className="px-4 py-3 text-sm text-right">${row.revenue.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-right">{row.orders}</td>
                  <td className="px-4 py-3 text-sm text-right">${(row.revenue / row.orders).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
