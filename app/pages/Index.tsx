import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import AudienceSection from "@/components/AudienceSection";
import FeaturesSection from "@/components/FeaturesSection";
import LearningFormatsSection from "@/components/LearningFormatsSection";
import CoursesSection from "@/components/CoursesSection";
import CredibilitySection from "@/components/CredibilitySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import FAQPreviewSection from "@/components/FAQPreviewSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <AudienceSection />
      <FeaturesSection />
      <LearningFormatsSection />
      <CoursesSection />
      <CredibilitySection />
      <TestimonialsSection />
      <CTASection />
      <FAQPreviewSection />
      <Footer />
    </div>
  );
};

export default Index;
