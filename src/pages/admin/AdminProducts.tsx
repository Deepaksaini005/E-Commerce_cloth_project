import AdminLayout from '@/components/admin/AdminLayout';
import ProductManagement from '@/components/admin/ProductManagement';

const AdminProducts = () => {
  return (
    <AdminLayout title="Products" subtitle="Manage your product catalog">
      <ProductManagement />
    </AdminLayout>
  );
};

export default AdminProducts;
