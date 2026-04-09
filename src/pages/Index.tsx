import MatrixRain from "@/components/MatrixRain";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import TimelineSection from "@/components/TimelineSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
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
