import { MessageCircle, Phone, CheckCircle, Shield, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface WhatsAppOrderShareProps {
  orderId: string;
  grandTotal: number;
  itemCount: number;
}

const WhatsAppOrderShare = ({ orderId, grandTotal, itemCount }: WhatsAppOrderShareProps) => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const [generatedOtp] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());

  const handleSendOtp = () => {
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      toast.error('Please enter a valid phone number with country code');
      return;
    }

    const message = encodeURIComponent(
      `🛍️ *ÉLAN Order Confirmation*\n\n` +
      `Order: #${orderId}\n` +
      `Items: ${itemCount} item(s)\n` +
      `Total: $${grandTotal.toFixed(2)}\n\n` +
      `🔐 Your verification OTP: *${generatedOtp}*\n\n` +
      `Please enter this OTP on the website to confirm your order.\n\n` +
      `Thank you for shopping with ÉLAN! 🎉`
    );

    const cleanPhone = phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setOtpSent(true);
    toast.success('WhatsApp opened! Send the message to receive your OTP.');
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setVerified(true);
      toast.success('Order verified successfully via WhatsApp!');
    } else {
      toast.error('Invalid OTP. Please check and try again.');
    }
  };

  if (verified) {
    return (
      <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 text-center animate-fade-in">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-7 h-7 text-green-600" />
        </div>
        <p className="text-sm font-semibold text-green-800">Order Verified via WhatsApp</p>
        <p className="text-xs text-green-600 mt-1">Your order #{orderId} has been confirmed</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-background to-secondary/30 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
          <MessageCircle size={22} className="text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display text-lg font-medium">WhatsApp Verification</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Shield size={12} /> Secure OTP verification for your order
          </p>
        </div>
      </div>

      {!otpSent ? (
        <div className="space-y-4">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="pl-10 h-12 text-base rounded-lg"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Enter your WhatsApp number with country code (e.g., +91 for India)
          </p>
          <Button onClick={handleSendOtp} className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-primary-foreground rounded-lg font-medium">
            <Send size={16} className="mr-2" />
            Send OTP via WhatsApp
          </Button>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
            <p className="text-xs text-muted-foreground text-center">
              📱 A WhatsApp message was opened. <strong>Send it</strong> to yourself, then enter the OTP below.
            </p>
          </div>
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            className="text-center tracking-[0.5em] font-mono text-lg h-14 rounded-lg border-2 focus:border-green-500"
          />
          <div className="flex gap-3">
            <Button onClick={handleVerifyOtp} disabled={otp.length !== 6} className="flex-1 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-primary-foreground rounded-lg font-medium">
              <CheckCircle size={16} className="mr-2" />
              Verify Order
            </Button>
            <Button variant="outline" onClick={handleSendOtp} className="h-12 rounded-lg px-6">
              Resend
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppOrderShare;
