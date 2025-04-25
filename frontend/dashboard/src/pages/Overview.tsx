import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, Card, CardContent } from "@mui/material";
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
} from "recharts";
import {
  People,
  ShoppingCart,
  AttachMoney,
  TrendingUp,
} from "@mui/icons-material";
import axios from "axios";

// Mock data - replace with real data later

const userData = [
  { name: "Th1", users: 100 },
  { name: "Th2", users: 150 },
  { name: "Th3", users: 200 },
  { name: "Th4", users: 250 },
  { name: "Th5", users: 300 },
  { name: "Th6", users: 350 },
];

const StatCard = ({ title, value, icon, color }: any) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        {icon}
        <Typography variant="h6" component="div" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ color }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const Overview: React.FC = () => {
  const [salesData, setSalesData] = useState([]);
  useEffect(() => {
    const fetched = async () => {
      try {
        const response = await axios.get("http://localhost:8082/7-days");
        setSalesData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetched();
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Tổng quan
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tổng người dùng"
            value="1,234"
            icon={<People sx={{ color: "primary.main" }} />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tổng đơn hàng"
            value="456"
            icon={<ShoppingCart sx={{ color: "secondary.main" }} />}
            color="secondary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Doanh thu"
            value="$12,345"
            icon={<AttachMoney sx={{ color: "success.main" }} />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tăng trưởng"
            value="+23%"
            icon={<TrendingUp sx={{ color: "info.main" }} />}
            color="info.main"
          />
        </Grid>

        {/* Charts */}
        <Grid item>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Tổng quan doanh số
            </Typography>
            <BarChart width={700} height={300} data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="orderDate" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="priceSummary" fill="#8884d8" name="Doanh số" />
            </BarChart>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Tăng trưởng người dùng
            </Typography>
            <LineChart width={500} height={300} data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#82ca9d"
                name="Người dùng"
              />
            </LineChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
