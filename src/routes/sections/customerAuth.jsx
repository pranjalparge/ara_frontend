import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthSplitLayout } from 'src/layouts/auth';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

/** **************************************
 * Split layout
 *************************************** */
const SplitLayout = {
  SignInPage: lazy(() => import('src/pages/customerAuth/sign-in')),
  SignUpPage: lazy(() => import('src/pages/customerAuth/sign-up')),
  VerifyPage: lazy(() => import('src/pages/customerAuth/verify')),
  ResetPasswordPage: lazy(() => import('src/pages/customerAuth/reset-password')),
  UpdatePasswordPage: lazy(() => import('src/pages/customerAuth/update-password')),
  TwoFactorVerify: lazy(() => import('src/pages/customerAuth/two-factor-verify')),
};

export const customerAuth = [
  {
    path: `${import.meta.env.VITE_SUBFOLDER_NAME}/customer/auth`,
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
          <AuthSplitLayout>
            <SplitLayout.SignUpPage />
          </AuthSplitLayout>
        ),
      },
      {
        path: 'verify',
        element: (
          <AuthSplitLayout>
            <SplitLayout.VerifyPage />
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
