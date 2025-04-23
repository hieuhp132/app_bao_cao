import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { TrendingUp, TrendingDown, Remove, Favorite } from '@mui/icons-material';

interface BusinessStatusProps {
  storeName: string;
  currentValue: number;
  previousValue: number;
  target: number;
}

const getStatusColor = (current: number, previous: number, target: number) => {
  if (current >= target) return 'success';
  if (current > previous) return 'success';
  if (current === previous) return 'default';
  return 'error';
};

const getStatusIcon = (current: number, previous: number, target: number) => {
  if (current >= target) return <Favorite color="error" />;
  if (current > previous) return <TrendingUp color="success" />;
  if (current === previous) return <Remove color="action" />;
  return <TrendingDown color="error" />;
};

const DailyBusinessStatus: React.FC<BusinessStatusProps> = ({
  storeName,
  currentValue,
  previousValue,
  target,
}) => {
  const statusColor = getStatusColor(currentValue, previousValue, target);
  const StatusIcon = getStatusIcon(currentValue, previousValue, target);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">{storeName}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h5" color={statusColor}>
                {currentValue.toLocaleString()}
              </Typography>
              {StatusIcon}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              Target: {target.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DailyBusinessStatus; 