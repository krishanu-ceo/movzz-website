import Navigation from '@/components/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import SpiralSection from '@/components/sections/SpiralSection'
import ConsequenceSection from '@/components/sections/ConsequenceSection'
import GlimmerSection from '@/components/sections/GlimmerSection'
import MagicSection from '@/components/sections/MagicSection'
import SocialProofSection from '@/components/sections/SocialProofSection'
import TeamSection from '@/components/sections/TeamSection'
import UrgencySection from '@/components/sections/UrgencySection'
import WaitlistSection from '@/components/sections/WaitlistSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <div className="section-divider" />
      <SpiralSection />
      <div className="section-divider" />
      <ConsequenceSection />
      <div className="section-divider" />
      <GlimmerSection />
      <div className="section-divider" />
      <MagicSection />
      <div className="section-divider" />
      <SocialProofSection />
      <div className="section-divider" />
      <TeamSection />
      <div className="section-divider" />
      <UrgencySection />
      <div className="section-divider" />
      <WaitlistSection />
      <Footer />
    </main>
  )
}
