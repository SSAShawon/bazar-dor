import AllProducts from "@/components/AllProducts";
import FallingProducts from "@/components/FallingProducts";
import Hero from "@/components/Hero";
import PriceMarquee from "@/components/PriceMarquee";
import RisingProducts from "@/components/RisingProducts";

export default function Home() {
  return <main>
    <PriceMarquee/>
    <Hero/>
    <RisingProducts/>
    <FallingProducts/>
    <AllProducts/>
      </main>;
}
