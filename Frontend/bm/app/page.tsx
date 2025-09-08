import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { VendorStalls } from "@/components/vendor-stalls"
import { FeaturedProducts } from "@/components/featured-products"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <VendorStalls />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  )
}
