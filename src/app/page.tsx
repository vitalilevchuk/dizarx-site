import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import IndustryRecognition from "@/components/IndustryRecognition";
import MediaEvolutionSection from "@/components/MediaEvolutionSection";
import HowItStartsSection from "@/components/HowItStartsSection";
import AttentionMemorySection from "@/components/AttentionMemorySection";
/* Скрытые секции — не удалять, вернуть при необходимости */
// import WhatWeDo from "@/components/WhatWeDo";
// import HowWeCreateGrowth from "@/components/HowWeCreateGrowth";
// import WhoWeWorkWith from "@/components/WhoWeWorkWith";
// import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="page-sections">
        <Hero />
        <div id="proof" className="proof-section">
          <TrustedBrands />
          <IndustryRecognition />
        </div>
        <MediaEvolutionSection />
        <HowItStartsSection />
        <AttentionMemorySection />
        {/* Скрытые секции — не удалять */}
        {/* <WhatWeDo /> */}
        {/* <HowWeCreateGrowth /> */}
        {/* <WhoWeWorkWith /> */}
        {/* <CTA /> */}
      </main>
      <Footer className="page-footer" />
    </>
  );
}
