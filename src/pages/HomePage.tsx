import { useRef } from "react";
import LandingSection from "@/components/LandingSection";
import MainSection from "@/components/MainSection";

const HomePage = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToMain = () => {
    mainRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y md:snap-mandatory scroll-smooth"
    >
      <LandingSection onScrollDown={scrollToMain} />
      <div ref={mainRef} id="main">
        <MainSection
          onCTAClick={() => {
            window.location.href = "/experience";
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
