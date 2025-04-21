import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { clearNotifications } from '../store/slices/uiSlice';

interface NotificationProps {
  open: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  open,
  message,
  type,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
        <AlertTitle>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export const NotificationContainer: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.ui.notifications);

  const handleClose = (id: string) => {
    dispatch(clearNotifications());
  };

  if (notifications.length === 0) return null;

  const latestNotification = notifications[notifications.length - 1];

  return (
    <Notification
      open={true}
      message={latestNotification.message}
      type={latestNotification.type}
      onClose={() => handleClose(latestNotification.id)}
    />
  );
};

export default Notification; 