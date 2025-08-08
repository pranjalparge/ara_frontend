import { Helmet } from 'react-helmet-async';
import { AuthGuard } from 'src/auth/admin/guard';

import { CONFIG } from 'src/config-global';
import { ProductListView1 } from 'src/sections/admin/adminList/view/list-admitted-candidates';

// ----------------------------------------------------------------------

const metadata = { title: `Admin List | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <AuthGuard>
        <ProductListView1 />
      </AuthGuard>
    </>
  );
}
