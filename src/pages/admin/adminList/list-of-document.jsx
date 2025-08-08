import { Helmet } from 'react-helmet-async';
import { AuthGuard } from 'src/auth/admin/guard';

import { CONFIG } from 'src/config-global';
import { ProductListView2 } from 'src/sections/admin/adminList/view/list-of-document';

// ----------------------------------------------------------------------

const metadata = { title: `Document List | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <AuthGuard>
        <ProductListView2 />
      </AuthGuard>
    </>
  );
}
