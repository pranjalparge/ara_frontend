import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { useEffect } from 'react';

import CardContent from '@mui/material/CardContent';
import { useMediaQuery, useTheme } from '@mui/material';
import { useGetStaticMutation } from '../../redux/slices/customer/auth';

import { Iconify } from 'src/components/iconify';

export default function HeroSection() {
  const [getTestimon, { data, isLoading, isSuccess }] = useGetStaticMutation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    getTestimon();
  }, []);
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Top section with icon and text */}
      <Box display="flex" alignItems="center" gap={1} mb={4}>
        <Box
          sx={{
            bgcolor: 'rgba(63, 81, 181, 0.1)',
            borderRadius: '50%',
            p: 1,
            display: 'flex',
          }}
        ></Box>
        <Typography
          variant="subtitle1"
          sx={{
            color: 'text.secondary',
          }}
        >
          Know about your food providers
        </Typography>
      </Box>

      {/* Main content grid */}

      <Grid container spacing={4} alignItems="center" mb={8}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: 'primary.main',
              mb: 2,
              lineHeight: 1.2,
            }}
          >
           About Us
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{
              color: 'text.primary',
              fontWeight: 'normal',
            }}
          >
            {data?.data?.[0]?.discription}
            {/* Online courses from the worlds leading experts. Lorem ipsum is simply dummy of the
            printing and typesetting industry lorem */}
          </Typography>
        </Grid>
      </Grid>

      {/* Feature cards */}
      <Grid container spacing={4}>
        {[
          {
            icon: (
              <Iconify
                icon="simple-icons:codechef"
                className="QontoStepIcon-completedIcon"
                width={50}
                height={50}
              />
            ),
            title: 'Professional Chef',
            description: 'At Website, our professional chefs craft delicious, home-style meals with precision, ensuring every bite is flavorful and nutritious. With a passion for quality and authenticity, they tailor meals to meet diverse tastes and dietary needs.',
          },

          {
            icon: (
              <Iconify
                icon="emojione-v1:pot-of-food"
                className="QontoStepIcon-completedIcon"
                width={50}
                height={50}
              />
            ),
            title: 'Teasty Foods',
            description: 'At Website, we deliver tasty, home-style meals that are fresh, flavorful, and made with love. Every dish is crafted to bring comfort and satisfaction to your plate, just like homemade food!',
          },
          {
            icon: (
              <Iconify
                icon="fluent:person-call-16-regular"
                className="QontoStepIcon-completedIcon"
                width={50}
                height={50}
              />
            ),
            title: 'Real-Time Support',
            description: 'At Website, we offer real-time support to ensure a seamless experience for our customers. Whether its meal customization or delivery updates, our team is always here to assist you instantly!',
          },
        ].map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                bgcolor: 'rgba(241, 243, 255, 0.7)',
                boxShadow: 'none',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 4,
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'white',
                    borderRadius: '50%',
                    p: 2,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: 'primary.main',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
