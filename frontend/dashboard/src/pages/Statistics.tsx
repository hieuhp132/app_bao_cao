import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
  SelectChangeEvent,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { format, subMonths } from 'date-fns';

// Mock data - replace with API calls later
const generateMonthlyData = () => {
  const data = [];
  for (let i = 0; i < 12; i++) {
    const date = subMonths(new Date(), i);
    data.unshift({
      name: format(date, 'MMM yyyy'),
      sales: Math.floor(Math.random() * 10000) + 5000,
      orders: Math.floor(Math.random() * 100) + 50,
      users: Math.floor(Math.random() * 200) + 100,
    });
  }
  return data;
};

const monthlyData = generateMonthlyData();

const categoryData = [
  { name: 'Điện tử', value: 35 },
  { name: 'Thời trang', value: 25 },
  { name: 'Nhà cửa & Vườn', value: 20 },
  { name: 'Sách', value: 15 },
  { name: 'Khác', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Statistics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('12m');

  const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    setTimeRange(event.target.value);
  };

  const filteredData = monthlyData.slice(-parseInt(timeRange));

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Thống kê & Phân tích
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Tổng quan phân tích</Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Khoảng thời gian</InputLabel>
              <Select
                value={timeRange}
                label="Khoảng thời gian"
                onChange={handleTimeRangeChange}
              >
                <MenuItem value="3m">3 tháng gần đây</MenuItem>
                <MenuItem value="6m">6 tháng gần đây</MenuItem>
                <MenuItem value="12m">12 tháng gần đây</MenuItem>
                <MenuItem value="24m">24 tháng gần đây</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Tổng doanh số
              </Typography>
              <Typography variant="h4">
                ${filteredData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredData.length} tháng
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Tổng đơn hàng
              </Typography>
              <Typography variant="h4">
                {filteredData.reduce((sum, item) => sum + item.orders, 0).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredData.length} tháng
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Tổng người dùng
              </Typography>
              <Typography variant="h4">
                {filteredData.reduce((sum, item) => sum + item.users, 0).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredData.length} tháng
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Giá trị đơn hàng trung bình
              </Typography>
              <Typography variant="h4">
                $
                {(
                  filteredData.reduce((sum, item) => sum + item.sales, 0) /
                  filteredData.reduce((sum, item) => sum + item.orders, 0)
                ).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredData.length} tháng
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Sales Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Xu hướng doanh số & đơn hàng
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  name="Doanh số ($)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="#82ca9d"
                  name="Đơn hàng"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Category Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Doanh số theo danh mục
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* User Growth */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Tăng trưởng người dùng
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" name="Người dùng mới" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;
