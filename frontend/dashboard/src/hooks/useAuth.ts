import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { loginStart, loginSuccess, loginFailure, logout } from '../store/slices/authSlice';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (email: string, password: string) => {
    try {
      dispatch(loginStart());
      const response = await authAPI.login({ email, password });
      dispatch(loginSuccess(response.data.data));
      navigate('/');
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout: handleLogout,
  };
}; 