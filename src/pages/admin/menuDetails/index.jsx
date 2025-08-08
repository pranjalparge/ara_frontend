import { Helmet } from 'react-helmet-async';
import { AuthGuard } from 'src/auth/admin/guard';

import { CONFIG } from 'src/config-global';

import { ProductListMore } from 'src/sections/admin/menu/view/product-list-more';

// ----------------------------------------------------------------------

const metadata = { title: `Menu list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <AuthGuard>
        <ProductListMore />
      </AuthGuard>
    </>
  );
}