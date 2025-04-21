import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store';
import { theme } from './theme';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/layout/Layout';
import Overview from './pages/Overview';
import UserManagement from './pages/UserManagement';
import ProductManagement from './pages/ProductManagement';
import OrderManagement from './pages/OrderManagement';
import Statistics from './pages/Statistics';
import FeedbackSupport from './pages/FeedbackSupport';
import CustomReports from './pages/CustomReports';
import Login from './pages/Login';
import PermissionManagement from './pages/PermissionManagement';
import UserProfile from './pages/UserProfile';

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Overview />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <UserManagement />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <ProductManagement />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <OrderManagement />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/statistics"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Statistics />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/reports"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <CustomReports />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/permissions"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <PermissionManagement />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <UserProfile />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/feedback"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <FeedbackSupport />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <div>Settings Page</div>
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Router>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
