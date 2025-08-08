import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { varScale } from 'src/components/animate';

import { fPercent } from 'src/utils/format-number';

import { CONFIG } from 'src/config-global';
import { varAlpha, stylesMode } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export const SKILLS = [...Array(3)].map((_, index) => ({
  label: ['Tasty', 'Food', 'Service'][index],
  value: [90, 80, 80][index],
}));

// ----------------------------------------------------------------------

export function AboutWhat({ sx, ...other }) {
  return (
    <Box component="section" sx={{ overflow: 'hidden', ...sx }} {...other}>
      <Container
        component={MotionViewport}
        sx={{
          py: { xs: 10, md: 15 },
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Container>
          <Grid disableEqualOverflow container spacing={{ xs: 5, md: 8 }}>
            <Grid xs={12} md={6} lg={7}>
              <Box
                component={m.img}
                variants={{ ...varScale().in, initial: { scale: 0.8, opacity: 0 } }}
                alt="Integration"
                src={`${CONFIG.assetsDir}/assets/images/about/dabbaBagroundre.png`}
                sx={{ width: 700, objectFit: 'cover', aspectRatio: '1/1' }}
              />
              {/* {renderDescription} */}
            </Grid>

            <Grid xs={12} md={6} lg={5} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              {/* {renderImg} */}{' '}
              <m.div variants={varFade().inRight}>
                <Typography variant="h2" sx={{ mb: 3 }}>
                  What is Website?
                </Typography>
              </m.div>
              <m.div variants={varFade().inRight}>
                <Typography
                  sx={{ color: 'text.secondary', [stylesMode.dark]: { color: 'common.white' } }}
                >
                  Website is not just a tiffin service—it's a personalized meal experience
                  designed to meet the diverse needs of modern lifestyles. Whether you're craving
                  homemade food, need a convenient solution for daily meals, or want to maintain a
                  healthy diet, Website has got you covered.
                </Typography>
              </m.div>
              <Box gap={3} display="flex" flexDirection="column" sx={{ my: 5 }}>
                {SKILLS.map((progress, index) => (
                  <Box component={m.div} key={progress.label} variants={varFade().inRight}>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ mb: 1, color: 'text.secondary', typography: 'body2' }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ flexGrow: 1, textAlign: 'left', color: 'text.primary' }}
                      >
                        {progress.label}
                      </Typography>
                      {fPercent(progress.value)}
                    </Box>

                    <LinearProgress
                      color={(index === 0 && 'primary') || (index === 1 && 'warning') || 'error'}
                      variant="determinate"
                      value={progress.value}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
        {/* <Grid container columnSpacing={{ md: 3 }} alignItems="flex-start">
          <Grid
            container
            xs={12}
            md={6}
            lg={7}
            alignItems="center"
            sx={{
              pr: { md: 7 },
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Grid xs={6} sx={{ borderRadius: 3 }}>
              <m.div variants={varFade().inUp}>
                <Image
                  alt="Our office small"
                  src={`${CONFIG.assetsDir}/assets/images/about/food.jpg`}
                  ratio="1/1"
                  sx={(theme) => ({
                    borderRadius: 3,
                    boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
                    [stylesMode.dark]: {
                      boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
                    },
                  })}
                />
              </m.div>
            </Grid>

            <Grid xs={6} sx={{ borderRadius: 3 }}>
              <m.div variants={varFade().inUp}>
                <Image
                  alt="Our office large"
                  src={`${CONFIG.assetsDir}/assets/images/about/tiffin.jpg`}
                  ratio="3/4"
                  sx={(theme) => ({
                    borderRadius: 7,
                    boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
                    [stylesMode.dark]: {
                      boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
                    },
                  })}
                />
              </m.div>
            </Grid>
          </Grid>

          <Grid xs={12} md={6} lg={5}></Grid>
        </Grid> */}
      </Container>
    </Box>
  );
}
