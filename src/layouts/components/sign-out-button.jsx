import { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Button from '@mui/material/Button';

import { useRouter } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { toast } from 'src/components/snackbar';

import { logout } from '../../redux/slices/features-slice/user';
import { useSelector, useDispatch } from 'react-redux';
// import { useAuthContext } from 'src/auth/hooks';
// import { signOut as jwtSignOut } from 'src/auth/context/jwt/action';

// ----------------------------------------------------------------------

// const signOut = jwtSignOut;

// ----------------------------------------------------------------------


export function SignOutButton({ onClose, ...other }) {
  const router = useRouter();
  const dispatch = useDispatch();

  // const { checkUserSession } = useAuthContext();

  const handleLogout = useCallback(async () => {
    try {
      // await signOut();
      // await checkUserSession?.();

      dispatch(logout());
      onClose?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Unable to logout!');
    }
    // }, [checkUserSession, onClose, router]);
  }, [onClose, router]);

  return (
    <Button fullWidth variant="soft" size="large" color="error" onClick={handleLogout} {...other}>
      Logout
    </Button>
  );
}
