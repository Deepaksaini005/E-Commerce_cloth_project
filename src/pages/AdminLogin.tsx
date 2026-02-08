import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { signIn, user, isAdmin, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (!isLoading && user && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsSubmitting(true);
    const { error } = await signIn(formData.email, formData.password);
    setIsSubmitting(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Signed in successfully');
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left - Decorative Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-foreground/20" />
        <div className="relative z-10 text-center px-12">
          <Link to="/" className="font-display text-5xl font-semibold text-primary-foreground mb-8 block">
            ÉLAN
          </Link>
          <div className="w-20 h-20 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="font-display text-3xl text-primary-foreground mb-4">
            Admin Portal
          </h2>
          <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-sm mx-auto">
            Manage your store, products, orders, and customer relationships from one powerful dashboard.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-sm mx-auto">
            <div className="text-center">
              <p className="text-2xl font-display font-semibold text-primary-foreground">24</p>
              <p className="text-xs text-primary-foreground/50 mt-1">Products</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-semibold text-primary-foreground">1.2K</p>
              <p className="text-xs text-primary-foreground/50 mt-1">Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-semibold text-primary-foreground">98%</p>
              <p className="text-xs text-primary-foreground/50 mt-1">Satisfaction</p>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border border-primary-foreground/5" />
        <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full border border-primary-foreground/5" />
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back to Store</span>
          </button>

          <div className="lg:hidden mb-8">
            <Link to="/" className="font-display text-3xl font-semibold">ÉLAN</Link>
          </div>

          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl mb-2">Admin Sign In</h1>
            <p className="text-muted-foreground">Enter your admin credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@elan.com"
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 btn-primary text-sm"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Not an admin?{' '}
              <Link to="/auth" className="text-accent hover:underline font-medium">
                Customer Sign In
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              Protected by enterprise-grade encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
