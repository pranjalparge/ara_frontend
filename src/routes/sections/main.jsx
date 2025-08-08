import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { MainLayout } from 'src/layouts/main';
import { SimpleLayout } from 'src/layouts/simple';

import { SplashScreen } from 'src/components/loading-screen';
import { paths } from '../paths';

// ----------------------------------------------------------------------

// const FaqsPage = lazy(() => import('src/pages/faqs'));
const ComingSoonPage = lazy(() => import('src/pages/coming-soon'));
const MaintenancePage = lazy(() => import('src/pages/maintenance'));
const PricingPage = lazy(() => import('src/pages/customer/pricing'));
const Aboutus = lazy(() => import('src/pages/about-us'));
const ContactUs = lazy(() => import('src/pages/contact-us'));
const Menu = lazy(() => import('src/pages/menu'));
const GalleryPage = lazy(() => import('src/pages/gallary'));
const BlogPage = lazy(() => import('src/pages/blog'));
const Privacy = lazy(() => import('src/pages/privacy-policy'));
const Profile = lazy(() => import('src/pages/customer/profile/index'));

// Error
const Page500 = lazy(() => import('src/pages/error/500'));
const Page403 = lazy(() => import('src/pages/error/403'));
const Page404 = lazy(() => import('src/pages/error/404'));
// Blank
const BlankPage = lazy(() => import('src/pages/blank'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    path: `${import.meta.env.VITE_SUBFOLDER_NAME}`,
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        element: (
          <MainLayout>
            <Outlet />
          </MainLayout>
        ),
        children: [
          {
            path: 'blank',
            element: <BlankPage />,
          },
          {
            path: 'about-us',
            element: <Aboutus />,
          },
          {
            path: 'contact-us',
            element: <ContactUs />,
          },
          {
            path: 'pricing',
            element: <PricingPage />,
          },
          {
            path: 'menu',
            element: <PricingPage />,
          },
          {
            path: 'gallery',
            element: <GalleryPage />,
          },
          {
            path: 'blog',
            element: <BlogPage />,
          },
          {
            path: 'privacy-policy',
            element: <Privacy />,
          },
          {
            path: 'user',
            element: <Profile />,
          },
        ],
      },

      {
        path: 'coming-soon',
        element: (
          <SimpleLayout content={{ compact: true }}>
            <ComingSoonPage />
          </SimpleLayout>
        ),
      },
      {
        path: 'maintenance',
        element: (
          <SimpleLayout content={{ compact: true }}>
            <MaintenancePage />
          </SimpleLayout>
        ),
      },
      { path: '500', element: <Page500 /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
    ],
  },
];
