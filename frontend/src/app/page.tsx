import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import FeaturesSection from "@/components/FeaturesSection";
import DemoScenarios from "@/components/DemoScenarios";
import ModulesSection from "@/components/ModulesSection";
import TechStack from "@/components/TechStack";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <DemoScenarios />
      <ModulesSection />
      <TechStack />
      <CTASection />
      <Footer />
    </main>
  );
}
