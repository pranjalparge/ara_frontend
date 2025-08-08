import { Helmet } from 'react-helmet-async';
import { AuthGuard } from 'src/auth/admin/guard';

import { CONFIG } from 'src/config-global';
import { ProductListView } from 'src/sections/admin/foodTypes/view';

// ----------------------------------------------------------------------

const metadata = { title: `Food Types | Dashboard - ${CONFIG.appName}` };

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
