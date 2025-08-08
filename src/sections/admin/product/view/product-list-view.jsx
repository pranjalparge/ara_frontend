import React, { useEffect } from 'react';
import { useGetContactMutation } from 'src/redux/slices/admin/plan';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { RouterLink } from 'src/routes/components';
import { Stack, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';


export function ProductListView() {
  const [getPlanList, { data }] = useGetContactMutation();

  // Define columns for DataGrid based on the API fields
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
      renderCell: (params) => {
        const allRowIds = params.api.getAllRowIds();
        const index = allRowIds.indexOf(params.id);
        return (
          <Stack spacing={2} direction="row" alignItems="start" mt={2}>
            <Typography component="span" variant="body2" noWrap>
              {index + 1}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      // flex: 1,
      minWidth: 120,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'phone',
      headerName: 'Phone No.',
      // flex: 1,
      minWidth: 120,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'email',
      headerName: 'Email',
      // flex: 1,
      minWidth: 150,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'subject',
      headerName: 'Subject',
      width: 120,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'message',
      headerName: 'Message',
      // flex: 1,
      minWidth: 130,
      renderCell: (params) => params.value || 'N/A',
    },
  ];

  useEffect(() => {
    getPlanList({ type: '' });
  }, [getPlanList]);

  // Extract rows from data or provide an empty array
  const rows =
    data?.map((row) => ({
      ...row,
      name: row.name || 'N/A',
      phone: row.phone || 'N/A',
      email: row.email || 'N/A',
      subject: row.subject || 'N/A',
      message: row.message || 'N/A',
    })) || [];

  // Render the DataGrid with the fetched data
  return (
    <div style={{  width: '100%' }}>
         <CustomBreadcrumbs
                heading="Contact Details"
                links={[{ name: '', href: '' }]}
             
                sx={{ mb: { xs: 3, md: 5, },marginLeft:"20px" }}
              />
      
      <DataGrid rows={rows} columns={columns} pageSize={10}      pageSizeOptions={[10]}  getRowId={(row) => row._id} />
    </div>
  );
}
