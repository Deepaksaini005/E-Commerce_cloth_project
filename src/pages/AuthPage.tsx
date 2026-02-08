import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User as UserIcon, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const AuthPage = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup' | 'verify'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    const { error } = await signIn(formData.email, formData.password);
    setIsLoading(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Welcome back!');
      navigate('/');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.fullName) {
      toast.error('Please fill in all fields');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsLoading(true);
    const { error } = await signUp(formData.email, formData.password, formData.fullName);
    setIsLoading(false);
    if (error) {
      toast.error(error);
    } else {
      setMode('verify');
    }
  };

  if (mode === 'verify') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center animate-fade-in">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-accent" />
          </div>
          <h1 className="font-display text-3xl mb-3">Check Your Email</h1>
          <p className="text-muted-foreground mb-2">
            We've sent a verification link to
          </p>
          <p className="font-medium text-foreground mb-6">{formData.email}</p>
          <p className="text-sm text-muted-foreground mb-8">
            Click the link in the email to activate your account. Check your spam folder if you don't see it.
          </p>
          <Button onClick={() => setMode('login')} className="btn-primary w-full">
            Back to Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left - Decorative Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-foreground/20" />
        <div className="relative z-10 text-center px-12">
          <Link to="/" className="font-display text-5xl font-semibold text-primary-foreground mb-8 block">
            ÉLAN
          </Link>
          <h2 className="font-display text-3xl text-primary-foreground mb-4">
            {mode === 'login' ? 'Welcome Back' : 'Join ÉLAN'}
          </h2>
          <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-sm mx-auto">
            {mode === 'login'
              ? 'Sign in to access your orders, wishlist, and personalized recommendations.'
              : 'Create an account to enjoy exclusive benefits, faster checkout, and order tracking.'}
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-sm mx-auto">
            <div className="text-center">
              <p className="text-2xl font-display font-semibold text-primary-foreground">🛍️</p>
              <p className="text-xs text-primary-foreground/50 mt-1">Order Tracking</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-semibold text-primary-foreground">❤️</p>
              <p className="text-xs text-primary-foreground/50 mt-1">Saved Wishlist</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-semibold text-primary-foreground">🎁</p>
              <p className="text-xs text-primary-foreground/50 mt-1">Exclusive Offers</p>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border border-primary-foreground/5" />
        <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full border border-primary-foreground/5" />
      </div>

      {/* Right - Form */}
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
            <h1 className="font-display text-3xl md:text-4xl mb-2">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground">
              {mode === 'login'
                ? 'Welcome back! Enter your credentials.'
                : 'Fill in your details to get started.'}
            </p>
          </div>

          <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-5">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
            )}

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
                  placeholder="you@example.com"
                  className="pl-10 h-12"
                  required
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
                  required
                  minLength={6}
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

            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="pl-10 h-12"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full h-12 btn-primary text-sm">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            {mode === 'login' ? (
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button onClick={() => setMode('signup')} className="text-accent hover:underline font-medium">
                  Sign Up
                </button>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <button onClick={() => setMode('login')} className="text-accent hover:underline font-medium">
                  Sign In
                </button>
              </p>
            )}
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

export default AuthPage;
