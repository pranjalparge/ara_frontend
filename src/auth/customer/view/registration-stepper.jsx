import { useState } from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import { varAlpha, bgGradient, stylesMode } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

import { RegistrationForm } from './registration-form';
import { EnrollForm } from './enrollment-verification';
import { SplitVerifyView } from './verify-view';

// ----------------------------------------------------------------------

const STEPS = [ 'Registration', 'OTP Verification '];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: { borderColor: theme.vars.palette.success.main },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: { borderColor: theme.vars.palette.success.main },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderRadius: 1,
    borderTopWidth: 3,
    borderColor: theme.vars.palette.divider,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  height: 22,
  display: 'flex',
  alignItems: 'center',
  color: theme.vars.palette.text.disabled,
  ...(ownerState.active && { color: theme.vars.palette.success.main }),
  '& .QontoStepIcon-completedIcon': {
    zIndex: 1,
    fontSize: 18,
    color: theme.vars.palette.success.main,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Iconify
          icon="eva:checkmark-fill"
          className="QontoStepIcon-completedIcon"
          width={24}
          height={24}
        />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

function getStepContent(step, handleNext) {
  switch (step) {
    case 0:
      // return <EnrollForm navigate={handleNext} />;
      return <RegistrationForm navigate={handleNext} />;
    case 1:
      return <SplitVerifyView navigate={handleNext} />;
    // case 2:
    //   return <SplitVerifyView navigate={handleNext} />;

    default:
      return 'Unknown step';
  }
}

// ----------------------------------------------------------------------

export function CustomizedSteppers() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mb: 2 }} />

      <Paper
        sx={{
          p: 3,
          my: 1.5,
          minHeight: 120,
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
        }}
      >
        <Typography sx={{ my: 1 }}>{getStepContent(activeStep, handleNext)}</Typography>
      </Paper>

      <Box sx={{ textAlign: 'right' }}>
        <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        {/* <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
          {activeStep === STEPS.length - 1 ? 'Finish' : 'Next'}
        </Button> */}
      </Box>
    </>
  );
}
