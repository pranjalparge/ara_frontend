import { Helmet } from 'react-helmet-async';

import { SplitSignInView } from 'src/auth/admin/view/sign-in-view';
import Box from '@mui/material/Box';
// ----------------------------------------------------------------------

const metadata = {
  title: 'Tumcha Dhaba',
  description:
    'The starting point for your next project with Soumen UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style',
};

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Helmet>
 <SplitSignInView />
     
    </>
  );
}
