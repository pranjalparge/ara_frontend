import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global'; 
import { DashboardLayout } from 'src/layouts/admin/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/admin/guard';

// ----------------------------------------------------------------------

// Overview
const IndexPage = lazy(() => import('src/pages/admin'));
const Profile = lazy(() => import('src/pages/admin/profile/index'));


const Register = lazy(() => import('src/pages/admin/register/index'));

//four piilars
const Menu = lazy(() => import('src/pages/admin/menu/index'));
const MenuDetails = lazy(() => import('src/pages/admin/menuDetails/index'));
const EditBlog = lazy(() => import('src/sections/admin/menu/view/edit-blog'));
const OurApp = lazy(() => import('src/pages/admin/fpii/ourApp/index'));
const EditApp = lazy(() => import('src/sections/admin/fpii/ourApp/edit-app'));
const OurBrand = lazy(() => import('src/pages/admin/fpii/ourBrand/index'));
const EditBrand = lazy(() => import('src/sections/admin/fpii/ourBrand/edit-brand'));
const Item = lazy(() => import('src/pages/admin/item/list'));
const JobDetails = lazy(() => import('src/pages/admin/fpii/jobDetails/index'));
const EditJob = lazy(() => import('src/sections/admin/fpii/jobDetails/edit-job-post'));




const FoodTypes = lazy(() => import('src/pages/admin/foodTypes/index'));
const Plan = lazy(() => import('src/pages/admin/plan/index'));

const Subscription = lazy(() => import('src/pages/admin/subscription/index'));
const Customer = lazy(() => import('src/pages/admin/customerList/index'));
const Admin = lazy(() => import('src/pages/admin/adminList/index'));

const AdmittedList = lazy(() => import('src/pages/admin/adminList/admittedList'));
const Payment = lazy(() => import('src/pages/admin/payment/index'));
const Orders = lazy(() => import('src/pages/admin/orders/index'));
const QRPayment = lazy(() => import('src/pages/admin/qrPayment/index'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const adminDashboardRoutes = [
  {
    path: `${import.meta.env.VITE_SUBFOLDER_NAME}/admin`,
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'admin-register',
        element: <Register />,
      },
      {
        path: 'list-contact-us',
        element: <Item />,
      },
 
    
   
      {
        path: 'list-blog',
        element: <Menu />,
      },
      {
        path: 'food-types',
        element: <FoodTypes />,
      },
      {
        path: 'list-applicants',
        element: <Plan />,
      },

   
      {
        path: 'list-contactus',
        element: <Subscription />,
      },
      {
        path: 'blogdetails',
        element: <MenuDetails />,
      },
      {
        path: 'editblog',
        element: <EditBlog />,
      },
      {
        path: 'list-our-app',
        element: <OurApp />,
      },
      {
        path: 'list-our-brand',
        element: <OurBrand />,
      },
      {
        path: 'edit-app',
        element: <EditApp />,
      },
      {
        path: 'edit-brand',
        element: <EditBrand />,
      },
 
   
   
  
   
 
 
 
  
      {
        path: 'customerList',
        element: <Customer />,
      },
      {
        path: 'adminList',
        element: <Admin />,
      },
       {
  path: 'admittedCandidate/:course_name/:choice_code',
  element: <AdmittedList />,
}
,
      {
        path: 'payment',
        element: <Payment />,
      },
      {
        path: 'databaseMode',
        element: <Orders />,
      },
      {
        path: 'qrPaymentList',
        element: <QRPayment />,
      },

  
    ],
  },
];
