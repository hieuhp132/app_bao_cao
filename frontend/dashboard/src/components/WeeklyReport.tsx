import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface WeeklyReportProps {
  storeName: string;
  currentWeekValue: number;
  previousWeekValue: number;
  target: number;
}

const getPerformanceMessage = (current: number, previous: number) => {
  const percentageChange = ((current - previous) / previous) * 100;
  
  if (percentageChange > 0) {
    return {
      message: `Chúc mừng! Doanh số tăng ${percentageChange.toFixed(1)}% so với tuần trước`,
      color: 'success'
    };
  } else if (percentageChange < 0) {
    return {
      message: `Cố lên! Doanh số giảm ${Math.abs(percentageChange).toFixed(1)}% so với tuần trước`,
      color: 'error'
    };
  }
  return {
    message: 'Doanh số giữ nguyên so với tuần trước',
    color: 'default'
  };
};

const WeeklyReport: React.FC<WeeklyReportProps> = ({
  storeName,
  currentWeekValue,
  previousWeekValue,
  target,
}) => {
  const performance = getPerformanceMessage(currentWeekValue, previousWeekValue);
  const percentageChange = ((currentWeekValue - previousWeekValue) / previousWeekValue) * 100;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              {storeName}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h5">
                {currentWeekValue.toLocaleString()}
              </Typography>
              {percentageChange > 0 ? (
                <TrendingUp color="success" />
              ) : (
                <TrendingDown color="error" />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary">
              Tuần này
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h5">
              {previousWeekValue.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tuần trước
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Chip
              label={performance.message}
              color={performance.color as any}
              sx={{ mt: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Mục tiêu: {target.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeeklyReport; 