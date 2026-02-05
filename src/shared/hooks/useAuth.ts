import { UserWithoutId } from '@/entities/user';
import { login as loginApi } from '@/shared/api/auth-api';
import { AUTH_MESSAGE } from '@/shared/api/constants';
import { isLoggedIn, removeToken, setToken } from '@/shared/lib/auth-service';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (user: UserWithoutId) => loginApi(user),
    onSuccess: data => {
      setToken(data.token);
      navigate('/users');
    },
    onError: (error: Error) => {
      message.error(error.message || AUTH_MESSAGE.INVALID_CREDENTIAL);
    },
  });

  const login = (credentials: UserWithoutId) => {
    mutation.mutate(credentials);
  };

  const logout = () => {
    removeToken();
    navigate('/login');
  };

  return {
    login,
    logout,
    isAuthenticated: isLoggedIn(),
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
