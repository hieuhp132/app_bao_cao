import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Divider,
  Avatar,
  Typography,
} from '@mui/material';
import {
  Dashboard,
  People,
  ShoppingCart,
  Assessment,
  Settings,
  Feedback,
  Description,
  BarChart,
  Security,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Tổng quan', icon: <Dashboard />, path: '/' },
  { text: 'Quản lý người dùng', icon: <People />, path: '/users' },
  { text: 'Quản lý sản phẩm', icon: <ShoppingCart />, path: '/products' },
  { text: 'Quản lý đơn hàng', icon: <Description />, path: '/orders' },
  { text: 'Thống kê', icon: <Assessment />, path: '/statistics' },
  { text: 'Báo cáo tùy chỉnh', icon: <BarChart />, path: '/reports' },
  { text: 'Quản lý quyền', icon: <Security />, path: '/permissions' },
  { text: 'Phản hồi & Hỗ trợ', icon: <Feedback />, path: '/feedback' },
  { text: 'Cài đặt', icon: <Settings />, path: '/settings' },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 8 }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
          <Avatar sx={{ mr: 2 }}>A</Avatar>
          <Box>
            <Typography variant="subtitle1">Admin User</Typography>
            <Typography variant="body2" color="textSecondary">admin@example.com</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 1 }} />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 