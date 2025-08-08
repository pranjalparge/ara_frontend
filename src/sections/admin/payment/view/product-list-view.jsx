import React, { useEffect, useState } from 'react';
import { useGetPaymentListMutation } from 'src/redux/slices/admin/menu';
import { Card, Stack, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { EmptyContent } from 'src/components/empty-content';
import { DashboardContent } from 'src/layouts/admin/dashboard';
import { RenderCellProduct } from '../product-table-row';

export function ProductListView() {
  const [tableData, setTableData] = useState([]);
  const [getPaymentList, { data, isLoading, isSuccess }] = useGetPaymentListMutation();

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      width: 30,
      renderCell: (params) => (
        <Stack spacing={2} direction="row" alignItems="start" mt={2}>
          <Typography component="span" variant="body2" noWrap>
            {params.row.id}.
          </Typography>
        </Stack>
      ),
    },
    {
      field: 'full_name',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 150,
      hideable: false,
      renderCell: (params) => <RenderCellProduct params={params} />,
    },
    {
      field: 'planName',
      headerName: 'Plan Name',
      flex: 1,
      minWidth: 150,
      hideable: false,
      renderCell: (params) => {
        <Stack spacing={2} direction="row" alignItems="start" mt={1}>
          <Typography component="span" variant="body2" noWrap>
            {params.row.planName}
          </Typography>
        </Stack>;
      },
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 100,
      hideable: false,
      renderCell: (params) => {
        <Stack spacing={2} direction="row" alignItems="start" mt={1}>
          <Typography component="span" variant="body2" noWrap>
            {params.row.amount}
          </Typography>
        </Stack>;
      },
    },
    {
      field: 'transaction_id',
      headerName: 'Transaction Id',
      flex: 1,
      minWidth: 150,
      hideable: false,
      renderCell: (params) => {
        <Stack spacing={2} direction="row" alignItems="start" mt={1}>
          <Typography component="span" variant="body2" noWrap>
            {params.row.transaction_id}
          </Typography>
        </Stack>;
      },
    },
  ];

  useEffect(() => {
    getPaymentList();
  }, []);

  useEffect(() => {
    if (data && isSuccess) {
      setTableData(data?.data);
    }
  }, [data, isSuccess]);

  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CustomBreadcrumbs
          heading="Payment List"
          links={[{ name: '', href: '' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            // height: { xs: 800, md: 2 },
            flexDirection: { md: 'column' },
          }}
        >
          <DataGrid
            getRowId={(row) => row.id}
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
    </>
  );
}
