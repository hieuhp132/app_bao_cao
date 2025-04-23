import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

interface ChartData {
  storeName: string;
  currentValue: number;
  previousValue: number;
  target: number;
}

interface WeeklyChartData {
  storeName: string;
  currentWeekValue: number;
  previousWeekValue: number;
  target: number;
}

interface PerformanceChartsProps {
  dailyData: ChartData[];
  weeklyData: WeeklyChartData[];
}

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ dailyData, weeklyData }) => {
  // Format data for daily comparison chart
  const dailyChartData = dailyData.map(store => ({
    name: store.storeName,
    'Giá trị hiện tại': store.currentValue,
    'Giá trị trước': store.previousValue,
    'Mục tiêu': store.target,
  }));

  // Format data for weekly comparison chart
  const weeklyChartData = weeklyData.map(store => ({
    name: store.storeName,
    'Tuần này': store.currentWeekValue,
    'Tuần trước': store.previousWeekValue,
    'Mục tiêu': store.target,
  }));

  return (
    <Grid container spacing={3}>
      {/* Daily Performance Chart */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              So sánh doanh số ngày
            </Typography>
            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart
                  data={dailyChartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Giá trị hiện tại" fill="#4caf50" />
                  <Bar dataKey="Giá trị trước" fill="#9e9e9e" />
                  <Bar dataKey="Mục tiêu" fill="#f44336" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Weekly Performance Chart */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              So sánh doanh số tuần
            </Typography>
            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart
                  data={weeklyChartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Tuần này"
                    stroke="#4caf50"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Tuần trước"
                    stroke="#9e9e9e"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Mục tiêu"
                    stroke="#f44336"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Performance Summary Chart */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Tổng quan hiệu suất
            </Typography>
            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart
                  data={dailyData.map(store => ({
                    name: store.storeName,
                    'Hiệu suất (%)': ((store.currentValue / store.target) * 100).toFixed(1),
                  }))}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Hiệu suất (%)"
                    fill="#2196f3"
                    background={{ fill: '#eee' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PerformanceCharts; 