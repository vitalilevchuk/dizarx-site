import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import IndustryRecognition from "@/components/IndustryRecognition";
import MediaEvolutionSection from "@/components/MediaEvolutionSection";
import HowItStartsSection from "@/components/HowItStartsSection";
import AttentionMemorySection from "@/components/AttentionMemorySection";
import MobileMediaEvolutionSection from "@/components/mobile/MobileMediaEvolutionSection";
import MobileProcessSection from "@/components/mobile/MobileProcessSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="page-sections">
        <Hero />
        <div id="proof" className="proof-section">
          <TrustedBrands />
          <div className="industry-recognition-wrap">
            <IndustryRecognition />
          </div>
        </div>

        {/* Desktop — без изменений от md и выше */}
        <div className="hidden md:block">
          <MediaEvolutionSection />
          <HowItStartsSection />
        </div>

        {/* Mobile — media evolution + process */}
        <MobileMediaEvolutionSection />
        <MobileProcessSection />

        <AttentionMemorySection />
      </main>
      <Footer className="page-footer" />
    </>
  );
}
