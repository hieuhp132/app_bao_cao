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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';

// Mock data - replace with API calls later
const mockUsers = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', role: 'Quản trị viên', status: 'Hoạt động' },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', role: 'Người dùng', status: 'Hoạt động' },
  { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', role: 'Biên tập viên', status: 'Không hoạt động' },
  { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com', role: 'Người dùng', status: 'Hoạt động' },
  { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@example.com', role: 'Người dùng', status: 'Hoạt động' },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Người dùng',
    status: 'Hoạt động',
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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (user?: any) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      setSelectedUser(null);
      setFormData({
        name: '',
        email: '',
        role: 'Người dùng',
        status: 'Hoạt động',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? { ...user, ...formData }
            : user
        )
      );
    } else {
      // Add new user
      const newUser = {
        id: users.length + 1,
        ...formData,
      };
      setUsers([...users, newUser]);
    }
    handleCloseDialog();
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Quản lý người dùng
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tìm kiếm người dùng"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
            >
              Thêm người dùng
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={user.status === 'Hoạt động' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(user)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteUser(user.id)}
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
          count={filteredUsers.length}
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
          {selectedUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Vai trò</InputLabel>
                <Select<string>
                  name="role"
                  value={formData.role}
                  label="Vai trò"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Quản trị viên">Quản trị viên</MenuItem>
                  <MenuItem value="Biên tập viên">Biên tập viên</MenuItem>
                  <MenuItem value="Người dùng">Người dùng</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select<string>
                  name="status"
                  value={formData.status}
                  label="Trạng thái"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Hoạt động">Hoạt động</MenuItem>
                  <MenuItem value="Không hoạt động">Không hoạt động</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            {selectedUser ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
