import { SignUpFormData } from '@pages/auth/types/types.ts';
import ApiConfig from '@services/ApiConfig.ts';
import { BASE_URL } from '@services/constants.ts';

export default {
  async signUp(signUpFormData: SignUpFormData): Promise<void> {
    const response = await ApiConfig().post(`${BASE_URL}/user/create`, signUpFormData);
    return response.data;
  }
};
