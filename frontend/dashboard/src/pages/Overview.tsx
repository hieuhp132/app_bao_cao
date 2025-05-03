import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  DialogActions,
  CircularProgress,
} from "@mui/material";
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
  Add,
} from "@mui/icons-material";
import axios from "axios";
import formatCurrencyWithComma from "../helper/mathhelper";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const apiURL = import.meta.env.VITE_API_URL;

// Interfaces
interface GrowthData {
  year: number;
  total_revenue: number;
  previous_revenue: number | null;
  growth_rate: number | null;
}

interface SalesDataItem {
  orderDate: string;
  priceSummary: number;
  [key: string]: any;
}

interface FormValues {
  orderDate: string;
  productCode: string;
  productName: string;
  quantity: number;
  price: number;
  priceSummary: number;
  category: string;
  city: string;
}

interface FormErrors {
  orderDate: boolean;
  productCode: boolean;
  productName: boolean;
  quantity: boolean;
  price: boolean;
  priceSummary: boolean;
  category: boolean;
  city: boolean;
}

// Constants
const CATEGORIES = ["Thời trang", "Điện tử", "Gia dụng"];

// Optimized Components
const FormInput = React.memo(
  ({
    label,
    name,
    value,
    onChange,
    error,
    helperText,
    type = "text",
    required = false,
    disabled = false,
    InputProps,
    multiline = false,
  }: {
    label: string;
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
    type?: string;
    required?: boolean;
    disabled?: boolean;
    InputProps?: any;
    multiline?: boolean;
  }) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      type={type}
      required={required}
      disabled={disabled}
      InputProps={InputProps}
      multiline={multiline}
    />
  )
);

const StatCard = React.memo(
  ({
    title,
    value,
    icon,
    color,
  }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
  }) => (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {icon}
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ color }}>
          {typeof value === "number" && title.includes("Doanh thu")
            ? formatCurrencyWithComma(value)
            : value}
        </Typography>
      </CardContent>
    </Card>
  )
);

const Overview: React.FC = () => {
  // State
  const [salesData, setSalesData] = useState<SalesDataItem[]>([]);
  const [reportCount, setReportCount] = useState<number>(0);
  const [valueTotal, setValueTotal] = useState<number>(0);
  const [growth, setGrowth] = useState<GrowthData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<FormValues>({
    orderDate: "",
    productCode: "",
    productName: "",
    quantity: 0,
    price: 0,
    priceSummary: 0,
    category: "",
    city: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    orderDate: false,
    productCode: false,
    productName: false,
    quantity: false,
    price: false,
    priceSummary: false,
    category: false,
    city: false,
  });

  // Derived state
  const growthRate = useMemo(
    () => (growth.length > 0 ? growth[growth.length - 1]?.growth_rate : null),
    [growth]
  );

  const yearsAndGrowthRates = useMemo(
    () =>
      growth.map((item) => ({
        year: item.year,
        growth_rate: item.growth_rate,
      })),
    [growth]
  );

  const priceSummary = useMemo(
    () => formValues.price * formValues.quantity,
    [formValues.price, formValues.quantity]
  );

  // Handlers
  const handleOpenDialog = useCallback(() => setOpenDialog(true), []);
  const handleCloseDialog = useCallback(() => {
    setFormValues({
      orderDate: "",
      productCode: "",
      productName: "",
      quantity: 0,
      price: 0,
      priceSummary: 0,
      category: "",
      city: "",
    });

    // Reset errors
    setErrors({
      orderDate: false,
      productCode: false,
      productName: false,
      quantity: false,
      price: false,
      priceSummary: false,
      category: false,
      city: false,
    });
    setOpenDialog(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (!name) return;

      setFormValues((prev) => {
        const numericFields = ["price", "quantity", "priceSummary"];
        const newValue = numericFields.includes(name)
          ? value === ""
            ? 0
            : Number(value)
          : value;

        return {
          ...prev,
          [name]: newValue,
        };
      });
    },
    []
  );

  // const handleDateChange = useCallback((newValue: Dayjs | null) => {
  //   setFormValues((prev) => ({
  //     ...prev,
  //     orderDate: newValue ? newValue.toISOString() : "", // Nếu newValue là null, orderDate sẽ là chuỗi rỗng
  //   }));
  // }, []);

  const handleDateChange = useCallback((newValue: Dayjs | null) => {
    setFormValues((prev) => ({
      ...prev,
      orderDate: newValue ? newValue.format("YYYY-MM-DD") : "", // Định dạng lại thành yyyy-MM-dd
    }));
  }, []);
  const validateForm = useCallback((): boolean => {
    const newErrors = {
      orderDate: !formValues.orderDate,
      productName: !formValues.productName,
      productCode: !formValues.productCode,
      price: formValues.price <= 0,
      priceSummary: priceSummary <= 0,
      quantity: formValues.quantity <= 0,
      category: !formValues.category,
      city: !formValues.city,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  }, [formValues, priceSummary]);

  const handleSave = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      await axios.post(
        `${apiURL}/overview/create`,
        {
          ...formValues,
          priceSummary: priceSummary,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const controller = new AbortController();
      const [salesRes, countRes, valueRes, growthRes] = await Promise.all([
        axios.get(`${apiURL}/overview/7-days`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        }),
        axios.get(`${apiURL}/overview/count-the-products`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        }),
        axios.get(`${apiURL}/overview/value-all-products`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        }),
        axios.get<GrowthData[]>(`${apiURL}/overview/growth`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        }),
      ]);

      setSalesData(salesRes.data);
      setReportCount(countRes.data);
      setValueTotal(valueRes.data);
      setGrowth(growthRes.data);
      handleCloseDialog();
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  }, [formValues, validateForm, handleCloseDialog, priceSummary]);

  // Product Form Dialog
  const ProductFormDialog = useMemo(() => {
    return (
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Thêm số liệu</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormInput
                label="Tên sản phẩm"
                name="productName"
                value={formValues.productName}
                onChange={handleChange}
                error={errors.productName}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                label="Mã đơn"
                name="productCode"
                value={formValues.productCode}
                onChange={handleChange}
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={
                    formValues.orderDate ? dayjs(formValues.orderDate) : null
                  }
                  onChange={(newValue) =>
                    handleDateChange(newValue as Dayjs | null)
                  }
                  disableFuture
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInput
                label="Giá"
                name="price"
                type="number"
                value={formValues.price}
                onChange={handleChange}
                error={errors.price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInput
                label="Số lượng"
                name="quantity"
                type="number"
                value={formValues.quantity}
                onChange={handleChange}
                error={errors.quantity}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={errors.category}>
                <InputLabel>Danh mục *</InputLabel>
                <Select
                  name="category"
                  value={formValues.category}
                  label="Danh mục *"
                  onChange={(e) =>
                    handleChange(e as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  {CATEGORIES.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <Typography variant="caption" color="error">
                    Vui lòng chọn danh mục
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormInput
                label="Tổng giá"
                name="priceSummary"
                type="number"
                value={priceSummary}
                onChange={handleChange}
                error={errors.priceSummary}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
                disabled
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                label="Thành phố"
                name="city"
                value={formValues.city}
                onChange={handleChange}
                error={errors.city}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Lưu"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [
    openDialog,
    handleCloseDialog,
    formValues,
    errors,
    handleChange,
    handleDateChange,
    handleSave,
    loading,
    priceSummary,
  ]);

  // Data fetching
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Bạn chưa đăng nhập!");
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const [salesRes, countRes, valueRes, growthRes] = await Promise.all([
          axios.get(`${apiURL}/overview/7-days`, {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          }),
          axios.get(`${apiURL}/overview/count-the-products`, {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          }),
          axios.get(`${apiURL}/overview/value-all-products`, {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          }),
          axios.get<GrowthData[]>(`${apiURL}/overview/growth`, {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          }),
        ]);

        setSalesData(salesRes.data);
        console.log(salesRes.data);
        setReportCount(countRes.data);
        setValueTotal(valueRes.data);
        setGrowth(growthRes.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();

    return () => controller.abort();
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
            value={reportCount}
            icon={<ShoppingCart sx={{ color: "secondary.main" }} />}
            color="secondary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Doanh thu"
            value={valueTotal}
            icon={<AttachMoney sx={{ color: "success.main" }} />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tăng trưởng"
            value={growthRate !== null ? `${growthRate}%` : "N/A"}
            icon={<TrendingUp sx={{ color: "info.main" }} />}
            color="info.main"
          />
        </Grid>

        {/* Charts */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Tổng quan doanh số
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleOpenDialog}
              >
                Thêm số liệu
              </Button>
            </Box>
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
              Tăng trưởng theo năm
            </Typography>
            <LineChart width={500} height={300} data={yearsAndGrowthRates}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="growth_rate"
                stroke="#82ca9d"
                name="Tỉ lệ tăng trưởng theo năm"
              />
            </LineChart>
          </Paper>
        </Grid>
      </Grid>

      {ProductFormDialog}
    </Box>
  );
};

export default Overview;
