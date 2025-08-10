import { paramCase } from 'src/utils/change-case';
import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  CUSTOMERAUTH: `${import.meta.env.VITE_SUBFOLDER_NAME}/customer/auth`,
  CUSTOMERDASHBOARD: `${import.meta.env.VITE_SUBFOLDER_NAME}/customer`,
  MAIN: `${import.meta.env.VITE_SUBFOLDER_NAME}`,

  ADMINAUTH: `${import.meta.env.VITE_SUBFOLDER_NAME}/admin/auth`,
  ADMINDASHBOARD: `${import.meta.env.VITE_SUBFOLDER_NAME}/admin`,
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: `${ROOTS.MAIN}/pricing`,
  home: `${ROOTS.MAIN}/home`,
  about: `${ROOTS.MAIN}/about-us`,
  contact: `${ROOTS.MAIN}/contact-us`,
  menu: `${ROOTS.MAIN}/menu`,
  gallery: `${ROOTS.MAIN}/gallery`,
  blog: `${ROOTS.MAIN}/blog`,
  privacy: `${ROOTS.MAIN}/privacy-policy`,
  faqs: 'faqs',
  page403: 'error/403',
  page404: 'error/404',
  page500: 'error/500',
  components: 'components',
  docs: '#',
  changelog: '#',

  // CUSTOMERAUTH
  customerAuth: {
    signIn: `${ROOTS.CUSTOMERAUTH}/sign-in`,
    signUp: `${ROOTS.CUSTOMERAUTH}/sign-up`,
    resetPassword: `${ROOTS.CUSTOMERAUTH}/reset-password`,
    updatePassword: `${ROOTS.CUSTOMERAUTH}/update-password`,
    verify: `${ROOTS.CUSTOMERAUTH}/verify`,
    TwoFactorVerify: `${ROOTS.CUSTOMERAUTH}/two-factor-verify`,
  },

  // CUSTOMERDASHBOARD
  customer: {
    root: `${ROOTS.CUSTOMERDASHBOARD}`,
    profile: `${ROOTS.CUSTOMERDASHBOARD}/profile`,
    pricing: `${ROOTS.CUSTOMERDASHBOARD}/view-plan-pricing`,
    todaysMenu: `${ROOTS.CUSTOMERDASHBOARD}/todaysMenu`,
  },

  adminAuth: {
    root: `${ROOTS.ADMINAUTH}`,
    signIn: `${ROOTS.ADMINAUTH}/sign-in`,
    signUp: `${ROOTS.ADMINAUTH}/sign-up`,
    resetPassword: `${ROOTS.ADMINAUTH}/reset-password`,
    updatePassword: `${ROOTS.ADMINAUTH}/update-password`,
    verify: `${ROOTS.ADMINAUTH}/verify`,
    TwoFactorVerify: `${ROOTS.ADMINAUTH}/two-factor-verify`,
  },

  admin: {
    root: `${ROOTS.ADMINDASHBOARD}`,
    profile: `${ROOTS.ADMINDASHBOARD}/profile`,
    adminRegister: `${ROOTS.ADMINDASHBOARD}/admin-register`,

    //four pillars
    list: `${ROOTS.ADMINDASHBOARD}/list`,
    menu: `${ROOTS.ADMINDASHBOARD}/list-blog`,
    MenuDetails: `${ROOTS.ADMINDASHBOARD}/blogdetails`,
    EditBlog: `${ROOTS.ADMINDASHBOARD}/editblog`,
    OurApp: `${ROOTS.ADMINDASHBOARD}/list-our-app`,
    EditApp: `${ROOTS.ADMINDASHBOARD}/edit-app`,
    OurBrand: `${ROOTS.ADMINDASHBOARD}/list-our-brand`,
    EditBrand: `${ROOTS.ADMINDASHBOARD}/edit-brand`,
    menuItem: `${ROOTS.ADMINDASHBOARD}/list-contact-us`,
    JobDetails: `${ROOTS.ADMINDASHBOARD}/list-jobs`,
    EditJob: `${ROOTS.ADMINDASHBOARD}/edit-jobs`,

    foodTypes: `${ROOTS.ADMINDASHBOARD}/food-types`,
    plan: `${ROOTS.ADMINDASHBOARD}/list-applicants`,
    planLlc: `${ROOTS.ADMINDASHBOARD}/applicants-llc`,
    planSaas: `${ROOTS.ADMINDASHBOARD}/applicants-saas`,
    subscription: `${ROOTS.ADMINDASHBOARD}/subscription`,
    customerList: `${ROOTS.ADMINDASHBOARD}/customerList`,

    payment: `${ROOTS.ADMINDASHBOARD}/payment`,
    databaseMode: `${ROOTS.ADMINDASHBOARD}/databaseMode`,
    qrPayment: `${ROOTS.ADMINDASHBOARD}/qrPaymentList`,
    seoStatus: `${ROOTS.ADMINDASHBOARD}/seo-status`,

    //ara

    processingPayment: `${ROOTS.ADMINDASHBOARD}/processingPayment`,
        adminList: `${ROOTS.ADMINDASHBOARD}/adminList`,
    adminList: `${ROOTS.ADMINDASHBOARD}/adminList`,
    collegeMaster: `${ROOTS.ADMINDASHBOARD}/collegeMaster`,

    admittedCandidate: (choice_code, course_name) =>
      `${ROOTS.ADMINDASHBOARD}/admittedCandidate/${course_name}/${choice_code}`,

       admittedCandidate: (choice_code, course_name) =>
          `${ROOTS.ADMINDASHBOARD}/admittedCandidate/${course_name}/${choice_code}`,
       
       listOfDocument: (course_name,user_id) =>
          `${ROOTS.ADMINDASHBOARD}/list-of-document/${course_name}/${user_id}`,
    // listOfDocument: (user_id, course_name) =>
    //   `${ROOTS.ADMINDASHBOARD}/list-of-document/${course_name}/${user_id}`,
  },
};
