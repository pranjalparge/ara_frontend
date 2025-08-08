import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { MainLayout } from 'src/layouts/main';
import { SplashScreen } from 'src/components/loading-screen';
import { mainRoutes } from './main';
import { customerAuth } from './customerAuth';
import { customerDashboardRoutes } from './customerDashboard';
import { adminAuth } from './adminAuth';
import { adminDashboardRoutes } from './adminDashboard';
import { useSelector, useDispatch } from 'react-redux';

import { useAdminmeMutation } from 'src/redux/slices/admin/auth';
import { setAuthUserState } from '../../redux/slices/features-slice/user';

// ----------------------------------------------------------------------

const HomePage = lazy(() => import('src/pages/adminAuth/sign-in'));

export function Router() {
  const dispatch = useDispatch();

  const [refreshAdminAuth] = useAdminmeMutation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);



  const InitializeAuthAdmin = useCallback(async () => {
    try {
      const data = await refreshAdminAuth({}).unwrap();
      const userData = data?.data;
console.log(userData,"helksdljfksdjf")
      dispatch(
        setAuthUserState({
          isAuthenticated: 'authenticated',
          user: {
            userId: userData?.uniqueno,
            name: userData?.username,
            role: userData?.role,
            rolename:userData?.roleName,
            roleName: userData?.role,
            dbMode:userData?.dbMode,
            isActive: userData?.isactive,
            groupId: userData?.group_id,
          },
          unreadMessageCount: userData?.unreadMessageCount,
          isInitialized: true,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const customerToken = localStorage.getItem('customerToken');
    const adminToken = localStorage.getItem('adminToken');
  
    if (adminToken) {
      InitializeAuthAdmin();
    }
  }, [isAuthenticated]);

  return useRoutes([
    {
      path: `${import.meta.env.VITE_SUBFOLDER_NAME}`,
      /**
       * Skip home page
       * element: <Navigate to={CONFIG.auth.redirectPath} replace />,
       */
      element: (
        <Suspense fallback={<SplashScreen />}>
          {/* <MainLayout> */}
            <HomePage />
          {/* </MainLayout> */}
        </Suspense>
      ),
    },

    // Auth

    ...customerAuth,
    ...adminAuth,

    // Dashboard
    ...customerDashboardRoutes,
    ...adminDashboardRoutes,

    // Main
    ...mainRoutes,
    // No match
    { path: '*', element: <Navigate to={`${import.meta.env.VITE_SUBFOLDER_NAME}/404`} replace /> },
  ]);
}
