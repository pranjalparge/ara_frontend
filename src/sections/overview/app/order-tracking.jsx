import Card from '@mui/material/Card';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import { Typography } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { fDateTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------
const colors = ['primary', 'success', 'info', 'warning', 'error'];
export function OrderTracking({ title, subheader, list, ...other }) {
  const activeStepIndex = list.filter((item) => item.status == 1).length;
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box mt={6} sx={{ overflow: 'scroll', overflowY: 'hidden' }}>
        <Stepper activeStep={activeStepIndex - 1} alternativeLabel>
          {list?.map((item, index) => (
            <Step key={index}>
              <StepLabel>{item.name}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* <Timeline
        align="alternate"
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {list?.map((item, index) => (
          <Item
            key={item.id}
            item={item}
            lastItem={index === list.length - 1}
            color={colors[index % colors.length]}
          />
        ))}
      </Timeline> */}
    </Card>
  );
}

function Item({ item, color, lastItem, ...other }) {
  return (
    <TimelineItem {...other}>
      <TimelineSeparator>
        <TimelineDot color={color} />
        {lastItem ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        {item?.status ? (
          <Typography variant="subtitle2">{item.name}</Typography>
        ) : (
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {item.name}
          </Typography>
        )}
      </TimelineContent>
    </TimelineItem>
  );
}
