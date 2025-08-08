import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { CONFIG } from 'src/config-global';

import { varScale, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatDotIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

export function HomeIntegrations({ sx, ...other }) {
  const renderLines = (
    <>
      <Stack
        spacing={8}
        alignItems="center"
        sx={{
          top: 64,
          left: 80,
          zIndex: 2,
          bottom: 64,
          position: 'absolute',
          transform: 'translateX(-7px)',
          '& span': { position: 'static', opacity: 0.12 },
        }}
      >
        <FloatDotIcon />
        <FloatDotIcon sx={{ opacity: 0.24, width: 14, height: 14 }} />
        <Box sx={{ flexGrow: 1 }} />
        <FloatDotIcon sx={{ opacity: 0.24, width: 14, height: 14 }} />
        <FloatDotIcon />
      </Stack>
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
    </>
  );

  const renderDescription = (
    <SectionTitle
      caption=""
      title="HEALTHY"
      txtGradient="MEAL"
      description={
        <>
          <Box component="span" sx={{ mb: 1, display: 'block' }}>
          At Website, we believe that healthy eating doesn’t have to be boring or complicated. That’s why we offer freshly prepared, balanced meals that nourish your body while delighting your taste buds. Whether you’re managing a specific health condition or simply aiming to maintain a balanced diet, our meals are designed to support your goals without compromising on flavor.
<br></br><br></br>
At Website, we believe that good health starts with good food. Every meal we prepare is designed to be nutritionally balanced, offering the right mix of proteins, carbohydrates, healthy fats, and essential vitamins. Our dishes are made using fresh, high-quality ingredients with minimal oil and no artificial additives, ensuring that you enjoy a wholesome and delicious experience. Whether you’re focused on weight management, maintaining energy throughout the day, or simply eating clean, Tumcha Dabba provides meals that align with your health goals while never compromising on taste.

          </Box>
          {/* <Box
            component="span"
            sx={{
              fontStyle: 'italic',
              color: 'text.disabled',
              typography: 'caption',
            }}
          >
            * Only includes authentication methods.
            <br />* Database not included.
          </Box> */}
        </>
      }
      sx={{ textAlign: { xs: 'center', md: 'left' } }}
    />
  );

  const renderImg = (
    <Box
      component={m.img}
      variants={{ ...varScale().in, initial: { scale: 0.8, opacity: 0 } }}
      alt="Integration"
      src={`${CONFIG.assetsDir}/assets/images/about/whyus.jpg`}
      sx={{ width: 600, objectFit: 'cover', aspectRatio: '1/1' }}
    />
  );

  return (
    <Box component="section" sx={{ pt: 10, mb: 10, position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        {renderLines}

        <Container>
          <Grid disableEqualOverflow container spacing={{ xs: 5, md: 8, mb: 5 }}>
            <Grid xs={12} md={12} lg={12}>
              {renderDescription}
            </Grid>

            {/* <Grid xs={12} md={6} lg={7} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              {renderImg}
            </Grid> */}
          </Grid>
        </Container>
      </MotionViewport>
    </Box>
  );
}
