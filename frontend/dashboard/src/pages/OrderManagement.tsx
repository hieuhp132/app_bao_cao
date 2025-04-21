import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Divider,
  SelectChangeEvent,
} from '@mui/material';
import {
  Search,
  Visibility,
  Edit,
  Delete,
  AttachMoney,
  LocalShipping,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { format } from 'date-fns';

// Mock data - replace with API calls later
const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'Nguyễn Văn A',
    date: new Date('2023-04-15'),
    total: 299.99,
    status: 'Đã giao',
    items: [
      { id: 1, name: 'Sản phẩm 1', quantity: 2, price: 99.99 },
      { id: 2, name: 'Sản phẩm 2', quantity: 1, price: 100.01 },
    ],
  },
  {
    id: 'ORD-002',
    customer: 'Trần Thị B',
    date: new Date('2023-04-16'),
    total: 149.99,
    status: 'Đang xử lý',
    items: [
      { id: 3, name: 'Sản phẩm 3', quantity: 1, price: 149.99 },
    ],
  },
  {
    id: 'ORD-003',
    customer: 'Lê Văn C',
    date: new Date('2023-04-17'),
    total: 499.99,
    status: 'Đã vận chuyển',
    items: [
      { id: 1, name: 'Sản phẩm 1', quantity: 3, price: 299.97 },
      { id: 4, name: 'Sản phẩm 4', quantity: 2, price: 200.02 },
    ],
  },
  {
    id: 'ORD-004',
    customer: 'Phạm Thị D',
    date: new Date('2023-04-18'),
    total: 79.99,
    status: 'Chờ xử lý',
    items: [
      { id: 4, name: 'Sản phẩm 4', quantity: 1, price: 79.99 },
    ],
  },
];

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [formData, setFormData] = useState({
    status: 'Chờ xử lý',
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleStatusFilter = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const filteredOrders = orders.filter(
    (order) =>
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'Tất cả' || order.status === statusFilter)
  );

  const handleOpenDialog = (order: any) => {
    setSelectedOrder(order);
    setFormData({
      status: order.status,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };

  const handleUpdateOrder = () => {
    if (selectedOrder) {
      setOrders(
        orders.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: formData.status }
            : order
        )
      );
    }
    handleCloseDialog();
  };

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã giao':
        return 'success';
      case 'Đã vận chuyển':
        return 'info';
      case 'Đang xử lý':
        return 'warning';
      case 'Chờ xử lý':
        return 'default';
      case 'Đã hủy':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Đã giao':
        return <CheckCircle />;
      case 'Đã vận chuyển':
        return <LocalShipping />;
      case 'Đang xử lý':
        return <Edit />;
      case 'Chờ xử lý':
        return <Search />;
      case 'Đã hủy':
        return <Cancel />;
      default:
        return <Search />;
    }
  };

  const statuses = ['Tất cả', 'Chờ xử lý', 'Đang xử lý', 'Đã vận chuyển', 'Đã giao', 'Đã hủy'];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Quản lý đơn hàng
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tìm kiếm đơn hàng"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={statusFilter}
                label="Trạng thái"
                onChange={handleStatusFilter}
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Ngày</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{format(order.date, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      icon={getStatusIcon(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(order)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
        />
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Cập nhật trạng thái đơn hàng
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Mã đơn hàng: {selectedOrder?.id}
              </Typography>
              <Typography variant="subtitle1">
                Khách hàng: {selectedOrder?.customer}
              </Typography>
              <Typography variant="subtitle1">
                Ngày: {selectedOrder && format(selectedOrder.date, 'dd/MM/yyyy')}
              </Typography>
              <Typography variant="subtitle1">
                Tổng tiền: ${selectedOrder?.total.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  label="Trạng thái"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Chờ xử lý">Chờ xử lý</MenuItem>
                  <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>
                  <MenuItem value="Đã vận chuyển">Đã vận chuyển</MenuItem>
                  <MenuItem value="Đã giao">Đã giao</MenuItem>
                  <MenuItem value="Đã hủy">Đã hủy</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleUpdateOrder} variant="contained" color="primary">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderManagement;
