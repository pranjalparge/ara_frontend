import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';

import { _testimonials } from 'src/_mock';
import { CONFIG } from 'src/config-global';
import { bgBlur, varAlpha, bgGradient, hideScrollY } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export function AboutTestimonials({ sx, ...other }) {
  const theme = useTheme();

  const renderLink = (
    <Button color="primary" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}>
      Read more
    </Button>
  );

  const renderDescription = (
    <Box
      sx={{
        maxWidth: { md: 360 },
        textAlign: { xs: 'center', md: 'unset' },
      }}
    >
      <m.div variants={varFade().inUp}>
        <Typography variant="overline" sx={{ color: 'common.white', opacity: 0.48 }}>
          Testimonials
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ my: 3, color: 'common.white' }}>
          Who love <br />
          Our Food
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography sx={{ color: 'common.white' }}>
          Our food is loved by a diverse range of people, including busy professionals seeking
          convenient and healthy meals, students who crave affordable, home-cooked options, and
          elderly individuals who appreciate nutritious, easy-to-digest food tailored to their
          dietary needs. Families with kids enjoy the variety and freshness, while fitness
          enthusiasts value the transparent nutritional information and balanced meal plans.
          Travelers and expats cherish the authentic Indian flavors that remind them of home, and
          health-conscious customers appreciate our personalized suggestions for special conditions
          like diabetes. Whether you're looking for convenience, nutrition, or authentic taste,
          Website offers something for everyone!
        </Typography>
      </m.div>
    </Box>
  );

  const renderContent = (
    <Box
      sx={{
        ...hideScrollY,
        py: { md: 10 },
        height: { md: 1 },
        overflowY: { xs: 'unset', md: 'auto' },
      }}
    >
      <Masonry spacing={3} columns={{ xs: 1, md: 2 }} sx={{ ml: 0 }}>
        {_testimonials.map((testimonial) => (
          <m.div key={testimonial.name} variants={varFade().inUp}>
            <TestimonialItem testimonial={testimonial} />
          </m.div>
        ))}
      </Masonry>
    </Box>
  );

  return (
    <Box
      component="section"
      sx={{
        ...bgGradient({
          color: `0deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.9)}, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.9)}`,
          imgUrl: `${CONFIG.assetsDir}/assets/images/about/testimonials.webp`,
        }),
        overflow: 'hidden',
        height: { md: 840 },
        py: { xs: 10, md: 0 },
        ...sx,
      }}
      {...other}
    >
      <Container component={MotionViewport} sx={{ position: 'relative', height: 1 }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ height: 1 }}
        >
          <Grid xs={10} md={4}>
            {renderDescription}
          </Grid>

          <Grid xs={12} md={7} lg={6} alignItems="center" sx={{ height: 1 }}>
            {renderContent}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function TestimonialItem({ testimonial, sx, ...other }) {
  const theme = useTheme();

  return (
    <Box
      gap={3}
      display="flex"
      flexDirection="column"
      sx={{
        ...bgBlur({ color: varAlpha(theme.vars.palette.common.whiteChannel, 0.08) }),
        p: 3,
        borderRadius: 2,
        color: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <Iconify icon="mingcute:quote-left-fill" width={40} sx={{ opacity: 0.48 }} />

      <Typography variant="body2">{testimonial.content}</Typography>

      <Rating value={testimonial.ratingNumber} readOnly size="small" />

      <Box gap={2} display="flex">
        <Avatar alt={testimonial.name} src={testimonial.avatarUrl} />

        <ListItemText
          primary={testimonial.name}
          secondary={fDate(testimonial.postedDate)}
          primaryTypographyProps={{ typography: 'subtitle2', mb: 0.5 }}
          secondaryTypographyProps={{
            color: 'inherit',
            typography: 'caption',
            sx: { opacity: 0.64 },
          }}
        />
      </Box>
    </Box>
  );
}
