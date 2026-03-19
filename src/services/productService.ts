import api from './api';

export const productService = {
  findAllProducts: async (searchText?: string, page: number = 1, size: number = 10) => {
    const response = await api.get('product-service-api/api/v1/product/find-all-product', {
      params: { searchText, page, size }
    });
    return response.data;
  },

  findProductById: async (id: string) => {
    const response = await api.get(`product-service-api/api/v1/product/find-product-by-id/${id}`);
    return response.data;
  },

  saveProduct: async (productData: any) => {
    const response = await api.post('product-service-api/api/v1/product/create-product', productData);
    return response.data;
  },

  updateProduct: async (id: string, productData: any) => {
    const response = await api.put(`product-service-api/api/v1/product/update-product/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await api.delete(`product-service-api/api/v1/product/delete-product/${id}`);
    return response.data;
  }
};
