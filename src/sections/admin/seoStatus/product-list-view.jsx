import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useGetSeoStatusMutation } from 'src/redux/slices/admin/menu';

const pageOptions = [
  { label: 'Home', url: 'https://www.4pillarsinfotechindia.com/4pillars/' },
  { label: 'About Us', url: 'https://www.4pillarsinfotechindia.com/4pillars/about-us' },
  { label: 'Apps', url: 'https://www.4pillarsinfotechindia.com/4pillars/apps' },
  { label: 'Brand', url: 'https://www.4pillarsinfotechindia.com/4pillars/brand' },
  { label: 'Clientele', url: 'https://www.4pillarsinfotechindia.com/4pillars/clientele' },
  { label: 'Blog', url: 'https://www.4pillarsinfotechindia.com/4pillars/blogs' },
  { label: 'Career', url: 'https://www.4pillarsinfotechindia.com/4pillars/career' },
  { label: 'Contact', url: 'https://www.4pillarsinfotechindia.com/4pillars/contact' },
];

const MetricCard = ({ value, label, color }) => (
  <Stack alignItems="center" spacing={1}>
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={100}
        size={60}
        thickness={4}
        sx={{ color: '#f0f0f0' }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        size={60}
        thickness={4}
        sx={{
          color,
          position: 'absolute',
          left: 0,
        }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="subtitle1" fontWeight="bold" color={color}>
          {value}
        </Typography>
      </Box>
    </Box>
    <Typography variant="body2" fontWeight={500}>
      {label}
    </Typography>
  </Stack>
);

export function ProductListView() {
  const [selectedUrl, setSelectedUrl] = useState(pageOptions[0].url);
  const [metrics, setMetrics] = useState(null);
  const [getSeoStatus, { isLoading, error }] = useGetSeoStatusMutation();

  const handleUrlChange = async (url) => {
    setSelectedUrl(url);
    try {
      const data = await getSeoStatus(url).unwrap();

      setMetrics([
        {
          label: 'Performance',
          value: data.Performance.score,
          color: data.Performance.color,
        },
        {
          label: 'Accessibility',
          value: data.Accessibility.score,
          color: data.Accessibility.color,
        },
        {
          label: 'Best Practices',
          value: data['Best Practices'].score,
          color: data['Best Practices'].color,
        },
        {
          label: 'SEO',
          value: data.SEO.score,
          color: data.SEO.color,
        },
      ]);
    } catch (err) {
      console.error('Failed to fetch metrics:', err);
    }
  };
  

  useEffect(() => {
    handleUrlChange(selectedUrl);
  }, []);

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Lighthouse Report Summary
        </Typography>

        <FormControl fullWidth sx={{ mb: 3, maxWidth: 400 }}>
          <InputLabel>Select Page</InputLabel>
          <Select
            value={selectedUrl}
            label="Select Page"
            onChange={(e) => handleUrlChange(e.target.value)}
          >
            {pageOptions.map((option, index) => (
              <MenuItem key={index} value={option.url}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider sx={{ mb: 3 }} />

        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : metrics ? (
          <Stack direction="row" spacing={5} justifyContent="center">
            {metrics.map((metric, idx) => (
              <MetricCard key={idx} {...metric} />
            ))}
          </Stack>
        ) : (
          <Typography color="textSecondary">No data available</Typography>
        )}
      </Paper>
    </Box>
  );
}
