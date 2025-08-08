import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { Stack, List, ListItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Typography } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import { _socials } from 'src/_mock';
import { Iconify } from 'src/components/iconify';
import moment from 'moment';
import {
  useCandidateProfileMutation,
  useGetConsumedCaloriesMutation,
} from 'src/redux/slices/customer/customerDetails';
import { useState, useEffect } from 'react';
import { AnalyticsCurrentVisits } from './analytics-current-visits';
import { EcommerceSaleByGender } from './ecommerce-sale-by-gender';
import { BankingExpensesCategories } from './banking-expenses-categories';
import { AnalyticsConversionRates } from './analytics-conversion-rates';
export function ProfileHome({ info, posts }) {
  const [getData, { data }] = useCandidateProfileMutation();
  const [getCaldata, { data: calData }] = useGetConsumedCaloriesMutation();

  useEffect(() => {
    getData();
    getCaldata();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12}>
        {' '}
        <Card>
          {/* <CardHeader title="About" /> */}
          <Box sx={{ overflow: 'scroll', overflowY: 'hidden' }}>
            <Stack spacing={2} sx={{ p: 3, typography: 'body2' }}>
              {/* <Box>
                Your career is a journey, not a destination. Every step, no matter how small, shapes
                who you’re becoming. pp
              </Box> */}

              {/* Responsive Grid for User Details */}
              <Grid container spacing={2}>
                {/* User ID */}
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <Iconify width={24} icon="teenyicons:id-solid" sx={{ mr: 2 }} />
                    <strong>User ID:</strong>
                    <Typography pl={1}>{data?.data?.candidateInfo?.id}</Typography>
                  </Box>
                </Grid>

                {/* Mobile Number */}
                <Grid item xs={12} sm={6} md={4}>
                  <Box display="flex" alignItems="center">
                    <Iconify width={24} icon="uis:calender" sx={{ mr: 2 }} />
                    <strong>Mobile Number:</strong>
                    <Typography pl={0.4}>{data?.data?.mobileNo}</Typography>
                  </Box>
                </Grid>

                {/* Email Address */}
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <Iconify width={24} icon="streamline:user-profile-focus-solid" sx={{ mr: 2 }} />
                    <strong>Email:</strong>
                    <Typography pl={0.4}>{data?.data?.emailId}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Card>
        &nbsp;
        {data?.data?.planDetails && (
          <Card>
            <CardHeader title="Plan Details" />

            <Stack spacing={2} sx={{ p: 3, typography: 'body2' }}>
              {/* <Box>
                Your career is a journey, not a destination. Every step, no matter how small, shapes
                who you’re becoming. pp
              </Box> */}

              <Box display="flex">
                <Iconify width={24} icon="teenyicons:id-solid" sx={{ mr: 2 }} />
                <strong>Plan Name : </strong>
                <Typography pl={1}>{data?.data?.planDetails?.plan_id?.name}</Typography>
              </Box>

              <Box display="flex">
                <Iconify width={24} icon="uis:calender" sx={{ mr: 2 }} />
                <strong>Created Date : </strong>
                <Typography pl={1}>
                  {' '}
                  {moment(data?.data?.planDetails?.creates).format('DD-MM-YYYY')}{' '}
                </Typography>
              </Box>

              <Box display="flex">
                <Iconify width={24} icon="mingcute:time-fill" sx={{ mr: 2 }} />
                <strong>Subcription Period : </strong>
                <Typography pl={1}>{data?.data?.planDetails?.day_count}</Typography>
              </Box>

              <Box display="flex">
                {/* <Iconify width={24} icon="material-symbols:list" sx={{ mr: 2 }} /> */}
                <strong>Benefits : </strong>
              </Box>
              <Box mt={-3}>
                <List>
                  {data?.data?.planDetails?.description?.split(',').map((e, index) => (
                    <ListItem key={index} disableGutters>
                      <Typography sx={{ typography: 'body2' }}>
                        <strong>{index + 1}.</strong> {e.trim()}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Stack>
          </Card>
        )}
        &nbsp;
        {calData?.isMenuAvailable && (
          <Card>
            <CardHeader title="Calories" />

            <Stack spacing={2} sx={{ p: 3, typography: 'body2' }}>
              <Grid xs={12} md={12} lg={12}>
                <AnalyticsConversionRates
                  title="Calories"
                  //subheader="(+43%) than last year"
                  chart={{
                    categories: [
                      'Total Vitamin',
                      'Total Sugar',
                      'Total Protein',
                      'Total Iron',
                      'Total Fat',
                      'Total Cholesterol',
                      'Total Carbohydrates',
                      'Total Calories',
                      'Total Calcium',
                    ],
                    series: [
                      {
                        name: '',
                        data: [
                          Number(calData?.data?.total_vitamin),
                          Number(calData?.data?.total_sugar),
                          Number(calData?.data?.total_protein),
                          Number(calData?.data?.total_iron),
                          Number(calData?.data?.total_fat),
                          Number(calData?.data?.total_cholesterol),
                          Number(calData?.data?.total_carbohydrates),
                          Number(calData?.data?.total_calories),
                          Number(calData?.data?.total_calcium),
                        ],
                      },
                    ],
                  }}
                />
              </Grid>
            </Stack>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}
