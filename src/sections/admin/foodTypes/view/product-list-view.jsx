import { DashboardContent } from 'src/layouts/admin/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  Button,
  Typography,
  Stack,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Tooltip,
  IconButton,
  Switch,
  FormControlLabel,
  InputLabel,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { EmptyContent } from 'src/components/empty-content';
import { useGetFoodTypesMutation, useUpdateFoodTypesMutation } from 'src/redux/slices/admin/menu';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { RenderCellProduct } from '../product-table-row';
import { toast } from 'src/components/snackbar';
import { BookingCheckInWidgets } from 'src/sections/overviewAdmin/app/booking-check-in-widgets';

export function ProductListView() {
  const [open, setopen] = useState(false);
  const [state, setState] = useState({ id: '', name: '', description: '', isactive: 1 });
  const [tableData, setTableData] = useState([]);
  const [tabData, setTabData] = useState([]);
  const [getFoodTypes, { data, isLoading, isSuccess }] = useGetFoodTypesMutation();
  const [
    updateFoodTypes,
    {
      data: foodTypeData,
      isLoading: foodTypeLoading,
      isSuccess: foodTypeIsSuccess,
      error,
      isError,
    },
  ] = useUpdateFoodTypesMutation();
  const [foodTypeId, setFoodTypeId] = useState('');
  const { i18n, t } = useTranslation();

  const handleToggleChange = (row) => {
    const newActiveState = !row.isactive ? 1 : 0;
    updateFoodTypes({
      name: row.name,
      id: row.id,
      description: row.description,
      isactive: newActiveState,
    });
  };

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
      field: 'description',
      headerName: 'Name',
      flex: 1,
      minWidth: 300,
      hideable: false,
      renderCell: (params) => <RenderCellProduct params={params} />,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      exportable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <Switch
                name="isactive"
                checked={row.isactive}
                onChange={() => handleToggleChange(row)}
              />
            }
          />
          <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton
              color={'default'}
              onClick={() => {
                setopen(true);
                setFoodTypeId(row.id);
                setState({
                  id: row.id,
                  name: row.name,
                  description: row.description,
                  isactive: row.isactive,
                });
              }}
            >
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const validate = (_e) => {
    _e.preventDefault();
    try {
      if (!state.name) {
        toast.error('Food Type Not Found');
        return;
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues;
        console.log(errors);
        if (errors?.length > 0) {
          errors.forEach((e) => {
            if (e.message !== '') {
              const field = `${e.path[0]}Err`;
              setState((prevState) => ({
                ...prevState,
                [field]: true,
                [`${e.path[0]}ErrMsg`]: e.message,
              }));
            }
          });
        }
      }
      return;
    }
    const status = state.isactive ? 1 : 0;
    updateFoodTypes({
      name: state.name,
      id: state.id,
      description: state.description,
      isactive: status,
    });
  };

  const handelChange = (_event) => {
    setState((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value, //
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: '',
    }));
  };

  useEffect(() => {
    getFoodTypes();
  }, []);

  useEffect(() => {
    if (data && isSuccess) {
      setTableData(data?.data.list);
      setTabData(data?.data.count);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (foodTypeData && foodTypeIsSuccess) {
      toast.success(foodTypeData?.message);
      setopen(false);
      getFoodTypes();
    }
  }, [foodTypeData, foodTypeIsSuccess]);

  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CustomBreadcrumbs
          heading="Food Types List"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              component={RouterLink}
              onClick={() => {
                setopen(true);
                setFoodTypeId('');
                setState({
                  name: '',
                  id: '',
                  description: '',
                  isactive: 1,
                });
              }}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Food Type
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Box
          sx={{
            mb: 3,
            display: 'flex',
            gap: { xs: 1, md: 1 },
            borderRadius: { md: 2 },
            flexDirection: 'column',
            bgcolor: { md: 'background.neutral' },
          }}
        >
          <BookingCheckInWidgets
            chart={{
              series: [
                {
                  label: 'Active',
                  percent: (Number(tabData?.active) * 100) / tabData?.total,
                  total: tabData.active,
                },
                {
                  label: 'Inactive',
                  percent: (Number(tabData?.inactive) * 100) / tabData?.total,
                  total: tabData.inactive,
                },
              ],
            }}
            sx={{ boxShadow: { md: 'none' } }}
          />
        </Box>

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

        <div>
          <Dialog onClose={() => setopen(false)} open={open}>
            <DialogTitle> {foodTypeId ? 'Edit' : 'Add'} Food Type</DialogTitle>
            <form noValidate onSubmit={validate} autoComplete="off">
              <DialogContent>
                <Typography sx={{ mb: 3 }}>
                  Add new food type with details ans status here.
                </Typography>

                <TextField
                  fullWidth
                  inputProps={{
                    autoComplete: 'off',
                  }}
                  helperText={t(state.menuNameErrMsg)}
                  error={state.menuNameErr}
                  label={t('Food Type Name')}
                  margin="normal"
                  name="name"
                  onChange={handelChange}
                  type="text"
                  value={state.menuName}
                  size="small"
                  autoComplete="off"
                />

                <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                <FormControlLabel
                  control={
                    <Switch
                      name="isactive"
                      checked={state.isactive}
                      onChange={() => setState((old) => ({ ...old, isactive: !old.isactive }))}
                    />
                  }
                />
              </DialogContent>

              <DialogActions>
                <Button onClick={() => setopen(false)} variant="outlined" color="inherit">
                  Cancel
                </Button>
                <LoadingButton variant="contained" type="submit" loading={foodTypeLoading}>
                  {foodTypeId ? 'Save' : 'Add'}
                </LoadingButton>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      </DashboardContent>
    </>
  );
}
