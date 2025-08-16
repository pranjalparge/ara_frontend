import { Card, Stack, Typography, IconButton,Button,FormControl , Select, MenuItem,Box , InputLabel } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { paths } from 'src/routes/paths';
import { useRouter, } from 'src/routes/hooks';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { EmptyContent } from 'src/components/empty-content';
import { DashboardContent } from 'src/layouts/admin/dashboard';
import {   useGetProcessingPaymentMutation, useDeleteAdminListMutation } from 'src/redux/slices/admin/menu';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
export function ProductListView() {
  const [tableData, setTableData] = useState([]);
  const router = useRouter();
  const [getAdminList, { data, isLoading, isSuccess }] = useGetProcessingPaymentMutation();
  const [deleteAdmin] = useDeleteAdminListMutation(); // ✅ mutation at top level
const [selectedDepartment, setSelectedDepartment] = useState('march');
const [selectedStatus, setSelectedStatus] = useState('SUCCESS');
  const [filteredData, setFilteredData] = useState([]);

const handleShow = async () => {
  try {
    const res = await getAdminList({
      course_name: selectedDepartment,
      status: selectedStatus // ✅ send status too
    }).unwrap();

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
  if (!data) return []; // no data at all

  // Ensure we always work with an array
  const arr = Array.isArray(data) ? data : [data];

  return arr
    .filter((item) => item) // remove undefined/null
    .map((item, index) => ({
      id: item?.id ?? index + 1, // safe access
      institute_name: item?.institute_name ?? item?.["Institute Name"] ?? "",
      intake: item?.intake ?? item?.["CAP Intake"] ?? 0,
      admissions: item?.admissions ?? item?.["Total Admitted"] ?? 0,
      vacancy:
        (item?.intake ?? item?.["CAP Intake"] ?? 0) -
        (item?.admissions ?? item?.["Total Admitted"] ?? 0),
      recommended: item?.recommended ?? 0,
      notRecommended: item?.not_recommended ?? 0,
      cancellation: item?.cancellation ?? 0,
      araCancellation: item?.ara_cancellation ?? 0,
      choicecode: item?.choicecode ?? "",
    }));
};






const columns = [
  {
    field: 'id',
    headerName: 'Sr',
    width: 80,
  },
  {
    field: 'institute_name',
    headerName: 'Institute Name',
    flex: 1,
    minWidth: 300,
    renderCell: (params) => (
      <Typography variant="body2" noWrap>{params.value}</Typography>
    ),
  },
  {
    field: 'intake',
    headerName: 'Intake',
    width: 100,
  },
{
  field: 'admissions',
  headerName: 'Admissions',
  width: 120,
  renderCell: (params) => {
 const handleClick = () => {
  const courseName = encodeURIComponent(selectedDepartment);
  const choiceCode = params.row.choicecode;

  // ✅ Direct push with built URL
  router.push(paths.admin.admittedCandidate(choiceCode,courseName ));
};

    return (
      <Typography
        variant="body2"
        color="primary"
        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        onClick={handleClick}
      >
        {params.value}
      </Typography>
    );
  },
},

  {
    field: 'vacancy',
    headerName: 'Vacancy',
    width: 100,
  },
  {
    field: 'recommended',
    headerName: 'Recommended',
    width: 140,
  },
  {
    field: 'notRecommended',
    headerName: 'Not-Recommended',
    width: 160,
  },
  {
    field: 'cancellation',
    headerName: 'Dir. Cancellation',
    width: 140,
  },
  {
    field: 'araCancellation',
    headerName: 'ARA Cancellation',
    width: 140,
  },
];



  useEffect(() => {
    getAdminList({course_name:selectedDepartment, status: selectedStatus}).unwrap();
  }, []);

  useEffect(() => {
    if (data && isSuccess) {
      setTableData(data?.data);
    }
  }, [data, isSuccess]);

  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Processing Fees Status"
        links={[{ name: '', href: '' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
     <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
  {/* Department Select */}
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

  {/* Status Select */}
  <FormControl sx={{ minWidth: 200 }}>
    <InputLabel>Status</InputLabel>
    <Select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
      label="Status"
    >
      <MenuItem value="">Institute</MenuItem>
      <MenuItem value="SUCCESS">Process Received</MenuItem>
      <MenuItem value="P">Payment Pending</MenuItem>
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
        {/* <DataGrid
        rows={mapResponseToRows(data)}
  columns={columns}
  getRowId={(row, index) => row.id || row['Institute Id'] || index}
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
        /> */}
      </Card>

             <TableContainer
            component={Paper}
            style={{
              padding: 0,
              marginTop: 1,
              marginBottom: 1,
              height: "auto"
            }}
          >
            <Table>
              <TableHead>
         <TableRow sx={{ backgroundColor: "#2a5baaff" }}>
  <TableCell align="center">Sr</TableCell>
  <TableCell align="center">Institute Name</TableCell>
  <TableCell align="center">Intake</TableCell>
  <TableCell align="center">EWS</TableCell>
  <TableCell align="center">A.I.Q.</TableCell>
  <TableCell align="center">S.Q.</TableCell>
  <TableCell align="center">CAP Fees</TableCell>
  <TableCell align="center">Mgmt.</TableCell>
  <TableCell align="center">I.Q.</TableCell>
  <TableCell align="center">Non-CAP Fees</TableCell>
  <TableCell align="center">NRI</TableCell>
  <TableCell align="center">NRI Fees</TableCell>
  <TableCell align="center">Total Fees</TableCell>
  <TableCell align="center">Payment</TableCell>
  <TableCell align="center">Receipt</TableCell>
  <TableCell align="center">Admissions</TableCell>
</TableRow>

              </TableHead>
      
         <TableBody>
  {tableData && tableData.length > 0 ? (
    tableData.map((row, index) => (
      <TableRow key={row.id}>
        {/* Sr */}
        <TableCell align="center">{index + 1}</TableCell>

        {/* Institute Name */}
        <TableCell align="center">{row["Institute Name"]}</TableCell>

        {/* Intake */}
        <TableCell align="center">{row["Total No. of CAP Seats"]}</TableCell>

        {/* EWS */}
        <TableCell align="center">{row["EWS Seats"]}</TableCell>

        {/* A.I.Q. */}
        <TableCell align="center">{row["CAP Intake"]}</TableCell>

        {/* S.Q. */}
        <TableCell align="center">{row["TFWS Seats"]}</TableCell>

        {/* CAP Fees */}
        <TableCell align="center">{row["CAP Amount (Minimum Rs. 20,000/-)"]}</TableCell>

        {/* Mgmt. */}
        <TableCell align="center">{row["Any Other Scheme seats"]}</TableCell>

        {/* I.Q. */}
        <TableCell align="center">{row["IL Intake"]}</TableCell>

        {/* Non-CAP Fees */}
        <TableCell align="center">{row["IL Amount"]}</TableCell>

        {/* NRI */}
        <TableCell align="center">{row["NRI Seats"]}</TableCell>

        {/* NRI Fees */}
        <TableCell align="center">{row["NRI Amount"]}</TableCell>

        {/* Total Fees */}
        <TableCell align="center">{row["Amount Payable as Processing Fees"]}</TableCell>

        {/* Payment */}
        <TableCell align="center">{row["Paid Amount"]}</TableCell>

        {/* Receipt */}
        <TableCell align="center">
          {Number(row["Amount Payable as Processing Fees"]) - Number(row["Paid Amount"])}
        </TableCell>

        {/* Admissions */}
        <TableCell align="center">{row["Total Admitted"]}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell align="center" colSpan={16}>
        No Data Available...
      </TableCell>
    </TableRow>
  )}
</TableBody>

            </Table>
          </TableContainer>
    </DashboardContent>
  );
}
