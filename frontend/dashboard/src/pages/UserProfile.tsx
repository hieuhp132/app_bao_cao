import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  IconButton,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';

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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
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

const UserProfile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data - replace with API call
  const [userData, setUserData] = useState({
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Admin',
    department: 'IT',
    phone: '+84 123 456 789',
    avatar: '',
    joinDate: '2023-01-01',
    lastLogin: '2023-06-15 14:30',
  });

  const [formData, setFormData] = useState({ ...userData });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    systemNotifications: true,
    orderUpdates: true,
    productUpdates: true,
    securityAlerts: true,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...userData });
    setError('');
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data
      setUserData({ ...formData });
      setSuccess('Thông tin cá nhân đã được cập nhật thành công');
      setIsEditing(false);
    } catch (err) {
      setError('Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        avatar: imageUrl,
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Hồ sơ người dùng
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="profile tabs"
          variant="fullWidth"
        >
          <Tab label="Thông tin cá nhân" />
          <Tab label="Cài đặt thông báo" />
          <Tab label="Bảo mật" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={formData.avatar}
                  sx={{ width: 150, height: 150, mb: 2 }}
                />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarChange}
                  disabled={!isEditing}
                />
                <label htmlFor="avatar-upload">
                  <IconButton
                    color="primary"
                    component="span"
                    disabled={!isEditing}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </label>
              </Box>
              <Typography variant="h6">{formData.name}</Typography>
              <Typography color="textSecondary">{formData.role}</Typography>
            </Grid>

            <Grid item xs={12} md={8}>
              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {success}
                </Alert>
              )}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phòng ban"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ngày tham gia"
                    value={formData.joinDate}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Đăng nhập cuối"
                    value={formData.lastLogin}
                    disabled
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                {isEditing ? (
                  <>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={handleCancel}
                      sx={{ mr: 1 }}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                      onClick={handleSave}
                      disabled={loading}
                    >
                      Lưu thay đổi
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                  >
                    Chỉnh sửa
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Cài đặt thông báo
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onChange={handleNotificationChange}
                    name="emailNotifications"
                  />
                }
                label="Thông báo qua email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.systemNotifications}
                    onChange={handleNotificationChange}
                    name="systemNotifications"
                  />
                }
                label="Thông báo hệ thống"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.orderUpdates}
                    onChange={handleNotificationChange}
                    name="orderUpdates"
                  />
                }
                label="Cập nhật đơn hàng"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.productUpdates}
                    onChange={handleNotificationChange}
                    name="productUpdates"
                  />
                }
                label="Cập nhật sản phẩm"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.securityAlerts}
                    onChange={handleNotificationChange}
                    name="securityAlerts"
                  />
                }
                label="Cảnh báo bảo mật"
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary">
              Lưu cài đặt
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Bảo mật
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Thay đổi mật khẩu
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Mật khẩu hiện tại"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Mật khẩu mới"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Xác nhận mật khẩu mới"
                    type="password"
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary">
                  Cập nhật mật khẩu
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Xác thực hai yếu tố
              </Typography>
              <FormControlLabel
                control={<Switch />}
                label="Bật xác thực hai yếu tố"
              />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Khi bật tính năng này, bạn sẽ cần nhập mã xác thực từ ứng dụng xác thực
                hoặc mã được gửi qua SMS mỗi khi đăng nhập.
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Phiên đăng nhập
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Quản lý các thiết bị đã đăng nhập vào tài khoản của bạn.
              </Typography>
              <Button variant="outlined" color="primary">
                Xem phiên đăng nhập
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default UserProfile; 