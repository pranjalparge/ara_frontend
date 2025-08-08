import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/customer/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/customer/guard';

// ----------------------------------------------------------------------

// Overview
const IndexPage = lazy(() => import('src/pages/customer'));
const Pricing = lazy(() => import('src/pages/customer/pricing/index'));
const Profile = lazy(() => import('src/pages/customer/profile/index'));
const TodaysMenu = lazy(() => import('src/pages/customer/todaysMenu'));
// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const customerDashboardRoutes = [
  {
    path: `${import.meta.env.VITE_SUBFOLDER_NAME}/customer`,
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'view-plan-pricing',
        element: <Pricing />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'todaysMenu',
        element: <TodaysMenu />,
      },
    ],
  },
];
