import { Card, Stack, Typography, IconButton,Button,FormControl , Select, MenuItem,Box , InputLabel } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { paths } from 'src/routes/paths';
import { useRouter, } from 'src/routes/hooks';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { EmptyContent } from 'src/components/empty-content';
import { DashboardContent } from 'src/layouts/admin/dashboard';
import {
  useGetCollegeMasterMutation,
  useDeleteAdminListMutation,
} from 'src/redux/slices/admin/menu';

export function ProductListView() {
  const [tableData, setTableData] = useState([]);
  const router = useRouter();
  const [getAdminList, { data, isLoading, isSuccess }] = useGetCollegeMasterMutation();
  const [deleteAdmin] = useDeleteAdminListMutation(); // ✅ mutation at top level
const [selectedDepartment, setSelectedDepartment] = useState('march');

  const [filteredData, setFilteredData] = useState([]);

  const handleShow = async () => {
  try {
    const res = await getAdminList({ id: selectedDepartment }).unwrap();
    if (res.success) {
      const mappedRows = mapResponseToRows(res.data);
      setTableRows(mappedRows);
    }
  } catch (error) {
    console.error("Dashboard fetch failed:", error);
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


// const mapResponseToRows = (data) => {
//   return data.map((item) => ({
//     id: item.id,
//     courseName: item.course_name,
//     instituteName: item.institute_name,
//     intake: item.intake,
//     admissions: item.admissions,
//     vacancy: item.vacancy,
//     recommended: item.recommended,
//     notRecommended: item.not_recommended,
//     cancellation: item.cancellation,
//     araCancellation: item.ara_cancellation,
//   }));
// };

const mapResponseToRows = (data) => {
  return data.map((item, index) => ({
    id: item.id, // Sr no.
    name: item.name, // College name
    course_name: item.course_name,
    course_code: item.course_code,
    STATUS1: item.STATUS1,
    STATUS2: item.STATUS2,
    STATUS3: item.STATUS3,
    address: item.address,
    coordinator_name: item.coordinator_name,
    coordinator_email: item.coordinator_email,
    altcoordinator_name: item.altcoordinator_name,
    altcoordinator_email: item.altcoordinator_email,
    altcoordinator_mobile: item.altcoordinator_mobile,
    district_name: item.district_name,
    si: item.si,
    user_id: item.user_id,
  }));
};




// const columns = [
//   {
//     field: 'id',
//     headerName: 'Sr',
//     width: 50,
//   },
//   {
//     field: 'course_name',
//     headerName: 'Course',
//     flex: 1,
//     minWidth: 120,
//     renderCell: (params) => (
//       <Typography variant="body2" noWrap>{params.value}</Typography>
//     ),
//   },
//   {
//     field: 'course_code',
//     headerName: 'Code',
//     width: 80,
//   },
// {
//   field: 'name',
//   headerName: 'College',
//   width: 300,
//   renderCell: (params) => {
//  const handleClick = () => {
//   const courseName = encodeURIComponent(selectedDepartment);
//   const choiceCode = params.row.choicecode;

//   // ✅ Direct push with built URL
//   router.push(paths.admin.admittedCandidate(choiceCode,courseName ));
// };

//     return (
//       <Typography
//         variant="body2"
//         color="primary"
//         sx={{ cursor: 'pointer', textDecoration: 'underline' }}
//         onClick={handleClick}
//       >
//         {params.value}
//       </Typography>
//     );
//   },
// },

//   {
//     field: 'vacancy',
//     headerName: 'Vacancy',
//     width: 100,
//   },
//   {
//     field: 'recommended',
//     headerName: 'Recommended',
//     width: 140,
//   },
//   {
//     field: 'notRecommended',
//     headerName: 'Not-Recommended',
//     width: 160,
//   },
//   {
//     field: 'cancellation',
//     headerName: 'Dir. Cancellation',
//     width: 140,
//   },
//   {
//     field: 'araCancellation',
//     headerName: 'ARA Cancellation',
//     width: 140,
//   },
// ];

const columns = [
  { field: 'id', headerName: 'Sr', width: 50 },
  { field: 'course_name', headerName: 'Course', width: 150 },
  { field: 'course_code', headerName: 'Code', width: 100 },
  { field: 'name', headerName: 'College', width: 300 },
  { field: 'STATUS1', headerName: 'Status 1', width: 130 },
  { field: 'STATUS2', headerName: 'Status 2', width: 150 },
  { field: 'STATUS3', headerName: 'Status 3', width: 150 },
  { field: 'address', headerName: 'Address', flex: 1, minWidth: 250 },
  { field: 'coordinator_name', headerName: 'Coordinator', width: 180 },
  { field: 'coordinator_email', headerName: 'Coordinator Email', width: 220 },
  { field: 'altcoordinator_name', headerName: 'Alt. Coordinator', width: 180 },
  { field: 'altcoordinator_email', headerName: 'Alt. Email', width: 220 },
  { field: 'altcoordinator_mobile', headerName: 'Alt. Mobile', width: 150 },
  { field: 'district_name', headerName: 'District', width: 150 },
  { field: 'si', headerName: 'SI', width: 100 },
  { field: 'user_id', headerName: 'User ID', width: 120 },
];




  useEffect(() => {
    getAdminList({id:selectedDepartment});
  }, []);

  useEffect(() => {
    if (data && isSuccess) {
      setTableData(data?.data);
    }
  }, [data, isSuccess]);

  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="College Master"
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
