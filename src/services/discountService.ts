import api from './api';

export const discountService = {
  findAllDiscounts: async (searchText?: string, page: number = 1, size: number = 10) => {
    const response = await api.get('product-service-api/api/v1/discount/find-all-discount', {
      params: { searchText, page, size }
    });
    return response.data;
  },

  findDiscountById: async (id: string) => {
    const response = await api.get(`product-service-api/api/v1/discount/find-discount-by-id/${id}`);
    return response.data;
  },

  saveDiscount: async (discountData: any) => {
    const response = await api.post('product-service-api/api/v1/discount/create-discount', discountData);
    return response.data;
  },

  updateDiscount: async (id: string, discountData: any) => {
    const response = await api.put(`product-service-api/api/v1/discount/update-discount/${id}`, discountData);
    return response.data;
  },

  deleteDiscount: async (id: string) => {
    const response = await api.delete(`product-service-api/api/v1/discount/delete-discount/${id}`);
    return response.data;
  }
};
