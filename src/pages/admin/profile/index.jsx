import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';

import { CONFIG } from 'src/config-global';

import { Profile } from 'src/sections/admin/profile/view';
import { DashboardContent } from 'src/layouts/admin/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { AuthGuard } from 'src/auth/admin/guard';
// ----------------------------------------------------------------------

const metadata = { title: `Profile | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <Container>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Profile"
          links={[{ name: null, href: null }]}
          //sx={{ mb: { xs: 3, md: 5 } }}
        />
        <AuthGuard>
          <Profile />
        </AuthGuard>
      </DashboardContent>
    </Container>
  );
}
