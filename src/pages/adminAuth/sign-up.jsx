import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { RegistrationForm } from 'src/auth/admin/view/sign-up';

// ----------------------------------------------------------------------

const metadata = { title: `Sign in - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <RegistrationForm />
    </>
  );
}
