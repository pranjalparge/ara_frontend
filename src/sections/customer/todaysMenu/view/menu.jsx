import { useState, useEffect, useCallback } from 'react';
import { ZodError } from 'zod';
import Dialog from '@mui/material/Dialog';
import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import {
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  CardHeader,
  CardContent,
} from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { RouterLink } from 'src/routes/components';
import { DashboardContent } from 'src/layouts/admin/dashboard';
import moment from 'moment';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useGetAllCategoriesMutation } from 'src/redux/slices/admin/menu';
import {
  useGetAllPlannedMenuMutation,
  useSaveDailyFoodMutation,
} from 'src/redux/slices/customer/plan';
import { LoadingButton } from '@mui/lab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { fDate, fToNow } from 'src/utils/format-time';
import { useRouter, usePathname } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
export function Menu() {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState([]);

  const [
    getTodayMenu,
    {
      data: menuData,
      isSuccess: menuDataIsSuccess,
      isLoading: menuDataIsLoading,
      error: menuDataerror,
      isError: menuDataisError,
    },
  ] = useGetAllPlannedMenuMutation();

  const [
    saveMenu,
    {
      data: saveMenuData,
      isLoading: saveMenuLoading,
      isSuccess: saveMenuIsSuccess,
      error,
      isError,
    },
  ] = useSaveDailyFoodMutation();

  useEffect(() => {
    getTodayMenu();
  }, []);

  useEffect(() => {
    if (menuData && menuDataIsSuccess) {
      console.log(menuData?.data);
      setSelectedMenu(menuData?.data);
    }
  }, [menuData, menuDataIsSuccess]);

  useEffect(() => {
    if (menuDataisError && menuDataerror) {
      toast.error(menuDataerror?.data?.message);
    }
  }, [menuDataerror, menuDataisError]);

  useEffect(() => {
    if (saveMenuIsSuccess && saveMenuData) {
      toast.success(saveMenuData?.message);
      getTodayMenu();
      router.push(paths.customer.root);
    }
  }, [saveMenuData, saveMenuIsSuccess]);

  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  const validate = (_e) => {
    _e.preventDefault();

    const finalList = selectedMenu.map((day) => {
      return {
        date: day.date,
        is_cancel: day.is_cancel,
        all_items: day.categories.flatMap((category) =>
          category.foodTypes.flatMap((foodType) =>
            foodType.all_items.map((item) => ({
              menu_id: item.menu_id,
              selected: item.selected,
            }))
          )
        ),
      };
    });
    console.log(finalList, 'hhh');
    saveMenu({
      menu: finalList,
    });
  };

  const handleFilterBenefits = (id, date) => {
    try {
      const updatedList = selectedMenu.map((item) => ({
        ...item,
        is_cancel: id && item?.date === date && item?.is_cancel ? 0 : item.is_cancel,
        categories: item?.categories?.map((category) => ({
          ...category,
          foodTypes: category?.foodTypes?.map((fType) => ({
            ...fType,
            all_items: fType?.all_items?.map((itemsGroup) =>
              itemsGroup.map((e) =>
                e.menu_id === id && item.date === date
                  ? { ...e, selected: true }
                  : { ...e, selected: false }
              )
            ),
          })),
        })),
      }));

      console.log('updatedList', updatedList);
      setSelectedMenu(updatedList);
    } catch (error) {
      console.error('Error updating menu:', error);
    }
  };

  const handleChecked = (e, date) => {
    try {
      const updatedList = selectedMenu.map((item) => ({
        ...item,
        is_cancel:
          item?.date == date && item?.is_cancel == 1
            ? 0
            : item?.date == date && item?.is_cancel == 0
              ? 1
              : item?.is_cancel,
        categories: item?.categories?.map((category) => ({
          ...category,
          foodTypes: category?.foodTypes?.map((fType) => ({
            ...fType,
            items: fType?.items?.map((e) => (item.date == date ? { ...e, selected: false } : e)),
          })),
        })),
      }));

      setSelectedMenu(updatedList);
    } catch (error) {
      console.error('Error updating menu:', error);
    }
  };

  const handleChange = (event, date, menu_id, is_cancel) => {
    if (is_cancel == 1) {
      toast.error('Please uncheck from cancel first  ');
      return;
    }
    const updatedData = selectedMenu.map((day) => {
      if (day.date === date) {
        day = { ...day };
        day.categories = day.categories.map((category) => {
          category = { ...category };
          category.foodTypes = category.foodTypes.map((foodType) => {
            foodType = { ...foodType };
            foodType.all_items = foodType.all_items.map((item) => {
              if (item.menu_id === menu_id) {
                return { ...item, selected: event.target.value };
              }
              return item;
            });
            return foodType;
          });
          return category;
        });
        return day;
      }
      return day;
    });

    setSelectedMenu(updatedData);
  };

  const handleDelete = (e, date) => {
    const updatedData = selectedMenu.map((day) => {
      if (day.date === date) {
        day = { ...day, is_cancel: e.target.checked ? 1 : 0 };
        day.categories = day.categories.map((category) => {
          category = { ...category };
          category.foodTypes = category.foodTypes.map((foodType) => {
            foodType = { ...foodType };
            foodType.all_items = foodType.all_items.map((item) => {
              return { ...item, selected: '' };

              return item;
            });
            return foodType;
          });
          return category;
        });
        return day;
      }
      return day;
    });

    setSelectedMenu(updatedData);
  };

  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {selectedMenu.length > 0 && (
          <form noValidate onSubmit={validate} autoComplete="off">
            <Box display="flex" flexDirection="column">
              <Box p={2} display="flex" flexDirection="column" gap={2}>
                {selectedMenu?.map((option) => (
                  <>
                    <Card
                      key={option.date}
                      sx={{
                        borderRadius: 2,
                        boxShadow: 3,
                        background: 'linear-gradient(135deg, #f3f4f6, #e7eaf3)',
                      }}
                    >
                      <Accordion
                        defaultExpanded={
                          moment().format('YYYY-MM-DD') == moment(option.date).format('YYYY-MM-DD')
                            ? true
                            : false
                        }
                        sx={{
                          boxShadow: 'none',
                          '&:before': { display: 'none' }, // Remove default divider
                        }}
                      >
                        <AccordionSummary
                          //expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                          sx={{ backgroundColor: '#e3f2fd', borderRadius: 1 }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%', // Ensure the flex container spans the full width
                            }}
                          >
                            <CardHeader
                              title={
                                <Typography variant="h6">
                                  {fDate(option.date)} ({moment(option.date).format('dddd')})
                                </Typography>
                              }
                              sx={{ padding: 2 }}
                            />
                          </Box>
                        </AccordionSummary>

                        <AccordionDetails>
                          {option?.categories?.map((cat) => (
                            <Box key={cat?.category_name} p={2} sx={{ mb: 1, borderRadius: 1 }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {cat?.category_name}
                              </Typography>
                              {cat?.foodTypes?.map((fType) => (
                                <Box key={fType?.food_type_name} pl={2} mt={1}>
                                  <Typography variant="body1" color="text.primary">
                                    {fType?.food_type_name}
                                  </Typography>
                                  {fType.all_items.map((items, index) => (
                                    <Box
                                      key={index}
                                      mt={1}
                                      display="flex"
                                      flexDirection={{ md: 'row', xs: 'column', sm: 'column' }}
                                      gap={1}
                                    >
                                      <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">
                                          {items?.veg}
                                        </FormLabel>
                                        <RadioGroup
                                          row
                                          value={items.selected}
                                          onChange={(e) => {
                                            handleChange(
                                              e,
                                              option.date,
                                              items.menu_id,
                                              option.is_cancel
                                            );
                                          }}
                                        >
                                          {items?.items?.map((fItem) => (
                                            <FormControlLabel
                                              value={fItem.item_id}
                                              control={<Radio />}
                                              label={fItem.item_name}
                                            />
                                          ))}
                                        </RadioGroup>
                                      </FormControl>
                                      {/* {items?.items?.map((fItem) => (
                                        <Box key={fItem?.item_id}>
                                          <FormControlLabel
                                            control={
                                              <Checkbox
                                                checked={fItem.selected}
                                                onClick={() =>
                                                  handleFilterBenefits(fItem.item_id, option.date)
                                                }
                                              />
                                            }
                                            label={fItem.item_name}
                                          />
                                        </Box>
                                      ))} */}
                                      {/* <Typography textAlign={'center'}>({items?.veg})</Typography> */}
                                    </Box>
                                  ))}
                                </Box>
                              ))}
                            </Box>
                          ))}
                          <Box display="flex" justifyContent={'end'}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={option.is_cancel == 1}
                                    onChange={(e) => handleDelete(e, option.date)}
                                    color="error"
                                  />
                                }
                                label={`Cancel for ${fDate(option.date)} (${moment(option.date).format('dddd')})`}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }, color: 'error.main' }}
                              />
                            </FormGroup>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </Card>
                  </>
                ))}
              </Box>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <DialogActions>
                <LoadingButton type="submit" variant="contained" loading={saveMenuLoading}>
                  {'Save Menu '}
                </LoadingButton>
              </DialogActions>
            </Stack>
          </form>
        )}
      </DashboardContent>
    </>
  );
}
