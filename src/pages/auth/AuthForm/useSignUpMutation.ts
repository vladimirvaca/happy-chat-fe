import { SignUpFormData } from '@pages/auth/types/types.ts';
import UserServices from '@services/UserServices.ts';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { RefObject } from 'react';

interface UseSignUpMutationProps {
  toast: RefObject<Toast>;
  setActiveIndexTab: (index: number) => void;
}

const useSignUpMutation = ({ toast, setActiveIndexTab }: UseSignUpMutationProps
  ) => {
    return useMutation({
      mutationFn: (signUpFormData: SignUpFormData) => UserServices.signUp(signUpFormData),
      onSuccess: () => {
        toast.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'User created successfully.',
          life: 5000
        });
        toast.current?.show({ severity: 'info', summary: 'Login', detail: 'Please login!', life: 5000 });
        setActiveIndexTab(0);
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
  }
;

export default useSignUpMutation;
