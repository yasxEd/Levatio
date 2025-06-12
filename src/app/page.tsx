import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ClassesSection from "@/components/sections/ClassesSection";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <ClassesSection />
      <CTASection />
      <ContactSection />
      <Testimonials />
    </main>
  );
}