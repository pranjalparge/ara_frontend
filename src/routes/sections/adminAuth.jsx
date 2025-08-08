import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthSplitLayout } from 'src/layouts/auth';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

/** **************************************
 * Split layout
 *************************************** */
const SplitLayout = {
  SignInPage: lazy(() => import('src/pages/adminAuth/sign-in')),
  SignUpPage: lazy(() => import('src/pages/adminAuth/sign-up')),
  ResetPasswordPage: lazy(() => import('src/pages/adminAuth/reset-password')),
  UpdatePasswordPage: lazy(() => import('src/pages/adminAuth/update-password')),
  TwoFactorVerify: lazy(() => import('src/pages/adminAuth/two-factor-verify')),
};

export const adminAuth = [
  {
    path: `${import.meta.env.VITE_SUBFOLDER_NAME}/admin/auth`,
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: 'sign-in',
        element: (
          <AuthSplitLayout section={{ title: 'Hi, Welcome back' }}>
            <SplitLayout.SignInPage />
          </AuthSplitLayout>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <AuthSplitLayout section={{ title: 'Hi, Welcome back' }}>
            <SplitLayout.SignUpPage />
          </AuthSplitLayout>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <AuthSplitLayout>
            <SplitLayout.ResetPasswordPage />
          </AuthSplitLayout>
        ),
      },
      {
        path: 'update-password',
        element: (
          <AuthSplitLayout>
            <SplitLayout.UpdatePasswordPage />
          </AuthSplitLayout>
        ),
      },
      {
        path: 'two-factor-verify',
        element: (
          <AuthSplitLayout>
            <SplitLayout.TwoFactorVerify />
          </AuthSplitLayout>
        ),
      },
    ],
  },
];
