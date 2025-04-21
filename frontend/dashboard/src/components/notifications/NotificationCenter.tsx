import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Chip,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Circle as CircleIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    title: 'Đơn hàng mới',
    message: 'Đơn hàng #12345 đã được tạo',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
  },
  {
    id: 2,
    title: 'Cập nhật sản phẩm',
    message: 'Sản phẩm "Laptop Dell XPS 13" đã được cập nhật',
    type: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
  {
    id: 3,
    title: 'Cảnh báo bảo mật',
    message: 'Đã phát hiện đăng nhập từ thiết bị mới',
    type: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
  },
  {
    id: 4,
    title: 'Lỗi hệ thống',
    message: 'Không thể kết nối đến máy chủ báo cáo',
    type: 'error',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
  },
];

const NotificationCenter: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Calculate unread count
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'info':
      default:
        return <InfoIcon color="info" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} phút trước`;
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else {
      return `${diffDays} ngày trước`;
    }
  };

  return (
    <Box>
      <Tooltip title="Thông báo">
        <IconButton color="inherit" onClick={handleClick}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 360, maxHeight: 500 },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Thông báo</Typography>
          <Box>
            <Tooltip title="Cài đặt thông báo">
              <IconButton size="small">
                <SettingsIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            {notifications.length > 0 && (
              <Tooltip title="Xóa tất cả">
                <IconButton size="small" onClick={handleClearAll}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
        <Divider />
        {notifications.length > 0 ? (
          <>
            <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button size="small" onClick={handleMarkAllAsRead}>
                Đánh dấu tất cả đã đọc
              </Button>
            </Box>
            <List sx={{ p: 0 }}>
              {notifications.map((notification) => (
                <React.Fragment key={notification.id}>
                  <ListItem
                    sx={{
                      bgcolor: notification.read ? 'transparent' : 'action.hover',
                      '&:hover': { bgcolor: 'action.selected' },
                    }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => handleDelete(notification.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      {getNotificationIcon(notification.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle2" component="span">
                            {notification.title}
                          </Typography>
                          {!notification.read && (
                            <CircleIcon
                              color="primary"
                              sx={{ fontSize: 10, ml: 1 }}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            {notification.message}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="textSecondary"
                            display="block"
                          >
                            {formatTimestamp(notification.timestamp)}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
              <Button size="small">Xem tất cả thông báo</Button>
            </Box>
          </>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" color="textSecondary">
              Không có thông báo
            </Typography>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default NotificationCenter; 