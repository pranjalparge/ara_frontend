import { Helmet } from 'react-helmet-async';
import { AuthGuard } from 'src/auth/admin/guard';

import { CONFIG } from 'src/config-global';

import { QrPayment } from 'src/sections/admin/qrPayment';

// ----------------------------------------------------------------------

const metadata = { title: `QR Payment list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <AuthGuard>
        <QrPayment />
      </AuthGuard>
    </>
  );
}
