import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { resolveProductImage } from '@/lib/productImages';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DBProduct {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image: string;
  category: string;
  subcategory: string;
  sizes: string[];
  colors: string[];
  description: string;
  is_new: boolean | null;
  is_sale: boolean | null;
  rating: number | null;
  reviews: number | null;
  in_stock: boolean | null;
  created_at: string;
  eco_score: number | null;
  material_type: string | null;
  is_eco_friendly: boolean | null;
}

const emptyForm = {
  name: '',
  price: 0,
  original_price: '',
  image: '',
  category: 'women' as string,
  subcategory: '',
  sizes: '',
  colors: '',
  description: '',
  is_new: false,
  is_sale: false,
  in_stock: true,
  eco_score: '',
  material_type: '',
  color_images: '' as string, // JSON string of {color: url} pairs
};

const ProductManagement = () => {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DBProduct | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProducts(data as DBProduct[]);
    setLoading(false);
  };

  const openAddDialog = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (product: DBProduct) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      original_price: product.original_price?.toString() || '',
      image: product.image,
      category: product.category,
      subcategory: product.subcategory,
      sizes: product.sizes.join(', '),
      colors: product.colors.join(', '),
      description: product.description,
      is_new: product.is_new ?? false,
      is_sale: product.is_sale ?? false,
      in_stock: product.in_stock ?? true,
      eco_score: product.eco_score?.toString() || '',
      material_type: product.material_type || '',
      color_images: '',
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.category || !form.subcategory) {
      toast.error('Please fill in required fields (name, price, category, subcategory)');
      return;
    }

    setSaving(true);
    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      image: form.image.trim() || '/placeholder.svg',
      category: form.category,
      subcategory: form.subcategory.trim(),
      sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: form.colors.split(',').map(c => c.trim()).filter(Boolean),
      description: form.description.trim(),
      is_new: form.is_new,
      is_sale: form.is_sale,
      in_stock: form.in_stock,
      eco_score: form.eco_score ? Number(form.eco_score) : null,
      material_type: form.material_type.trim() || null,
      is_eco_friendly: form.eco_score ? Number(form.eco_score) >= 70 : false,
    };

    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', editingProduct.id);
      if (error) {
        toast.error('Failed to update product');
        console.error(error);
      } else {
        toast.success('Product updated!');
      }
    } else {
      const { error } = await supabase
        .from('products')
        .insert(payload);
      if (error) {
        toast.error('Failed to add product');
        console.error(error);
      } else {
        toast.success('Product added!');
      }
    }

    setSaving(false);
    setDialogOpen(false);
    fetchProducts();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete product');
    } else {
      toast.success('Product deleted');
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="animate-fade-in space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-3 flex-1 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="women">Women</SelectItem>
              <SelectItem value="men">Men</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAddDialog} className="btn-primary shrink-0">
          <Plus size={16} className="mr-2" /> Add Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Product</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Category</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Subcategory</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Price</th>
              <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Status</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No products found</td></tr>
            ) : (
              filtered.map(product => (
                <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={resolveProductImage(product.image)}
                        alt={product.name}
                        className="w-12 h-14 object-cover rounded border border-border"
                        loading="lazy"
                        style={{ imageRendering: 'auto' }}
                      />
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px]">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.sizes.length} sizes · {product.colors.length} colors</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm capitalize hidden md:table-cell">{product.category}</td>
                  <td className="px-4 py-3 text-sm capitalize hidden lg:table-cell">{product.subcategory}</td>
                  <td className="px-4 py-3 text-sm font-medium text-right">
                    ${Number(product.price).toFixed(0)}
                    {product.original_price && (
                      <span className="block text-xs text-muted-foreground line-through">${Number(product.original_price).toFixed(0)}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center hidden md:table-cell">
                    <div className="flex items-center justify-center gap-1.5">
                      {product.is_new && <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">New</span>}
                      {product.is_sale && <span className="px-2 py-0.5 rounded-full text-xs bg-accent/10 text-accent">Sale</span>}
                      {!product.in_stock && <span className="px-2 py-0.5 rounded-full text-xs bg-destructive/10 text-destructive">Out of Stock</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(product)}>
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id, product.name)} className="text-destructive hover:text-destructive">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price *</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="mt-1" />
              </div>
              <div>
                <Label>Original Price (sale)</Label>
                <Input type="number" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} className="mt-1" placeholder="Leave empty if no sale" />
              </div>
            </div>
            <div>
              <Label>Image URL</Label>
              <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="mt-1" placeholder="https://... (use full HD image URL)" />
              <p className="text-xs text-muted-foreground mt-1">Use high-resolution image URLs for best quality. Images are displayed at full resolution.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="men">Men</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Subcategory *</Label>
                <Input value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} className="mt-1" placeholder="e.g. shoes, watches" />
              </div>
            </div>
            <div>
              <Label>Sizes (comma-separated)</Label>
              <Input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className="mt-1" placeholder="S, M, L, XL" />
            </div>
            <div>
              <Label>Colors (comma-separated)</Label>
              <Input value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} className="mt-1" placeholder="Black, White, Navy" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Eco Score (0-100)</Label>
                <Input type="number" value={form.eco_score} onChange={(e) => setForm({ ...form, eco_score: e.target.value })} className="mt-1" placeholder="0-100" min={0} max={100} />
              </div>
              <div>
                <Label>Material Type</Label>
                <Input value={form.material_type} onChange={(e) => setForm({ ...form, material_type: e.target.value })} className="mt-1" placeholder="organic, recycled, etc." />
              </div>
            </div>
            <div>
              <Label>Color-specific Image URLs</Label>
              <Textarea value={form.color_images} onChange={(e) => setForm({ ...form, color_images: e.target.value })} className="mt-1" rows={2} placeholder="Black: https://..., White: https://..." />
              <p className="text-xs text-muted-foreground mt-1">Format: Color: URL, one per line or comma-separated. These show when user selects a color.</p>
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.is_new} onChange={(e) => setForm({ ...form, is_new: e.target.checked })} className="rounded" />
                New Arrival
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.is_sale} onChange={(e) => setForm({ ...form, is_sale: e.target.checked })} className="rounded" />
                On Sale
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.in_stock} onChange={(e) => setForm({ ...form, in_stock: e.target.checked })} className="rounded" />
                In Stock
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} disabled={saving} className="btn-primary flex-1">
                {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
