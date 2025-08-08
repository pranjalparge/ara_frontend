import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { AnimateLogo2 } from 'src/components/animate';
import { Form, Field } from 'src/components/hook-form';

import { FormHead } from '../../components/form-head';
import { FormSocials } from '../../components/form-socials';
import { FormDivider } from '../../components/form-divider';
import { SignUpTerms } from '../../components/sign-up-terms';
import { CustomizedSteppers } from './registration-stepper';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function SplitSignUpView() {
  const renderLogo = <AnimateLogo2 sx={{ mb: 3, mx: 'auto' }} />;

  return (
    <>
      {renderLogo}

      <FormHead
        title="Registration Form"
        description={
          <>
            {`Already have an account? `}
            <Link component={RouterLink} href={paths.customerAuth.signIn} variant="subtitle2">
              Sign In
            </Link>
          </>
        }
      />

      <CustomizedSteppers />

      <SignUpTerms />

      {/* <FormDivider />

      <FormSocials
        signInWithGoogle={() => {}}
        singInWithGithub={() => {}}
        signInWithTwitter={() => {}}
      /> */}
    </>
  );
}
