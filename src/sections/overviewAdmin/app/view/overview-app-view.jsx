import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Card,
  Stack,
  Typography,
  IconButton,
  
  FormControl,
  Select,
  MenuItem,
  
  InputLabel,
} from '@mui/material';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { DashboardContent } from 'src/layouts/admin/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';
import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';

import { svgColorClasses } from 'src/components/svg-color';

import { useMockedUser } from 'src/auth/hooks';
import { AppWidget } from '../app-widget';
import { AppWelcome } from '../app-welcome';
import { AppFeatured } from '../app-featured';
import { AppNewInvoice } from '../app-new-invoice';
import { AppTopAuthors } from '../app-top-authors';
import { AppTopRelated } from '../app-top-related';
import { AppAreaInstalled } from '../app-area-installed';
import { AppWidgetSummary } from '../app-widget-summary';
import { AppCurrentDownload } from '../app-current-download';
import { AppTopInstalledCountries } from '../app-top-installed-countries';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname , } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { BookingAvailable } from '../booking-available';
import { EcommerceYearlySales } from '../ecommerce-yearly-sales';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { EmptyContent } from 'src/components/empty-content';
import React, { useEffect, useState } from 'react';
import {
  useGetDashboardDataMutation,
  useDeleteAdminListMutation,
} from 'src/redux/slices/admin/menu';
// ----------------------------------------------------------------------

export function OverviewAppView() {
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const router = useRouter();
  const [tableData, setTableData] = useState([]);

  const [getAdminList, { data, isLoading, isSuccess }] = useGetDashboardDataMutation();
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

  const [selectedDept, setSelectedDept] = useState('MARCH');
const [tableRows, setTableRows] = useState([]);
const mapSummaryObjectToRows = (obj) => {
  return Object.entries(obj).map(([key, value], index) => ({
    id: index + 1,
    metric: key,
    value: value
  }));
};


useEffect(() => {
  if (isSuccess && data) {
    setTableData(data?.data);
  }
}, [isSuccess, data]);


const columns = [
  { field: "id", headerName: "Sr", width: 70 },
  { field: "courseName", headerName: "Institute Name", width: 250 },

  // College Details
  { field: "totalInstitutes", headerName: "Total College", width: 150 },
  { field: "totalAdmitted", headerName: "Admission Colleges", width: 180 },
  { field: "totalIntake", headerName: "Zero Admission Colleges", width: 100 },
  { field: "totalAdmitted", headerName: "Total Admissions ", width: 120 },
  // { field: "vacancy", headerName: "Vacancy", width: 100 },

  //ARA Procsseing fees
  { field: "recommended", headerName: "Received Colleges", width: 150 },
  { field: "notRecommended", headerName: "Received Amount", width: 180 },
  { field: "cancellation", headerName: "Pending Colleges ", width: 150 },
  { field: "pending", headerName: "Pending Amount", width: 150 },

  // Directorate Status
  { field: "recommended", headerName: "Recommended", width: 150 },
  { field: "notRecommended", headerName: "Not Recommended", width: 180 },
  { field: "cancellation", headerName: "Cancellation", width: 150 },
  { field: "pending", headerName: "Pending", width: 150 },
  { field: "report", headerName: "Report", width: 150 },

  // ARA Status
  { field: "araApproved", headerName: "Approved", width: 150 },
  { field: "araRejected", headerName: "Rejected", width: 150 },
  { field: "araCancelled", headerName: "Cancelled", width: 150 },
  { field: "araPending", headerName: "Pending", width: 150 },
  { field: "approvalLetter", headerName: "Approval Letter", width: 150 },

  // RO Status
  { field: "roRecommended", headerName: "Recommended", width: 150 },
  { field: "roNotRecommended", headerName: "Not Recommended", width: 180 },
  { field: "roCancelled", headerName: "Cancelled", width: 150 },
  { field: "roPending", headerName: "Pending", width: 150 },

  // SO Status
  { field: "soRecommended", headerName: "Recommended", width: 150 },
  { field: "soNotRecommended", headerName: "Not Recommended", width: 180 },
  { field: "soCancelled", headerName: "Cancelled", width: 150 },
  { field: "soPending", headerName: "Pending", width: 150 }
];


// const columns = [
//   { field: "id", headerName: "Sr", width: 70 },
//   { field: "courseName", headerName: "Course Name", width: 150 },

//   // Base stats
//   { field: "totalInstitutes", headerName: "Total Colleges", width: 150 },
//   { field: "totalAdmitted", headerName: "Admissions Colleges", width: 180 },
//   { field: "totalIntake", headerName: "Total Admissions", width: 180 },

//   // ARA Status
//   { field: "araApproved", headerName: "ARA Approved", width: 150 },
//   { field: "araPending", headerName: "ARA Pending", width: 150 },
//   { field: "araRejected", headerName: "ARA Rejected", width: 150 },

//   // Directorate Verification
//   { field: "recommended", headerName: "Recommended", width: 150 },
//   { field: "notrecommended", headerName: "Not Recommended", width: 180 },

//   // Proposal & Reports
//   { field: "proposal_status_count", headerName: "Proposal Received", width: 180 },
//   { field: "admin_dte_confirm_countreportpending", headerName: "Report Pending", width: 180 },
//   { field: "admin_dte_confirm_countreportreceived", headerName: "Report Received", width: 180 },

//   // RO Status
//   { field: "RO_assign", headerName: "RO Assigned", width: 150 },
//   { field: "RO_notAssign", headerName: "RO Not Assigned", width: 180 },
//   { field: "RO_pending", headerName: "RO Pending", width: 150 },
//   { field: "RO_verified", headerName: "RO Verified", width: 150 },

//   // SO Status
//   { field: "SO_assign", headerName: "SO Assigned", width: 150 },
//   { field: "SO_notAssign", headerName: "SO Not Assigned", width: 180 },
//   { field: "SO_pending", headerName: "SO Pending", width: 150 },
//   { field: "SO_verified", headerName: "SO Verified", width: 150 }
// ];






 useEffect(() => {
  Promise.all([
    getAdminList({ id: 'march' }),
    getAdminList({ id: 'hmct' })
  ]).then(([marchRes, hmctRes]) => {
    console.log("March data:", marchRes);
    console.log("HMCT data:", hmctRes);
  });
}, []);


useEffect(() => {
  if (isSuccess && data) {
    setTableData([
      {
        id: 1,
        courseName: selectedDepartment,

        // Mapping API response fields
        

          totalInstitutes: data?.data?.totalInstitutes ?? 0,
        totalAdmitted: data?.data?.totalAdmitted ?? 0,
        totalIntake: data?.data?.totalIntake ?? 0,
  success_count: data.data.success_count ?? 0,
        success_amount_sum: data.data.success_amount_sum ?? 0,
        pending_count: data.data.pending_count ?? 0,
          pending_amount_sum: data.data.pending_amount_sum ?? 0,
        // ARA Status
        araApproved: data.data.araApproved ?? 0,
        araPending: data.data.araPending ?? 0,
        araRejected: data.data.araRejected ?? 0,
        araNotConfirmActive: data.data.araNotConfirmActive ?? 0,
                araConfirmActive: data.data.araConfirmActive ?? 0,
        // Directorate Verification Status
        recommended: data.data.recommended ?? 0,
        notrecommended: data.data.notrecommended ?? 0,
              dte_confirm_reportreceived: data.data.dte_confirm_reportreceived ?? 0,
      dte_confirm_reportreceived: data.data.dte_confirm_reportreceived ?? 0,
        // Proposal & Report Status
        proposal_status_count: data.data.proposal_status_count ?? 0,
        admin_dte_confirm_countreportpending: data.data.admin_dte_confirm_countreportpending ?? 0,
        admin_dte_confirm_countreportreceived: data.data.admin_dte_confirm_countreportreceived ?? 0,

        // SO/RO Verification
        RO_assign: data.data.RO_assign ?? 0,
        RO_notAssign: data.data.RO_notAssign ?? 0,
        RO_pending: data.data.RO_pending ?? 0,
        RO_verified: data.data.RO_verified ?? 0,
cutoff_Date:data.data.cutoff_Date ?? 0,
        SO_assign: data.data.SO_assign ?? 0,
        SO_notAssign: data.data.SO_notAssign ?? 0,
        SO_pending: data.data.SO_pending ?? 0,
        SO_verified: data.data.SO_verified ?? 0
      }
    ]);
  }
}, [isSuccess, data]);



  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <AppWelcome
            title={`Welcome back in Admin👋`}
            // description={
            //   !user?.subscription_plan &&
            //   'Would you like to access our services? Click Go Now to explore and select a plan that suits you best.'
            // }
            img={<SeoIllustration hideBackground />}
            action={null}
          />
        </Grid>

           <CustomBreadcrumbs
        heading="Course Wise Summary"
        links={[{ name: '', href: '' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
         <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 4 ,ml:2}}>
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
{/* <DataGrid
  getRowId={(row) => row.id}
  rows={tableData ?? []}
  columns={columns}
  loading={isLoading}
  getRowHeight={() => "auto"}

  autoHeight
  pageSizeOptions={[10, 50, 100]}
  initialState={{
    pagination: { paginationModel: { pageSize: 100 } }
  }}
  slots={{
    toolbar: GridToolbar,
    noRowsOverlay: () => <EmptyContent />,
    noResultsOverlay: () => <EmptyContent title="No results found" />
  }}
  slotProps={{
    toolbar: { showQuickFilter: true }
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

            {/* College Details */}
            <TableCell align="center">Total College</TableCell>
            <TableCell align="center">Admission Colleges</TableCell>
            <TableCell align="center">Zero Admission Colleges</TableCell>
            <TableCell align="center">Total Admissions</TableCell>

            {/* ARA Processing Fees */}
            <TableCell align="center">Received Colleges</TableCell>
            <TableCell align="center">Received Amount</TableCell>
            <TableCell align="center">Pending Colleges</TableCell>
            <TableCell align="center">Pending Amount</TableCell>

            {/* Directorate Status */}
            <TableCell align="center">Recommended</TableCell>
            <TableCell align="center">Not Recommended</TableCell>
            <TableCell align="center">Cancellation</TableCell>
            <TableCell align="center">Pending</TableCell>
            <TableCell align="center">Received Report</TableCell>
     <TableCell align="center">Pending Report</TableCell>
            {/* ARA Status */}
            <TableCell align="center">Approved</TableCell>
            <TableCell align="center">Rejected</TableCell>
            <TableCell align="center">Cancelled</TableCell>
            <TableCell align="center">Pending</TableCell>
            <TableCell align="center">college Complete</TableCell>
     <TableCell align="center">college Pending</TableCell>
            {/* RO Status */}
            <TableCell align="center">RO Recommended</TableCell>
            <TableCell align="center">RO Not Recommended</TableCell>
            <TableCell align="center">RO Verified</TableCell>
            <TableCell align="center">RO Pending</TableCell>

            {/* SO Status */}
            <TableCell align="center">SO Recommended</TableCell>
            <TableCell align="center">SO Not Recommended</TableCell>
            <TableCell align="center">SO Verified</TableCell>
            <TableCell align="center">SO Pending</TableCell>

               <TableCell align="center">Cut-off date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tableData && tableData.length > 0 ? (
            tableData.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.courseName}</TableCell>

                {/* College Details */}
                <TableCell align="center">{row.totalInstitutes}</TableCell>
                <TableCell align="center">0</TableCell>
                <TableCell align="center">0</TableCell>
                <TableCell align="center">{row.totalAdmitted}</TableCell>

                {/* ARA Processing Fees */}
                <TableCell align="center">{row?.success_count}</TableCell>
                <TableCell align="center">{row?.success_amount_sum}</TableCell>
                <TableCell align="center">{row.pending_count }</TableCell>
                <TableCell align="center">{row.pending_amount_sum }</TableCell>

                {/* Directorate Status */}
                <TableCell align="center">{row.recommended}</TableCell>
                <TableCell align="center">{row.notrecommended}</TableCell>
                <TableCell align="center">{row.cancellation ?? "N.A"}</TableCell>
                <TableCell align="center">{row.directorpending }</TableCell>
                <TableCell align="center">{row.dte_confirm_reportreceived}</TableCell>
<TableCell align="center">{row.dte_confirm_reportpending}</TableCell>
                {/* ARA Status */}
                <TableCell align="center">{row.araApproved}</TableCell>
                <TableCell align="center">{row.araRejected}</TableCell>
                <TableCell align="center">{row.araCancelled ?? "N.A"}</TableCell>
                <TableCell align="center">{row.araPending}</TableCell>
                 <TableCell align="center">{row.araConfirmActive}</TableCell>
   <TableCell align="center">{row.araNotConfirmActive}</TableCell>
                {/* RO Status */}
                <TableCell align="center">{row.RO_assign ?? "N.A"}</TableCell>
                <TableCell align="center">
                  {row.RO_notAssign ?? "N.A"}
                </TableCell>
                <TableCell align="center">{row.RO_verified ?? "N.A"}</TableCell>
                <TableCell align="center">{row.RO_pending ?? "N.A"}</TableCell>

                {/* SO Status */}
                <TableCell align="center">{row.SO_assign ?? "N.A"}</TableCell>
                <TableCell align="center">
                  {row.SO_notAssign ?? "N.A"}
                </TableCell>
                <TableCell align="center">{row.SO_verified ?? "N.A"}</TableCell>
             
                <TableCell align="center">{row.SO_pending ?? "N.A"}</TableCell>
            
               <TableCell align="center">{row.cutoff_Date}</TableCell>  
               </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={30}>
                No Data Available...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>

        {/* <Grid xs={12} md={4}>
          <AppFeatured list={_appFeatured} />
        </Grid> */}

        {/* <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total active users"
            percent={2.6}
            total={18765}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [15, 18, 12, 51, 68, 11, 39, 37],
            }}
          />
        </Grid> */}
{/* 
        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total installed"
            percent={0.2}
            total={4876}
            chart={{
              colors: [theme.vars.palette.info.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [20, 41, 63, 33, 28, 35, 50, 46],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total downloads"
            percent={-0.1}
            total={678}
            chart={{
              colors: [theme.vars.palette.error.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [18, 19, 31, 8, 16, 37, 12, 33],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <BookingAvailable
            title="Tours available"
            chart={{
              series: [
                { label: 'Sold out', value: 120 },
                { label: 'Available', value: 66 },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Area installed"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  name: '2022',
                  data: [
                    { name: 'Asia', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                    { name: 'Europe', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                    { name: 'Americas', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                  ],
                },
                {
                  name: '2023',
                  data: [
                    { name: 'Asia', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                    { name: 'Europe', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                    { name: 'Americas', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                  ],
                },
                {
                  name: '2024',
                  data: [
                    { name: 'Asia', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                    { name: 'Europe', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                    { name: 'Americas', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                  ],
                },
              ],
            }}
          />
        </Grid> */}
        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Current download"
            subheader="Downloaded by operating system"
            chart={{
              series: [
                { label: 'Mac', value: 12244 },
                { label: 'Window', value: 53345 },
                { label: 'iOS', value: 44313 },
                { label: 'Android', value: 78343 },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} lg={8}>
          <EcommerceYearlySales
            id="demo__4"
            title="Yearly sales"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  name: '2022',
                  data: [
                    {
                      name: 'Total income',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                    {
                      name: 'Total expenses',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                    },
                  ],
                },
                {
                  name: '2023',
                  data: [
                    {
                      name: 'Total income',
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                    {
                      name: 'Total expenses',
                      data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppTopRelated title="Related applications" list={_appRelated} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopInstalledCountries title="Top installed countries" list={_appInstalled} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopAuthors title="Top authors" list={_appAuthors} />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <AppWidget
              title="Conversion"
              total={38566}
              icon="solar:user-rounded-bold"
              chart={{ series: 48 }}
            />

            <AppWidget
              title="Applications"
              total={55566}
              icon="fluent:mail-24-filled"
              chart={{
                series: 75,
                colors: [theme.vars.palette.info.light, theme.vars.palette.info.main],
              }}
              sx={{ bgcolor: 'info.dark', [`& .${svgColorClasses.root}`]: { color: 'info.light' } }}
            />
          </Box>
        </Grid> */}
      </Grid>
    </DashboardContent>
  );
}
