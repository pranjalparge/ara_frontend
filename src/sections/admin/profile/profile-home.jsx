import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import { _socials } from 'src/_mock';
import { Iconify } from 'src/components/iconify';

import { useCandidateProfileMutation } from 'src/redux/slices/admin/customerDetails';
import { useState, useEffect } from 'react';
export function ProfileHome({ info, posts }) {
  const [getData, { isLoading, isSuccess, data }] = useCandidateProfileMutation();

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12}>
        {' '}
        <Card>
          {/* <CardHeader title="About" /> */}

          <Stack spacing={2} sx={{ p: 3, typography: 'body2' }}>
            {/* <Box>
              Your career is a journey, not a destination. Every step, no matter how small, shapes
              who you’re becoming.pp
            </Box> */}

            <Box display="flex">
              <Iconify width={24} icon="teenyicons:id-solid" sx={{ mr: 2 }} />
              <strong>User ID : </strong>
              <Typography pl={1}>{data?.data?.candidateInfo?.user_id}</Typography>
            </Box>

            <Box display="flex">
              <Iconify width={24} icon="uis:calender" sx={{ mr: 2 }} />
              <strong>Mobile Number : </strong>
              <Typography pl={1}> {data?.data?.candidateInfo?.mobile} </Typography>
            </Box>

            <Box display="flex">
              <Iconify width={24} icon="streamline:user-profile-focus-solid" sx={{ mr: 2 }} />
              <strong>Email Address : </strong>
              <Typography pl={1}>{data?.data?.candidateInfo?.email}</Typography>
            </Box>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
