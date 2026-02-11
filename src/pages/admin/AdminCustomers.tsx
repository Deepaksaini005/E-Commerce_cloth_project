import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Search, Mail, Phone } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';

interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  created_at: string;
}

const AdminCustomers = () => {
  const [customers, setCustomers] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (data) setCustomers(data as Profile[]);
      setLoading(false);
    };
    fetch();
  }, []);

  const filtered = customers.filter(c =>
    (c.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Customers" subtitle={`${customers.length} registered customers`}>
      <div className="animate-fade-in space-y-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input placeholder="Search customers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-muted-foreground col-span-full text-center py-12">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground col-span-full text-center py-12">No customers found</p>
          ) : filtered.map(customer => (
            <div key={customer.id} className="border border-border rounded-lg p-5 hover:border-accent/40 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-accent">
                    {(customer.full_name || customer.email || '?').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{customer.full_name || 'No name'}</p>
                  <p className="text-xs text-muted-foreground">
                    Joined {new Date(customer.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                {customer.email && (
                  <p className="flex items-center gap-2"><Mail size={14} /> {customer.email}</p>
                )}
                {customer.phone && (
                  <p className="flex items-center gap-2"><Phone size={14} /> {customer.phone}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
