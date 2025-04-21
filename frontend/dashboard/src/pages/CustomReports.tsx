import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  SelectChangeEvent,
  Checkbox,
  FormGroup,
  FormControlLabel,
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Download, Save, Print } from '@mui/icons-material';

// Mock data - replace with API calls later
const generateReportData = (type: string, startDate: Date, endDate: Date) => {
  const data = [];
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    if (type === 'sales') {
      data.push({
        name: format(date, 'dd/MM'),
        value: Math.floor(Math.random() * 10000) + 5000,
      });
    } else if (type === 'orders') {
      data.push({
        name: format(date, 'dd/MM'),
        value: Math.floor(Math.random() * 100) + 50,
      });
    } else if (type === 'users') {
      data.push({
        name: format(date, 'dd/MM'),
        value: Math.floor(Math.random() * 200) + 100,
      });
    }
  }
  
  return data;
};

const categoryData = [
  { name: 'Điện tử', value: 35 },
  { name: 'Thời trang', value: 25 },
  { name: 'Nhà cửa & Vườn', value: 20 },
  { name: 'Sách', value: 15 },
  { name: 'Khác', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const CustomReports: React.FC = () => {
  const [reportType, setReportType] = useState('sales');
  const [startDate, setStartDate] = useState<Date | null>(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [exportFormat, setExportFormat] = useState('pdf');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [reportData, setReportData] = useState<any[]>([]);
  const [showChart, setShowChart] = useState(false);

  const handleReportTypeChange = (event: SelectChangeEvent<string>) => {
    setReportType(event.target.value);
  };

  const handleExportFormatChange = (event: SelectChangeEvent<string>) => {
    setExportFormat(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleGenerateReport = () => {
    if (startDate && endDate) {
      const data = generateReportData(reportType, startDate, endDate);
      setReportData(data);
      setShowChart(true);
    }
  };

  const handleExportReport = () => {
    // In a real application, this would generate and download the report
    alert(`Xuất báo cáo ${reportType} từ ${startDate ? format(startDate, 'dd/MM/yyyy') : ''} đến ${endDate ? format(endDate, 'dd/MM/yyyy') : ''} dưới định dạng ${exportFormat}`);
  };

  const getReportTitle = () => {
    switch (reportType) {
      case 'sales':
        return 'Báo cáo doanh số';
      case 'orders':
        return 'Báo cáo đơn hàng';
      case 'users':
        return 'Báo cáo người dùng';
      default:
        return 'Báo cáo tùy chỉnh';
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Báo cáo tùy chỉnh
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Loại báo cáo</InputLabel>
              <Select
                value={reportType}
                label="Loại báo cáo"
                onChange={handleReportTypeChange}
              >
                <MenuItem value="sales">Doanh số</MenuItem>
                <MenuItem value="orders">Đơn hàng</MenuItem>
                <MenuItem value="users">Người dùng</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Định dạng xuất</InputLabel>
              <Select
                value={exportFormat}
                label="Định dạng xuất"
                onChange={handleExportFormatChange}
              >
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="excel">Excel</MenuItem>
                <MenuItem value="csv">CSV</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
              <DatePicker
                label="Ngày bắt đầu"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                format="dd/MM/yyyy"
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
              <DatePicker
                label="Ngày kết thúc"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                format="dd/MM/yyyy"
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Lọc theo danh mục
            </Typography>
            <FormGroup row>
              {categoryData.map((category) => (
                <FormControlLabel
                  key={category.name}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => handleCategoryChange(category.name)}
                    />
                  }
                  label={category.name}
                />
              ))}
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateReport}
              >
                Tạo báo cáo
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={handleExportReport}
                disabled={!showChart}
              >
                Xuất báo cáo
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {showChart && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            {getReportTitle()}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Khoảng thời gian: {startDate ? format(startDate, 'dd/MM/yyyy') : ''} - {endDate ? format(endDate, 'dd/MM/yyyy') : ''}
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <ResponsiveContainer width="100%" height={400}>
                {reportType === 'sales' || reportType === 'orders' ? (
                  <LineChart data={reportData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      name={reportType === 'sales' ? 'Doanh số' : 'Đơn hàng'}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={reportData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Người dùng mới" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Tổng kết
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body1">
                    Tổng {reportType === 'sales' ? 'doanh số' : reportType === 'orders' ? 'đơn hàng' : 'người dùng'}:{' '}
                    {reportData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                    {reportType === 'sales' ? ' đ' : ''}
                  </Typography>
                  <Typography variant="body1">
                    Trung bình mỗi ngày:{' '}
                    {(reportData.reduce((sum, item) => sum + item.value, 0) / reportData.length).toFixed(2)}
                    {reportType === 'sales' ? ' đ' : ''}
                  </Typography>
                  <Typography variant="body1">
                    Cao nhất: {Math.max(...reportData.map(item => item.value)).toLocaleString()}
                    {reportType === 'sales' ? ' đ' : ''}
                  </Typography>
                  <Typography variant="body1">
                    Thấp nhất: {Math.min(...reportData.map(item => item.value)).toLocaleString()}
                    {reportType === 'sales' ? ' đ' : ''}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default CustomReports; 