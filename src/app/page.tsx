import { AboutAssociation } from "@/components/home/AboutAssociation";
import { FullWidthCta } from "@/components/home/FullWidthCta";
import { Hero } from "@/components/home/Hero";
import { PricingPreview } from "@/components/home/PricingPreview";
import { Solutions } from "@/components/home/Solutions";

export default function Home() {
  return (
    <>
      <Hero />
      <Solutions />
      <AboutAssociation />
      <FullWidthCta />
      <PricingPreview />
    </>
  );
}
