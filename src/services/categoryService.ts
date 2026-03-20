import api from './api';

export const categoryService = {
  findAllCategories: async (searchText?: string, page: number = 1, size: number = 10) => {
    const response = await api.get('product-service-api/api/v1/categories/find-all-categories', {
      params: { searchText, page, size }
    });
    return response.data;
  },

  findCategoryById: async (id: string) => {
    const response = await api.get(`product-service-api/api/v1/categories/find-category-by-id/${id}`);
    return response.data;
  },

  saveCategory: async (categoryData: { categoryName: string; icon: any; availableCountries: string[] }) => {
    const response = await api.post('product-service-api/api/v1/categories/create-category', categoryData);
    return response.data;
  },

  updateCategory: async (id: string, categoryName: string) => {
    const response = await api.put(`product-service-api/api/v1/categories/update-category/${id}`, { categoryName });
    return response.data;
  },

  deleteCategory: async (id: string) => {
    const response = await api.delete(`product-service-api/api/v1/categories/delete-category/${id}`);
    return response.data;
  }
};
