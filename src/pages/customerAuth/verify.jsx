import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SplitVerifyView } from 'src/auth/customer/view';

// ----------------------------------------------------------------------

const metadata = { title: `Verify | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SplitVerifyView />
    </>
  );
}
