import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { _mapContact } from 'src/_mock';

import { ContactMap } from '../contact-map';
import { ContactHero } from '../contact-hero';
import { ContactForm } from '../contact-form';

// ----------------------------------------------------------------------

export function ContactView() {
  return (
    <>
      <ContactHero />

      <Container component="section" sx={{ py: 10 }}>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(0, 1fr)' }}
          justifyContent="center" // Centers items horizontally
          alignItems="center" // Centers items vertically
          // Optionally, add a height to center vertically relative to the Box's height
          // height="100vh"
        >
          <ContactForm
            // If you want the form to span all columns on smaller screens
            sx={{
              gridColumn: { xs: '1 / -1', md: 'auto' },
              margin: 'auto', // Ensures the form is centered within its grid cell
            }}
          />

          {/* If you decide to include the ContactMap later, ensure it aligns correctly */}
          {/* <ContactMap contacts={_mapContact} /> */}
        </Box>
      </Container>
    </>
  );
}
