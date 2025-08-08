import { Helmet } from 'react-helmet-async';
import { AuthGuard } from 'src/auth/admin/guard';

import { CONFIG } from 'src/config-global';

import { AppListView } from 'src/sections/admin/fpii/ourApp/app-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Blog list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <AuthGuard>
        <AppListView />
      </AuthGuard>
    </>
  );
}
