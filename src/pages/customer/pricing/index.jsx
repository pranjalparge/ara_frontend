import { Helmet } from 'react-helmet-async';
import { AuthGuard } from 'src/auth/customer/guard';

import { CONFIG } from 'src/config-global';

import { PricingView } from 'src/sections/customer/pricing/view';

// ----------------------------------------------------------------------

const metadata = { title: `Pricing - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <AuthGuard>
        <PricingView />
      </AuthGuard>
    </>
  );
}
