import { LoginFormData, LoginResponse } from '../pages/auth/types/types.ts';
import ApiConfig from './ApiConfig.ts';

export default {
  async login(loginFormData: LoginFormData): Promise<LoginResponse> {
    const response = await ApiConfig().post('/api/v1/auth/login', loginFormData);
    return response.data;
  }
};
