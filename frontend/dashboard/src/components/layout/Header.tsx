import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem, Avatar } from '@mui/material';
import { AccountCircle, Brightness4, Brightness7, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import NotificationCenter from '../notifications/NotificationCenter';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode?: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode = false }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    // Redirect to login
    navigate('/login');
  };

  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hệ thống quản lý
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={toggleTheme}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <NotificationCenter />
          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>Hồ sơ</MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout fontSize="small" sx={{ mr: 1 }} />
              Đăng xuất
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 