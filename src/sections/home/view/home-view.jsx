import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';
import { AboutTestimonials } from 'src/components/testomonials/about-testimonials';
import { HomeZoneUI } from '../home-zone-ui';
import { HomeIntegrations } from '../home-integrations';
import { UserCardList } from 'src/sections/foods/user-card-list';
import { SampleFoods } from '../home-sample-foods';
import { AboutWhat } from '../about-what';
import { AboutVision } from '../about-vision';
// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />
      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <HomeZoneUI />
        <AboutWhat />
        <HomeIntegrations />
        {/* <UserCardList/> */}
        <SampleFoods />
        <BackToTop />
        {/* <AboutVision /> */}

        <AboutTestimonials />
      </Stack>
    </>
  );
}
