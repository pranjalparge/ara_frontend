import React, { useEffect } from 'react';
import {useGetSubscriptionListMutation} from 'src/redux/slices/admin/menu';
import { DataGrid } from '@mui/x-data-grid';


export function ProductListView() {
  const [getPlanList, { data }] = useGetSubscriptionListMutation();

  // Define columns for DataGrid based on the API fields
  const columns = [
    {
      field: 'name',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'message',
      headerName: 'Message',
      width: 150,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'subject',
      headerName: 'Subject',
      flex: 1,
      minWidth: 180,
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
      email: row.email || 'N/A',
      message: row.message || 'N/A',
      subject: row.subject || 'N/A',
      
    })) || [];

  // Render the DataGrid with the fetched data
  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} getRowId={(row) => row._id} />
    </div>
  );
}
