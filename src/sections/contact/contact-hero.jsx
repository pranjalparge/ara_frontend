import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

import { varFade, AnimateText, MotionContainer, animateTextClasses } from 'src/components/animate';

// ----------------------------------------------------------------------

const CONTACTS = [
  {
    country: 'Pune',
    address: 'VJ one Avenue shop no. 220 hinjewadi phase 1 maan road pune 411057',
    phoneNumber: '7391044497',
  },
];

// ----------------------------------------------------------------------

export function ContactHero({ sx, ...other }) {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        ...bgGradient({
          color: `0deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)}, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)}`,
          imgUrl: `${CONFIG.assetsDir}/assets/images/contact/findus.jpg`,
        }),
        height: { md: 560 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <AnimateText
            component="h1"
            variant="h1"
            text={['Where', 'to find us?']}
            variants={varFade({ distance: 24 }).inUp}
            sx={{
              color: 'common.white',
              [`& .${animateTextClasses.line}[data-index="0"]`]: {
                [`& .${animateTextClasses.word}[data-index="0"]`]: { color: 'primary.main' },
              },
            }}
          />

          <Box
            columnGap={{ xs: 2, md: 5 }}
            rowGap={{ xs: 5, md: 0 }}
            display={{ xs: 'grid', md: 'flex' }}
            gridTemplateColumns={{ xs: 'repeat(2, 1fr)' }}
            sx={{ mt: 5, color: 'common.white' }}
          >
            {CONTACTS.map((contact) => (
              <Box key={contact.country}>
                <m.div variants={varFade({ distance: 24 }).inUp}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {contact.address}
                  </Typography>
                </m.div>

                <m.div variants={varFade({ distance: 24 }).inUp}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {contact.phoneNumber}
                  </Typography>
                </m.div>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
