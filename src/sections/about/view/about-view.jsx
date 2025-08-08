import { AboutWhat } from '../about-what';
import { AboutTeam } from '../about-team';
import { AboutVision } from '../about-vision';
import { AboutTestimonials } from 'src/components/testomonials/about-testimonials';
import { HoriZontalTestomonials } from '../horizontal-testomonials';
import { AboutFAQs } from '../faqs';
import HeroSection from '../about-home';

// ----------------------------------------------------------------------

export function AboutView() {
  return (
    <>
      <HeroSection />
      <AboutWhat />

      {/* <AboutVision /> */}
      {/* <HoriZontalTestomonials /> */}

      {/* <AboutTeam /> */}
      <AboutFAQs />
    </>
  );
}
