import { Card, Stack, Typography, IconButton,Button,FormControl , Select, MenuItem,Box , InputLabel } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { paths } from 'src/routes/paths';
import { useRouter, } from 'src/routes/hooks';
import { useParams } from 'react-router-dom';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { EmptyContent } from 'src/components/empty-content';
import { DashboardContent } from 'src/layouts/admin/dashboard';
import { useGetCandidateListMutation, useDeleteAdminListMutation } from 'src/redux/slices/admin/menu';

export function ProductListView1() {
  const [tableData, setTableData] = useState([]);
  const router = useRouter();
    const { course_name, choice_code } = useParams(); // 👈 gets values from URL
  const [getAdminList, { data, isLoading, isSuccess }] = useGetCandidateListMutation();
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


const mapResponseToRows = (data) => {
  return data.map((item, index) => ({
    id: index + 1, // serial number in the grid
    instName: item.instName,            // college name
    course_name: item.course_name,      // course
    capRound: item.capRound,            // round
    full_name: item.full_name,          // candidate name
    rank: item.rank,                    // rank/SML
    application_id: item.application_id, // application no
    category: item.category,            // category
    seattype: item.seattype,             // quota
    collageStatus: item.collageStatus,  // college status
    soStatus: item.soStatus,            // SO status
    roStatus: item.roStatus,            // RO status
    directorStatus: item.directorStatus // director status
  }));
};

const handleClick = () => {
  const courseName = encodeURIComponent(selectedDepartment);
  const choiceCode = params.row.choicecode;

  // ✅ Direct push with built URL
  router.push(paths.admin.admittedCandidate(courseName, choiceCode));
};


const columns = [
  { field: 'id', headerName: 'Sr', width: 80 },
 {
    field: 'action',
    headerName: 'Action',
    width: 100,
    sortable: false,
    renderCell: (params) => {
      const handleEdit = () => {
        const courseName = encodeURIComponent(selectedDepartment); // from your state/context
        const user_id = params.row.user_id;

        router.push(paths.admin.listOfDocument(courseName,user_id ));
      };

      return (
        <Button
          variant="text"
          color="error"
          size="small"
          onClick={handleEdit}
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
        >
          EdIt
        </Button>
      );
    }
  },
  { field: 'instName', headerName: 'Institute Name', flex: 1, minWidth: 300 },
  { field: 'course_name', headerName: 'Course', minWidth: 200 },
  { field: 'capRound', headerName: 'Round', minWidth: 140 },
  { field: 'full_name', headerName: 'Candidate Name', flex: 1, minWidth: 220 },
  { field: 'rank', headerName: 'Rank/SML', width: 120 },
  { field: 'application_id', headerName: 'App No', width: 150 },
  { field: 'category', headerName: 'Category', width: 120 },
  { field: 'seattype', headerName: 'Quota', width: 100 },
  {
    field: 'collageStatus',
    headerName: 'College Status',
    width: 160,
    renderCell: (params) => (
      <Typography
        variant="body2"
        sx={{
          backgroundColor: params.value === 'Verified' ? 'lightgreen' : 'transparent',
          px: 1,
          borderRadius: 1
        }}
      >
        {params.value}
      </Typography>
    )
  },
  { field: 'soStatus', headerName: 'SO Status', width: 140 },
  { field: 'roStatus', headerName: 'RO Status', width: 140 },
  { field: 'directorStatus', headerName: 'Director Status', width: 160 }
];



  useEffect(() => {
    getAdminList({course_name:course_name, choicecode:choice_code});
  }, []);

  useEffect(() => {
    if (data && isSuccess) {
      setTableData(data?.data);
    }
  }, [data, isSuccess]);

  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Institute wise Dashboard"
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
