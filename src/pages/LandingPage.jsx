import LandingMenu from '../components/landing/LandingMenu'
import HeroSection from '../components/landing/HeroSection'
import JourneySection from '../components/landing/JourneySection'
import PerksSection from '../components/landing/PerksSection'
import ReviewsSection from '../components/landing/ReviewsSection'
import SiteFooter from '../components/landing/SiteFooter'

export default function LandingPage() {
  return (
    <div className="shell land-shell">
      <LandingMenu />
      <HeroSection />
      <JourneySection />
      <PerksSection />
      <ReviewsSection />
      <SiteFooter />
    </div>
  )
}