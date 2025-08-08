import Box from '@mui/material/Box';
import { Button, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from 'src/layouts/customer/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';
import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';

import { svgColorClasses } from 'src/components/svg-color';

import { useMockedUser } from 'src/auth/hooks';

import { AppWidget } from '../app-widget';
import { AppWelcome } from '../app-welcome';
import { AppFeatured } from '../app-featured';
import { AppNewInvoice } from '../app-new-invoice';
import { AppTopAuthors } from '../app-top-authors';
import { AppTopRelated } from '../app-top-related';
import { AppAreaInstalled } from '../app-area-installed';
import { AppWidgetSummary } from '../app-widget-summary';
import { AppCurrentDownload } from '../app-current-download';
import { AppTopInstalledCountries } from '../app-top-installed-countries';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { OrderTracking } from '../order-tracking';
import { useGetDashboardDataMutation } from 'src/redux/slices/customer/customerDetails';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export function OverviewAppView() {
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const router = useRouter();

  const [getData, { data }] = useGetDashboardDataMutation();

  useEffect(() => {
    getData();
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <AppWelcome
            title={`Welcome back 👋 \n ${user?.name}`}
            description={
              !user?.subscription_plan
                ? 'Would you like to access our services? Click Go Now to explore and select a plan that suits you best.'
                : user?.isTodaysMenuAvailable
                  ? 'Click Go Now to book todays food.'
                  : null
            }
            img={<SeoIllustration hideBackground />}
            action={
              !user?.subscription_plan ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push(paths.customer.pricing)}
                >
                  Go now
                </Button>
              ) : user?.isTodaysMenuAvailable ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push(paths.customer.todaysMenu)}
                >
                  Go now
                </Button>
              ) : null
            }
          />
        </Grid>
        {data?.data?.checkOrderedToday && (
          <Grid xs={12} md={6} lg={6}>
            <Box display={'flex'} justifyContent={'center'}>
              <OrderTracking title="Order Tracking" list={data?.data?.getDeliveryStatus} />
            </Box>
          </Grid>
        )}

        {user?.subscription_plan && (
          <Grid xs={12} md={6} lg={6}>
            <AppCurrentDownload
              title="Subscription Period"
              subheader="In days"
              chart={{
                series: [
                  { label: 'Ordered', value: data?.data?.subscriptionStatus?.ordered_count ?? 0 },
                  { label: 'Left', value: data?.data?.subscriptionStatus?.days_left ?? 0 },
                ],
              }}
            />
          </Grid>
        )}
      </Grid>
    </DashboardContent>
  );
}
