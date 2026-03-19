import api from './api';

export const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post('user-service/api/v1/users/login', { username, password });
    return response.data;
  },

  register: async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await api.post('user-service/api/v1/users/signup', {
      email,
      password,
      firstName,
      lastName,
      createdDate: new Date().toISOString(),
    });
    return response.data;
  },

  verifyEmail: async (email: string, otp: string) => {
    const response = await api.post('user-service/api/v1/users/verify-email', null, { params: { email, otp } });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post('user-service/api/v1/users/forgot-password-request-code', null, { params: { email } });
    return response.data;
  },

  verifyResetCode: async (email: string, otp: string) => {
    const response = await api.post('user-service/api/v1/users/verify-reset', null, { params: { email, otp } });
    return response.data;
  },

  resetPassword: async (email: string, code: string, password: any) => {
    const response = await api.post('user-service/api/v1/users/reset-password', { email, code, password });
    return response.data;
  },

  resendOtp: async (email: string) => {
    const response = await api.post('user-service/api/v1/users/resend', null, { params: { email } });
    return response.data;
  }
};
