import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  read: boolean;
}

interface UiState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
}

const initialState: UiState = {
  theme: 'light',
  sidebarOpen: true,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state: UiState) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleSidebar: (state: UiState) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    addNotification: (state: UiState, action: PayloadAction<Omit<Notification, 'id' | 'read'>>) => {
      state.notifications.push({
        ...action.payload,
        id: Date.now().toString(),
        read: false,
      });
    },
    markNotificationAsRead: (state: UiState, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n: Notification) => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    clearNotifications: (state: UiState) => {
      state.notifications = [];
    },
  },
});

export const {
  toggleTheme,
  toggleSidebar,
  addNotification,
  markNotificationAsRead,
  clearNotifications,
} = uiSlice.actions;
export default uiSlice.reducer; 