import MatrixRain from "@/components/MatrixRain";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import TimelineSection from "@/components/TimelineSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { useLocale } from "@/contexts/LocaleContext";
import { getHomeMetadata } from "@/lib/seo";

const Index = () => {
  const { locale } = useLocale();

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <SeoHead metadata={getHomeMetadata(locale)} />
      <MatrixRain />
      <Navbar />
      <HeroSection />
      <ExperienceSection />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
