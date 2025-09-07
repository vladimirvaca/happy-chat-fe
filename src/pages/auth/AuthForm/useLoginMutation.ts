import { LoginFormData, LoginResponse } from '@pages/auth/types/types.ts';
import AuthServices from '@services/AuthServices.ts';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { RefObject } from 'react';
import { useNavigate } from 'react-router';

const useLoginMutation = (toast: RefObject<Toast>) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (loginFormData: LoginFormData) => AuthServices.login(loginFormData),
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('token', data.accessToken);
      navigate('/dashboard');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.current?.show({
          severity: 'warn',
          summary: error?.response?.data.error,
          detail: error?.response?.data.message,
          life: 5000
        });
      } else {
        toast.current?.show({ severity: 'warn', summary: 'Error', detail: error.message, life: 5000 });
      }
    }
  });
};

export default useLoginMutation;
