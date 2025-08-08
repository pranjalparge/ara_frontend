import React, { useEffect } from 'react';
import { useGetAllPlanListMutation } from 'src/redux/slices/admin/plan';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';


export function ProductListView() {
  const [getPlanList, { data }] = useGetAllPlanListMutation();

  // Define columns for DataGrid based on the API fields
  const columns = [
    {
      field: 'Full_Name',
      headerName: 'Full Name',
      // flex: 1,
      minWidth: 120,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'Email_Address',
      headerName: 'Email',
      // flex: 1,
      minWidth: 150,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'Phone',
      headerName: 'Phone',
      width: 120,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'Job_title',
      headerName: 'Job Title',
      // flex: 1,
      minWidth: 130,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'Current_Company',
      headerName: 'Current Company',
      // flex: 1,
      minWidth: 120,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'Experience',
      headerName: 'Experience (Years)',
      width: 100,
      align: 'center',
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'Current_CTC',
      headerName: 'Current CTC',
      width: 120,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'Expected_CTC',
      headerName: 'Expected CTC',
      width: 120,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'Notice_Period',
      headerName: 'Notice Period',
      width: 120,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'resume',
      headerName: 'Resume',
      width: 140,
      renderCell: (params) =>
        params.value ? (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => window.open(params.value, '_blank')}
          >
            View Resume
          </Button>
        ) : (
          'N/A'
        ),
    },
  ];

  useEffect(() => {
    getPlanList({ type: '' });
  }, [getPlanList]);

  // Extract rows from data or provide an empty array
  const rows =
    data?.map((row) => ({
      ...row,
      Full_Name: row.Full_Name || 'N/A',
      Email_Address: row.Email_Address || 'N/A',
      Phone: row.Phone || 'N/A',
      Job_title: row.Job_title || 'N/A',
      Current_Company: row.Current_Company || 'N/A',
      Experience: row.Experience || 'N/A',
      Current_CTC: row.Current_CTC || 'N/A',
      Expected_CTC: row.Expected_CTC || 'N/A',
      Notice_Period: row.Notice_Period || 'N/A',
      resume: row.resume || null, // Preserve null or empty for resumes
    })) || [];

  // Render the DataGrid with the fetched data
  return (
    <div style={{  width: '100%' }}>
         <CustomBreadcrumbs
                heading="List Of Job Applicants in Four Pillars"
                links={[{ name: '', href: '' }]}
             
                sx={{ mb: { xs: 3, md: 5, },marginLeft:"20px" }}
              />
      
      <DataGrid rows={rows} columns={columns} pageSize={10}              pageSizeOptions={[5, 10]}
  getRowId={(row) => row._id} />
    </div>
  );
}
