// app/courses/payment-success/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentSuccess from "@/components/PaymentSuccess";

export const dynamic = "force-dynamic";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PaymentSuccess />
      <Footer />
    </div>
  );
}