import { Helmet } from 'react-helmet-async';
import { AuthGuard } from 'src/auth/admin/guard';

import { CONFIG } from 'src/config-global';

import { ProductListView } from 'src/sections/admin/orders/view';

// ----------------------------------------------------------------------

const metadata = { title: `Orders list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <AuthGuard>
        <ProductListView />
      </AuthGuard>
    </>
  );
}
