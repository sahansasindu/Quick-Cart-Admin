import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const authApi = axios.create({
  baseURL: `${API_BASE_URL}user-service/api/v1/users/`,
});

export const authService = {
  login: async (username: string, password: string) => {
    const response = await authApi.post('login', { username, password });
    return response.data;
  },

  register: async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await authApi.post('signup', {
      email,
      password,
      firstName,
      lastName,
      createdDate: new Date().toISOString(),
    });
    return response.data;
  },

  verifyEmail: async (email: string, otp: string) => {
    const response = await authApi.post('verify-email', null, { params: { email, otp } });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await authApi.post('forgot-password-request-code', null, { params: { email } });
    return response.data;
  },

  verifyResetCode: async (email: string, otp: string) => {
    const response = await authApi.post('verify-reset', null, { params: { email, otp } });
    return response.data;
  },

  resetPassword: async (email: string, code: string, password: any) => {
    const response = await authApi.post('reset-password', { email, code, password });
    return response.data;
  },

  resendOtp: async (email: string) => {
    const response = await authApi.post('resend', null, { params: { email } });
    return response.data;
  }
};
