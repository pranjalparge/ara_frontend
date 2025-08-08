import { m } from 'framer-motion';
import Grid from '@mui/material/Unstable_Grid2';
import { useCallback } from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useBoolean } from 'src/hooks/use-boolean';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomTabs } from 'src/components/custom-tabs';
import { useTabs } from 'src/hooks/use-tabs';
import { NotificationItem } from './notification-item';
import {
  useAllActivitiesMutation,
  useAllMessagesMutation,
  useMarkAsReadMessagesMutation,
} from 'src/redux/slices/customer/customerDetails';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateReduxState } from 'src/redux/slices/features-slice/user';
import { Activity } from './activity';
import { _analyticOrderTimeline } from 'src/_mock';
const TABS = [
  { value: 'message', label: 'Message' },
  { value: 'activity', label: 'Activity' },
];

export function NotificationsDrawer({ data = [], sx, ...other }) {
  const drawer = useBoolean();
  const dispatch = useDispatch();
  const { unreadMessageCount } = useSelector((state) => state.auth);
  const [currentTab, setCurrentTab] = useState('message');
  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);
  const [getAllMessages, { data: messageData }] = useAllMessagesMutation();
  const [getAllActivities, { data: activitiesData }] = useAllActivitiesMutation();
  const [markAssRead, { isSuccess }] = useMarkAsReadMessagesMutation();

  useEffect(() => {
    if (drawer?.value && currentTab == 'message') {
      getAllMessages();
    }
  }, [currentTab, drawer]);
  useEffect(() => {
    if (drawer?.value && currentTab == 'activity') {
      getAllActivities();
    }
  }, [currentTab, drawer]);
  const [notifications, setNotifications] = useState(data);
  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isUnRead: false })));
  };
  const markAsAllRead = () => {
    markAssRead();
  };
  useEffect(() => {
    if (drawer?.value && currentTab == 'message') {
      markAsAllRead();
    }
  }, [currentTab, drawer]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        updateReduxState({
          key: 'unreadMessageCount',
          value: 0,
        })
      );
    }
  }, [isSuccess]);
  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Notifications
      </Typography>

      {!!totalUnRead && (
        <Tooltip title="Mark all as read">
          <IconButton color="primary" onClick={markAsAllRead}>
            <Iconify icon="eva:done-all-fill" />
          </IconButton>
        </Tooltip>
      )}

      <IconButton onClick={drawer.onFalse}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  const tabs = useTabs('profile');
  const renderTabs = (
    <CustomTabs variant="fullWidth" value={currentTab} onChange={handleChangeTab}>
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            tab?.count ? (
              <Label
                variant={((tab.value === 'all' || tab.value === currentTab) && 'filled') || 'soft'}
                color={
                  (tab.value === 'message' && 'info') ||
                  (tab.value === 'activity' && 'success') ||
                  'default'
                }
              >
                {tab?.count}
              </Label>
            ) : (
              ''
            )
          }
        />
      ))}
    </CustomTabs>
  );

  const renderListMessage = (
    <Scrollbar>
      <Box component="ul">
        {messageData?.data?.map((notification) => (
          <Box component="li" key={notification.id} sx={{ display: 'flex' }}>
            <NotificationItem notification={notification} />
          </Box>
        ))}
      </Box>
    </Scrollbar>
  );

  const renderListActivity = (
    <Grid xs={12} md={12} lg={12}>
      <Activity title="Activity Log" list={activitiesData?.data} />
    </Grid>
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={drawer.onTrue}
        sx={sx}
        {...other}
      >
        <Badge badgeContent={unreadMessageCount} color="error">
          <SvgIcon>
            <path
              fill="currentColor"
              d="M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.794 25.794 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.393 4.393 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7"
              opacity="0.5"
            />
            <path
              fill="currentColor"
              d="M12.75 6a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zM7.243 18.545a5.002 5.002 0 0 0 9.513 0c-3.145.59-6.367.59-9.513 0"
            />
          </SvgIcon>
        </Badge>
      </IconButton>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 1, maxWidth: 420 } }}
      >
        {renderHead}

        {renderTabs}

        {currentTab === 'message' && renderListMessage}

        {currentTab === 'activity' && renderListActivity}
      </Drawer>
    </>
  );
}
