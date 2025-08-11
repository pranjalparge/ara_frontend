import {
  Card,
  Stack,
  Typography,
  IconButton,
  Button,
  FormControl,
  Select,
  MenuItem,
  Box,
  InputLabel,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { EmptyContent } from 'src/components/empty-content';
import { DashboardContent } from 'src/layouts/admin/dashboard';
import { useGetReportsMutation, useDeleteAdminListMutation } from 'src/redux/slices/admin/menu';

export function ProductListView() {
  const [tableData, setTableData] = useState([]);
  const router = useRouter();
  const [getAdminList, { data, isLoading, isSuccess }] = useGetReportsMutation();
  const [deleteAdmin] = useDeleteAdminListMutation(); // ✅ mutation at top level
  const [selectedDepartment, setSelectedDepartment] = useState('march');

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getAdminList({ id: selectedDepartment });
  }, []);

  useEffect(() => {
    if (data && isSuccess) {
      setTableData(mapResponseToRows(data?.data));
    }
  }, [data, isSuccess]);

  const handleShow = async () => {
    try {
      const res = await getAdminList({ id: selectedDepartment }).unwrap();
      if (res.success) {
        // const mappedRows = mapResponseToRows(res.data);
        // setTableRows(mappedRows);
        setTableData(mapResponseToRows(res.data));
      }
    } catch (error) {
      console.error('Dashboard fetch failed:', error);
    }
  };
  // ✅ Delete function at top level
  const handleDelete = async (id) => {
    try {
      await deleteAdmin({ id }).unwrap();
      alert('User deleted successfully!');
      const refreshed = await getAdminList().unwrap(); // Refetch fresh data
      setTableData(refreshed.data);
    } catch (error) {
      console.error('Delete Failed:', error);
      alert('Failed to delete the user');
    }
  };

  const [selectedDept, setSelectedDept] = useState('MARCH');
  const [tableRows, setTableRows] = useState([]);

  const mapResponseToRows = (data) => {
    console.log('Data received:', data);
    if (!data) return [];
    return [
      {
        id: 1,
        totalInstitutes: data.totalInstitutes,
        totalIntake: data.totalIntake,
        totalAdmitted: data.admitted,
        success_count: data.success_count,
        pending_count: data.pending_count,
        praposalpendingInstitutes: data.praposalpendingInstitutes,
        praposalapprovedInstitutes: data.praposalapprovedInstitutes,
        recommended: data.recommended,
        notrecommended: data.notrecommended,
      },
    ];
  };

  const columns = [
    { field: 'id', headerName: 'Sr', width: 50 },
    { field: 'totalInstitutes', headerName: 'No of Colleges', width: 150 },
    { field: 'totalIntake', headerName: 'Intake', width: 150 },
    { field: 'admitted', headerName: 'No of Admission', width: 150 },
    { field: '', headerName: 'No of Vacant Seats', width: 150 },
    { field: '', headerName: 'No of Colleges having Zero Admissions', width: 150 },
    { field: 'success_count', headerName: 'No of Colleges Paid', width: 150 },
    { field: 'pending_count', headerName: 'No of Colleges Not Paid', width: 150 },
    { field: 'praposalapprovedInstitutes', headerName: 'No of Colleges Submitted', width: 150 },
    { field: 'praposalpendingInstitutes', headerName: 'No of Colleges Not Submitted', width: 150 },
    { field: 'recommended', headerName: 'No of Admission Recommended', width: 150 },
    { field: 'notrecommended', headerName: ' No of Admission Not Recommended', width: 170 },
  ];

  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Download Reports"
        links={[{ name: '', href: '' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            label="Department"
          >
            <MenuItem value="march">March</MenuItem>
            <MenuItem value="hmct">Hmct</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleShow}>
          Show
        </Button>
      </Box>

      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'column' },
        }}
      >
        <DataGrid
          getRowId={(row) => row.id} // optional now since we added `id`
          rows={tableData ?? []}
          columns={columns}
          loading={isLoading}
          getRowHeight={() => 'auto'}
          autoHeight={true}
          pageSizeOptions={[10, 50, 100]}
          initialState={{ pagination: { paginationModel: { pageSize: 100 } } }}
          slots={{
            toolbar: GridToolbar,
            noRowsOverlay: () => <EmptyContent />,
            noResultsOverlay: () => <EmptyContent title="No results found" />,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </Card>
    </DashboardContent>
  );
}
