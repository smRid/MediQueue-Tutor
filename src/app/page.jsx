import HeroSection from "@/components/heroSection/HeroSection";
import AvailableTutors from "@/components/AvailableTutors";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import LearningTips from "@/components/home/LearningTips";
import CtaBand from "@/components/home/CtaBand";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AvailableTutors />
      <LearningTips />
      <WhyChooseUs />
      <HowItWorks />
    </>
  );
}


