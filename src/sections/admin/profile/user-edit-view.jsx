import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/customer/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { UserNewEditForm } from './user-new-edit-form';

// ----------------------------------------------------------------------

export function UserEditView({ user: currentUser }) {
  return (
    <>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.customer.root },
          { name: 'User', href: paths.customer.root },
          { name: currentUser?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserNewEditForm currentUser={currentUser} />
    </>
  );
}
