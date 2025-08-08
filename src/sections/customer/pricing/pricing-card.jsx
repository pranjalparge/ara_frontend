import { Box, Card, CardContent, Grid, TextField } from '@mui/material';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { varAlpha, stylesMode } from 'src/theme/styles';
import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from 'src/assets/icons';
import { useEffect, useState, useRef } from 'react';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { useRouter, usePathname } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { toast } from 'src/components/snackbar';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateReduxState } from 'src/redux/slices/features-slice/user';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import sandepSirPayment from 'src/assets/icons/sandepSirPayment.jpeg';
// ----------------------------------------------------------------------

export function PricingCard({ card, sx, data, ...other }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { subscription, price, caption, lists, labelAction } = card;
  const [isLoading, setloading] = useState(false);
  const premium = subscription === 'premium';
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  const [file, setFile] = useState();
  const [refId, setRefId] = useState('');
  const handleClose = () => {
    setOpen(false);
    setItem({});
    setFile();
    setRefId('');
    fileRef.current.value = null;
  };

  const paymentHandler = async (e, plan_id) => {
    console.log('ppppp');
    //setloading(true);
    const response = await fetch(
      `${import.meta.env.VITE_CUSTOMER_API_URL}subscription/createNewPaymentForSubscription`,
      {
        method: 'POST',
        body: JSON.stringify({ plan_id: plan_id }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
        },
      }
    );
    const porder = await response.json();
    const order = porder?.data;
    console.log(porder);
    setloading(false);
    if (porder?.success == false) {
      return toast.error(porder?.message);
    }

    var options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: import.meta.env.VITE_RAZORPAY_NAME,
      description: import.meta.env.VITE_CLIENT_SUBSCRIPTION_DESCRIPTION,
      image: import.meta.env.VITE_RAZORPAY_LOGO,
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };
        console.log('tttttt');
        checkPaymentDoneOrNot({
          transactionId: body?.razorpay_payment_id,
          orderId: body?.razorpay_order_id,
        });
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: order.fullName, //your customer's name
        email: order.email,
        contact: order.mobile, //Provide the customer's phone number for better conversion rates
        // method: 'upi',
      },
      notes: {
        user_id: order?.userId,
        payment_code: import.meta.env.VITE_RAZORPAY_PAYMENT_CODE,
      },
      theme: {
        color: import.meta.env.VITE_RAZORPAY_COLOR,
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      console.log(response.error, 'pp');
      toast.error(response.error.description);

      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  });
  const checkPaymentDoneOrNot = async (order) => {
    try {
      //setloading(true);
      const res = await axios.post(
        ` ${import.meta.env.VITE_CUSTOMER_API_URL}subscription/isPaymentDone`,
        {
          transactionId: order?.transactionId,
          orderId: order?.orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
          },
        }
      );
      setloading(false);
      if (res.status === 200) {
        // console.log(res.data?.data);
        if (res.data?.success) {
          toast.success(res.data?.message);
          const updateUser = { ...user };
          updateUser.subscription_plan = true;
          dispatch(
            updateReduxState({
              key: 'user',
              value: updateUser,
            })
          );
          router.push(paths.customer.profile);
        }
      } else if (!res?.success) {
        toast.error(res?.message);
      }
    } catch (error) {
      //toast.error(res.data?.message);
      setloading(false);
      console.log(error);
    }
  };
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  function onSelectFile(e) {
    const selectedFile = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSizeKB = 200;

    if (selectedFile) {
      if (allowedTypes.includes(selectedFile.type)) {
        if (selectedFile.size <= maxSizeKB * 1024) {
          setFile(selectedFile);
        } else {
          fileRef.current.value = null;
          toast.error('Please select an image file of size up to 200KB.');
        }
      } else {
        fileRef.current.value = null;
        toast.error('Please select a valid JPEG or PNG image file.');
      }
    }
  }

  const handelSubmit = async () => {
    try {
      setLoading(true);

      if (!file) {
        toast.error('Please Select ScreenShot.');
        setLoading(false);
        return;
      }
      if (!refId) {
        toast.error('Please enter Back Reference Id.');
        setLoading(false);
        return;
      }
      const bodyFormData = new FormData();

      bodyFormData.append(`plan_id`, item?._id);
      bodyFormData.append(`bank_reference_id`, refId);
      if (file) {
        bodyFormData.append(`screenshot`, file);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_CUSTOMER_API_URL}subscription/requestForPayment`,
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
          },
        }
      );

      if (res.status == 200) {
        toast.success('Request has been sent successfully.');
        handleClose();
        router.push(paths.customer.profile);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <>
      {data?.map((item) => {
        return (
          <Stack
            spacing={5}
            sx={{
              p: 5,
              borderRadius: 2,
              bgcolor: 'background.default',
              boxShadow: (theme) => ({ xs: theme.customShadows.card, md: 'none' }),
              ...(premium && {
                boxShadow: (theme) => ({
                  xs: theme.customShadows.card,
                  md: `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
                }),
                [stylesMode.dark]: {
                  boxShadow: (theme) => ({
                    xs: theme.customShadows.card,
                    md: `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.common.blackChannel, 0.16)}`,
                  }),
                },
              }),
              ...sx,
            }}
            {...other}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              {premium && <PlanPremiumIcon sx={{ width: 64 }} />}
            </Stack>

            <Stack spacing={1}>
              <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
                {item?.name}
              </Typography>
              <Typography variant="subtitle2">{caption}</Typography>
            </Stack>

            <Stack direction="row">
              <Typography variant="h4">₹</Typography>

              <Typography variant="h2">{item?.price}</Typography>

              <Typography
                component="span"
                sx={{
                  alignSelf: 'center',
                  color: 'text.disabled',
                  ml: 1,
                  typography: 'body2',
                }}
              >
                /{item?.days}
              </Typography>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box component="span" sx={{ typography: 'overline' }}>
                  Benefits
                </Box>
              </Stack>

              {item?.description?.split(',').map((e) => (
                <Stack
                  key={item}
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  sx={{ typography: 'body2' }}
                >
                  <Iconify icon="eva:checkmark-fill" width={16} sx={{ mr: 1 }} />
                  {e}
                </Stack>
              ))}
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              variant="contained"
              //disabled={basic}
              loading={isLoading}
              color={'primary'}
              onClick={(e) => {
                paymentHandler(e, item._id);
                // setOpen(true);
                // setItem(item);
              }}
            >
              {labelAction}
            </LoadingButton>
          </Stack>
        );
      })}
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle sx={{ pb: 2 }}>Payment </DialogTitle>
        <DialogContent sx={{ typography: 'body2' }}>
          <Grid container>
            <Grid item xs={12} md={4}>
              <img src={sandepSirPayment} style={{ width: 10000 }}></img>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box spacing={2}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      After Payment You have to send request to Admin to verify your payment with
                      valid screenshot .
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Fill below details carefully.
                    </Typography>
                  </CardContent>

                  <Box p={2} sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: 2 }}>
                    {/* Grid for Plan Name and File Input */}
                    <Grid container spacing={2}>
                      {/* Plan Name */}
                      <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                          <Typography variant="subtitle1" fontWeight="bold">
                            Plan Name:
                          </Typography>
                          <Typography pl={1} variant="body1">
                            {item?.name || 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* File Input */}
                      <Grid item xs={12} md={6}>
                        <Box display="flex" alignItems="center">
                          <input
                            type="file"
                            accept="image/*"
                            style={{
                              padding: '8px',
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              width: '100%',
                            }}
                            onChange={onSelectFile}
                            ref={fileRef}
                          />
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Remarks TextField */}
                    <Box mt={3}>
                      <TextField
                        fullWidth
                        required
                        label="Bank Reference Id"
                        inputProps={{
                          autoComplete: 'off',
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                          },
                        }}
                        value={refId}
                        onChange={(e) => setRefId(e.target.value)}
                      />
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            color="inherit"
            onClick={() => handelSubmit()}
            loading={loading}
          >
            Send Request
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
