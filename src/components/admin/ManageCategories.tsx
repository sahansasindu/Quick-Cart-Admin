import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';

const ManageCategories: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryService.findAllCategories(searchText, page, 10);
      setCategories(response?.data?.list || []);
      setTotalPages(Math.ceil((response?.data?.categoryListCount || 0) / 10));
    } catch (err: any) {
      console.error('FETCH CATEGORIES ERROR:', err);
      setError(err.response?.data?.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, searchText]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.deleteCategory(id);
        fetchCategories();
      } catch (err) {
        alert('Failed to delete category');
      }
    }
  };

  const openEditModal = (category: any) => {
    setEditingCategory(category);
    setEditCategoryName(category.categoryName);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await categoryService.updateCategory(editingCategory._id, editCategoryName);
      setIsEditModalOpen(false);
      fetchCategories();
    } catch (err) {
      alert('Failed to update category');
    }
  };

  return (
    <div className="product-management-container">
      <div className="table-header">
        <h1>Manage Categories</h1>
        <input
          type="text"
          placeholder="Search categories..."
          className="search-bar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {loading && <div className="loading">Loading categories...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="product-table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td>{cat.categoryName}</td>
                <td>
                  <button className="action-btn btn-edit" onClick={() => openEditModal(cat)}>Edit</button>
                  <button className="action-btn btn-delete" onClick={() => handleDelete(cat._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`page-btn ${page === i + 1 ? 'active' : ''}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setIsEditModalOpen(false)}>&times;</button>
            <h2>Edit Category</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Update Category</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
