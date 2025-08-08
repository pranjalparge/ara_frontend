import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navData = [
  {
    title: 'Home',
    path: paths.adminAuth.signIn,
    icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
  },
  {
    title: 'About',
    path: paths.about,
    icon: <Iconify width={22} icon="mdi:about-circle-outline" />,
  },
  // {
  //   title: 'Menu',
  //   path: paths.pricing,
  //   icon: <Iconify width={22} icon="ic:round-menu-book" />,
  // },
  // {
  //   title: 'Gallery',
  //   path: paths.gallery,
  //   icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
  // },
  // { title: 'Blog', path: paths.blog, icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> },
  // {
  //   title: 'Profile',
  //   path: paths.user,
  //   icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
  // },
  {
    title: 'Contact',
    path: paths.contact,
    icon: <Iconify width={22} icon="hugeicons:contact-02" />,
  },
  // {
  //   title: 'Pages',
  //   path: '/pages',
  //   icon: <Iconify width={22} icon="solar:file-bold-duotone" />,
  //   children: [
  //     {
  //       subheader: 'Error',
  //       items: [
  //         { title: 'Page 403', path: paths.page403 },
  //         { title: 'Page 404', path: paths.page404 },
  //         { title: 'Page 500', path: paths.page500 },
  //       ],
  //     },
  //     { subheader: 'Dashboard', items: [{ title: 'Dashboard', path: 'CONFIG.auth.redirectPath' }] },
  //   ],
  // },
];
