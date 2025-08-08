import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TwoFactorVerify } from 'src/auth/admin/view';

// ----------------------------------------------------------------------

const metadata = { title: `Two-factor-verify - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TwoFactorVerify />
    </>
  );
}
