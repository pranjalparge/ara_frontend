import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import { useTabs } from 'src/hooks/use-tabs';
import { AuthGuard } from 'src/auth/admin/guard';
import { DashboardContent } from 'src/layouts/admin/dashboard';
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { ProfileCover } from '../profile-cover';
import { useSelector, useDispatch } from 'react-redux';
import { AccountChangePassword } from '../account-change-password';
// ----------------------------------------------------------------------

const TABS = [
  // { value: 'profile', label: 'Profile', icon: <Iconify icon="solar:user-id-bold" width={24} /> },
  { value: 'security', label: 'Security', icon: <Iconify icon="ic:round-vpn-key" width={24} /> },
];

export function Profile() {
  const { user } = useSelector((state) => state.auth);
  const tabs = useTabs('security');
  return (
    <AuthGuard>
      <Card sx={{ mb: 3, height: 290 }}>
        <ProfileCover
          role={'Admin'}
          name={user?.name}
          avatarUrl={user?.profileImage}
          // coverUrl={_userAbout.coverUrl}
        />

        <Box
          display="flex"
          justifyContent={{ xs: 'center', md: 'flex-end' }}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            px: { md: 3 },
            position: 'absolute',
            bgcolor: 'background.paper',
          }}
        >
          <Tabs value={tabs.value} onChange={tabs.onChange}>
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
        </Box>
      </Card>

      {/* {tabs.value === 'profile' && <ProfileHome info={_userAbout} posts={_userFeeds} />} */}

      {tabs.value === 'security' && <AccountChangePassword />}
    </AuthGuard>
  );
}
