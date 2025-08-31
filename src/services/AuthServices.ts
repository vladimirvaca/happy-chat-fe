import { LoginFormData } from '../pages/auth/types/types.ts';
import ApiConfig from './ApiConfig.ts';

export default {
  async login(loginFormData: LoginFormData) {
    return await ApiConfig().post('/api/v1/auth/login', loginFormData);

  }

};
