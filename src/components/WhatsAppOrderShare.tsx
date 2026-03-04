import { MessageCircle, Phone, CheckCircle } from 'lucide-react';
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
    if (!phone || phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    // Generate WhatsApp message with OTP
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
    toast.success('WhatsApp message opened! Check your OTP.');
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
      <div className="p-5 border border-green-200 bg-green-50 rounded-lg text-center animate-fade-in">
        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
        <p className="text-sm font-medium text-green-800">Order Verified via WhatsApp</p>
        <p className="text-xs text-green-600 mt-1">Your order has been confirmed</p>
      </div>
    );
  }

  return (
    <div className="p-5 border border-border rounded-lg space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <MessageCircle size={20} className="text-green-600" />
        </div>
        <div>
          <h3 className="font-medium text-sm">WhatsApp Order Verification</h3>
          <p className="text-xs text-muted-foreground">Verify your order via WhatsApp OTP</p>
        </div>
      </div>

      {!otpSent ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WhatsApp number (with country code)"
                className="pl-10"
              />
            </div>
          </div>
          <Button onClick={handleSendOtp} className="w-full bg-green-600 hover:bg-green-700 text-white h-10 text-sm">
            <MessageCircle size={16} className="mr-2" />
            Send OTP via WhatsApp
          </Button>
        </div>
      ) : (
        <div className="space-y-3 animate-fade-in">
          <p className="text-xs text-muted-foreground">Enter the 6-digit OTP sent to your WhatsApp</p>
          <div className="flex gap-2">
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="text-center tracking-[0.5em] font-mono"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleVerifyOtp} className="flex-1 bg-green-600 hover:bg-green-700 text-white h-10 text-sm">
              Verify Order
            </Button>
            <Button variant="outline" onClick={handleSendOtp} className="text-sm h-10">
              Resend
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppOrderShare;
