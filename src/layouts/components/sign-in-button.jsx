import Button from '@mui/material/Button';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }) {
  console.log(paths.customerAuth.signIn);

  return (
    <Button
      component={RouterLink}
      href={paths.customerAuth.signIn}
      variant="outlined"
      sx={sx}
      {...other}
    >
      Sign in
    </Button>
  );
}
