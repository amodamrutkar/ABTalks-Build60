import LandingMenu from '../components/landing/LandingMenu'
import HeroSection from '../components/landing/HeroSection'
import JourneySection from '../components/landing/JourneySection'
import PerksSection from '../components/landing/PerksSection'
import ReviewsSection from '../components/landing/ReviewsSection'

export default function LandingPage() {
  return (
    <div className="shell land-shell">
      <LandingMenu />
      <HeroSection />
      <JourneySection />
      <PerksSection />
      <ReviewsSection />
      <footer className="land-foot">
        ABTalks 60 · Build. Commit. Go.
      </footer>
    </div>
  )
}