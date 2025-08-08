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
      subheader: 'Overview',
      items: [
        {
          title: 'Dashboard',
          path: paths.customer.root,
          icon: ICONS.dashboard,
          disabled: user?.isActive == 0 ? true : false,
        },
      ],
    },
    // {
    //   subheader: '',
    //   items: [
    //     {
    //       title: `Today's Menu`,
    //       path: paths.customer.todaysMenu,
    //       icon: ICONS.dashboard,
    //       visible: true,
    //       disabled: false,
    //     },
    //   ],
    // },
    // {
    //   subheader: '',
    //   items: [
    //     {
    //       title: 'Plan',
    //       path: paths.admin.plan,
    //       icon: ICONS.dashboard,
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
