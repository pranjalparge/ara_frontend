import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  menu: icon('ic-menu'),
  foodType: icon('ic-foodType'),
  user: icon('ic-user'),
  plan: icon('ic-plan'),
  subscription: icon('ic-subscription'),
  payment: icon('ic-payment'),
  orders: icon('ic-orders'),
  register: <Iconify icon="material-symbols:how-to-reg" />,
  institute: <Iconify icon="garden:book-closed-fill-12" />,
  college: <Iconify icon="maki:college" />,
  reports: <Iconify icon="oui:nav-reports" />,
  fees: <Iconify icon="mynaui:rupee-square-solid" />,
};

// ----------------------------------------------------------------------

// export const navData = [
//   /**
//    * Overview
//    */
//   {
//     subheader: 'Overview',
//     items: [{ title: 'Dashboard', path: paths.customer.root, icon: ICONS.dashboard }],
//   },
//   // {
//   //   subheader: null,
//   //   items: [
//   //     {
//   //       title: 'ABC Id List',
//   //       path: paths.customer.abcIdList,
//   //       icon: ICONS.blog,
//   //       disabled: user?.isActive == 0 ? true : false,
//   //     },
//   //   ],
//   // },
//   // {
//   //   subheader: null,
//   //   items: [
//   //     {
//   //       title: 'Register Candidate List',
//   //       path: paths.customer.candidateList,
//   //       icon: ICONS.user,
//   //       disabled: user?.isActive == 0 ? true : false,
//   //     },
//   //   ],
//   // },
// ];

export const NavMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const dashboardNavData = [
    /**
     * Overview
     */

    {
      subheader: `Hello ${user?.name}`,
      items: [
        {
          title: 'Dashboard',
          path: paths.admin.root,
          icon: ICONS.dashboard,
          disabled: user?.isActive == 0 ? true : false,
        },
      ],
    },

    {
      subheader: '',
      items: [
        {
          title: 'Processing Fees',
          path: paths.admin.processingPayment,
          icon: ICONS.fees,

          disabled: user?.role === 0 ? true : false,
        },
        {
          title: 'Institute wise Dashboard',
          path: paths.admin.adminList,
          icon: ICONS.institute,

          disabled: user?.role === 0 ? true : false,
        },
        {
          title: 'College Master',
          path: paths.admin.collegeMaster,
          icon: ICONS.college,

          disabled: user?.role === 0 ? true : false,
        },
        {
          title: 'Reports',
          path: paths.admin.reports,
          icon: ICONS.reports,

          disabled: user?.role === 0 ? true : false,
        },
      ],
    },

    // {
    //   subheader: '',
    //   items: [
    //     {
    //       title: 'Payment',
    //       path: paths.admin.payment,
    //       icon: ICONS.payment,
    //       disabled: false,
    //     },
    //   ],
    // },

    // {
    //   subheader: '',
    //   items: [
    //     {
    //       title: 'QR Payment',
    //       path: paths.admin.qrPayment,
    //       icon: ICONS.subscription,
    //       disabled: false,
    //     },
    //   ],
    // },

    // {
    //   subheader: null,
    //   items: [
    //     {
    //       title: 'Register Candidate List',
    //       path: paths.customer.candidateList,
    //       icon: ICONS.user,
    //       disabled: user?.isActive == 0 ? true : false,
    //     },
    //   ],
    // },
  ];
  return dashboardNavData;
};
