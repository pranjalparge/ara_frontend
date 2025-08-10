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
import { useGetDocumentListMutation, useDeleteAdminListMutation } from 'src/redux/slices/admin/menu';

export function ProductListView2() {
  const [tableData, setTableData] = useState([]);
  const router = useRouter();
    const { course_name, user_id } = useParams(); // 👈 gets values from URL
  const [getAdminList, { data, isLoading, isSuccess }] = useGetDocumentListMutation();
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
    id: index + 1, // Sr.No.
    documentName: item.name, // Document Name
    status: item.isUploaded ? "Uploaded" : "Pending", // Or actual status if given
    fileName: item.fileName, // For view/download
    soRoDirStatus: item.soRoDirStatus || "Pending", // adjust if field name different
    remark: item.remark || "" // Remark if exists
  }));
};


const columns = [
  {
    field: 'view',
    headerName: 'View',
    width: 80,
    renderCell: (params) => (
      params.row.fileName ? (
        <a
          href={`/uploads/${params.row.fileName}`} // adjust path to your API/file location
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </a>
      ) : (
        "-"
      )
    )
  },
  { field: 'id', headerName: 'Sr.No.', width: 100 },
  { field: 'name', headerName: 'Document Name', flex: 1, minWidth: 300 },
  { field: 'soRoDirStatus', headerName: 'SO/RO/Dir Status', width: 180 },
  { field: 'remark', headerName: 'Remark', flex: 1, minWidth: 200 }
];



  useEffect(() => {
    getAdminList({course_name:course_name, user_id:user_id});
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
