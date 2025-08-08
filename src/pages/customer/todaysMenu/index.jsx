import { Helmet } from 'react-helmet-async';
import { AuthGuard } from 'src/auth/customer/guard';
import { DashboardContent } from 'src/layouts/customer/dashboard';
import { CONFIG } from 'src/config-global';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Menu } from 'src/sections/customer/todaysMenu/view';

// ----------------------------------------------------------------------

const metadata = { title: `Todays menu - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Menu"
          links={[{ name: null, href: null }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <AuthGuard>
          <Menu />
        </AuthGuard>
      </DashboardContent>
    </>
  );
}
