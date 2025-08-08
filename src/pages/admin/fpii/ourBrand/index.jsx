import { Helmet } from 'react-helmet-async';
import { AuthGuard } from 'src/auth/admin/guard';

import { CONFIG } from 'src/config-global';

import  BrandListView  from 'src/sections/admin/fpii/ourBrand/brand-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Blog list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <AuthGuard>
        <BrandListView />
      </AuthGuard>
    </>
  );
}
