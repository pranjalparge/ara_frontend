import React, { useState } from "react";
import { Box, FormHelperText, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useRouter, usePathname } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { toast } from 'src/components/snackbar';

const TwoFactorVerify = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [otpErr, setOtpErr] = useState(false);
  const [otpErrMsg, setOtpErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (value) => {
    setOtp(value);
    setOtpErr(false);
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setOtpErr(true);
      setOtpErrMsg("OTP must be 6 digits");
      return;
    }
    
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setOtpErr(true);
      setOtpErrMsg("Authorization token missing");
      return;
    }

    setIsLoading(true);

const apiBaseUrl = import.meta.env.VITE_ADMIN_API_URL;
    
    try {
      const response = await axios.post(
        `${apiBaseUrl}api/user/verifyEmail`,
        { otp },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("OTP Verified Successfully");
      router.push(paths.admin.root);
    } catch (error) {
      setOtpErr(true);
      setOtpErrMsg(error.response?.data?.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box gap={3} display="flex" flexDirection="column" width={300} margin="auto" mt={5}>
      <Typography>Please Fill the OTP from mail <br/> To Verify Your Email</Typography>
      <MuiOtpInput
        autoFocus
        gap={1.5}
        length={6}
        TextFieldsProps={{ error: otpErr, placeholder: "-" }}
        value={otp}
        onChange={handleChange}
      />
      {otpErr && <FormHelperText sx={{ px: 2 }} error>{otpErrMsg}</FormHelperText>}
      <LoadingButton fullWidth size="large" variant="contained" loading={isLoading} onClick={handleSubmit}>
        Submit
      </LoadingButton>
    </Box>
  );
};

export { TwoFactorVerify };
