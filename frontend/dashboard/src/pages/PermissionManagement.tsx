import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Grid,
  SelectChangeEvent,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Mock data for permissions
const initialPermissions = [
  {
    id: 1,
    role: 'Admin',
    permissions: ['Quản lý người dùng', 'Quản lý sản phẩm', 'Quản lý đơn hàng', 'Xem báo cáo', 'Quản lý quyền'],
    description: 'Quyền truy cập đầy đủ cho quản trị viên',
  },
  {
    id: 2,
    role: 'Manager',
    permissions: ['Quản lý sản phẩm', 'Quản lý đơn hàng', 'Xem báo cáo'],
    description: 'Quyền truy cập cho quản lý',
  },
  {
    id: 3,
    role: 'Staff',
    permissions: ['Xem sản phẩm', 'Xem đơn hàng'],
    description: 'Quyền truy cập cơ bản cho nhân viên',
  },
];

// Available permissions
const availablePermissions = [
  'Quản lý người dùng',
  'Quản lý sản phẩm',
  'Quản lý đơn hàng',
  'Xem báo cáo',
  'Quản lý quyền',
  'Xem sản phẩm',
  'Xem đơn hàng',
];

const PermissionManagement: React.FC = () => {
  const [permissions, setPermissions] = useState(initialPermissions);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPermission, setEditingPermission] = useState<any>(null);
  const [formData, setFormData] = useState({
    role: '',
    permissions: [] as string[],
    description: '',
  });

  const handleOpenDialog = (permission?: any) => {
    if (permission) {
      setEditingPermission(permission);
      setFormData({
        role: permission.role,
        permissions: permission.permissions,
        description: permission.description,
      });
    } else {
      setEditingPermission(null);
      setFormData({
        role: '',
        permissions: [],
        description: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPermission(null);
    setFormData({
      role: '',
      permissions: [],
      description: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePermissionChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      permissions: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSubmit = () => {
    if (editingPermission) {
      // Update existing permission
      setPermissions(
        permissions.map((p) =>
          p.id === editingPermission.id
            ? {
                ...p,
                role: formData.role,
                permissions: formData.permissions,
                description: formData.description,
              }
            : p
        )
      );
    } else {
      // Add new permission
      const newPermission = {
        id: permissions.length + 1,
        role: formData.role,
        permissions: formData.permissions,
        description: formData.description,
      };
      setPermissions([...permissions, newPermission]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setPermissions(permissions.filter((p) => p.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Quản lý quyền</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Thêm quyền
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vai trò</TableCell>
              <TableCell>Quyền</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>{permission.role}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {permission.permissions.map((p) => (
                      <Chip key={p} label={p} size="small" />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>{permission.description}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Sửa">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(permission)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xóa">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(permission.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingPermission ? 'Chỉnh sửa quyền' : 'Thêm quyền mới'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Vai trò"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Quyền</InputLabel>
                <Select
                  multiple
                  value={formData.permissions}
                  onChange={handlePermissionChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {availablePermissions.map((permission) => (
                    <MenuItem key={permission} value={permission}>
                      {permission}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả"
                name="description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingPermission ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PermissionManagement; 