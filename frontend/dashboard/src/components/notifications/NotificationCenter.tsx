import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Menu,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Tooltip,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Circle as CircleIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const mockNotifications = [
  {
    id: 1,
    title: "Đơn hàng mới",
    message: "Đơn hàng #12345 đã được tạo",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
  },
  {
    id: 2,
    title: "Cập nhật sản phẩm",
    message: 'Sản phẩm "Laptop Dell XPS 13" đã được cập nhật',
    type: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: 3,
    title: "Cảnh báo bảo mật",
    message: "Đã phát hiện đăng nhập từ thiết bị mới",
    type: "warning",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
  },
  {
    id: 4,
    title: "Lỗi hệ thống",
    message: "Không thể kết nối đến máy chủ báo cáo",
    type: "error",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
  },
];

const NotificationCenter: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = notifications.filter((n) => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAll = () => setNotifications([]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon color="success" />;
      case "error":
        return <ErrorIcon color="error" />;
      case "warning":
        return <WarningIcon color="warning" />;
      case "info":
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

    if (diffMins < 60) return `${diffMins} phút trước`;
    else if (diffHours < 24) return `${diffHours} giờ trước`;
    else return `${diffDays} ngày trước`;
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
        PaperProps={{ sx: { width: 360, maxHeight: 500 } }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
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
          [
            <Box
              key="header"
              sx={{
                px: 2,
                pb: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button size="small" onClick={handleMarkAllAsRead}>
                Đánh dấu tất cả đã đọc
              </Button>
            </Box>,

            <List key="list">
              {notifications
                .slice()
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .map((n) => (
                  <React.Fragment key={n.id}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        bgcolor: n.read ? "transparent" : "action.hover",
                        "&:hover": { bgcolor: "action.selected" },
                        cursor: "pointer",
                      }}
                      onClick={() => handleMarkAsRead(n.id)}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(n.id);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>{getNotificationIcon(n.type)}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="subtitle2">
                              {n.title}
                            </Typography>
                            {!n.read && (
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
                              {n.message}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                            >
                              {formatTimestamp(n.timestamp)}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
            </List>,

            <Box key="footer" sx={{ p: 1, textAlign: "center" }}>
              <Button size="small">Xem tất cả thông báo</Button>
            </Box>,
          ]
        ) : (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Không có thông báo
            </Typography>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default NotificationCenter;
