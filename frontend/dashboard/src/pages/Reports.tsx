import React, { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, Paper, Divider } from '@mui/material';
import DailyBusinessStatus from '../components/DailyBusinessStatus';
import WeeklyReport from '../components/WeeklyReport';
import PerformanceCharts from '../components/PerformanceCharts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Mock data with additional stores
const mockData = {
  daily: [
    { storeName: 'Cửa hàng A', currentValue: 15000000, previousValue: 14000000, target: 16000000 },
    { storeName: 'Cửa hàng B', currentValue: 12000000, previousValue: 13000000, target: 15000000 },
    { storeName: 'Cửa hàng C', currentValue: 18000000, previousValue: 17000000, target: 17000000 },
    { storeName: 'Cửa hàng D', currentValue: 22000000, previousValue: 20000000, target: 21000000 },
    { storeName: 'Cửa hàng E', currentValue: 9500000, previousValue: 10000000, target: 12000000 },
    { storeName: 'Cửa hàng F', currentValue: 13500000, previousValue: 13500000, target: 14000000 },
    { storeName: 'Cửa hàng G', currentValue: 16800000, previousValue: 16500000, target: 16500000 },
    { storeName: 'Cửa hàng H', currentValue: 14200000, previousValue: 15000000, target: 15500000 },
    { storeName: 'Cửa hàng I', currentValue: 19500000, previousValue: 19000000, target: 19000000 },
    { storeName: 'Cửa hàng J', currentValue: 11000000, previousValue: 10500000, target: 11500000 },
  ],
  weekly: [
    { storeName: 'Cửa hàng A', currentWeekValue: 95000000, previousWeekValue: 88000000, target: 100000000 },
    { storeName: 'Cửa hàng B', currentWeekValue: 85000000, previousWeekValue: 92000000, target: 90000000 },
    { storeName: 'Cửa hàng C', currentWeekValue: 110000000, previousWeekValue: 105000000, target: 110000000 },
    { storeName: 'Cửa hàng D', currentWeekValue: 145000000, previousWeekValue: 135000000, target: 140000000 },
    { storeName: 'Cửa hàng E', currentWeekValue: 65000000, previousWeekValue: 70000000, target: 75000000 },
    { storeName: 'Cửa hàng F', currentWeekValue: 92000000, previousWeekValue: 92000000, target: 95000000 },
    { storeName: 'Cửa hàng G', currentWeekValue: 105000000, previousWeekValue: 102000000, target: 105000000 },
    { storeName: 'Cửa hàng H', currentWeekValue: 88000000, previousWeekValue: 95000000, target: 95000000 },
    { storeName: 'Cửa hàng I', currentWeekValue: 120000000, previousWeekValue: 115000000, target: 118000000 },
    { storeName: 'Cửa hàng J', currentWeekValue: 72000000, previousWeekValue: 68000000, target: 75000000 },
  ]
};

const Reports: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Báo cáo doanh số
        </Typography>

        {/* Performance Charts Section */}
        <Box sx={{ mb: 4 }}>
          <PerformanceCharts
            dailyData={mockData.daily}
            weeklyData={mockData.weekly}
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Detailed Reports Section */}
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Báo cáo ngày" />
            <Tab label="Báo cáo tuần" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            {mockData.daily.map((store, index) => (
              <DailyBusinessStatus
                key={index}
                storeName={store.storeName}
                currentValue={store.currentValue}
                previousValue={store.previousValue}
                target={store.target}
              />
            ))}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {mockData.weekly.map((store, index) => (
              <WeeklyReport
                key={index}
                storeName={store.storeName}
                currentWeekValue={store.currentWeekValue}
                previousWeekValue={store.previousWeekValue}
                target={store.target}
              />
            ))}
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
};

export default Reports; 