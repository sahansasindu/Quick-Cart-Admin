import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';
import AddCategoryModal from './AddCategoryModal';
import Button from '../ui/Button';
import SearchBar from '../ui/SearchBar';
import Table from '../ui/Table';

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

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
        <div className="table-actions">
          <SearchBar
            placeholder="Search categories..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>Add Category</Button>
        </div>
      </div>

      {loading && <div className="loading">Loading categories...</div>}
      {error && <div className="error-message">{error}</div>}

      <Table headers={['Category Name', 'Actions']}>
        {categories.map((cat) => (
          <tr key={cat._id}>
            <td>{cat.categoryName}</td>
            <td>
              <Button variant="edit" onClick={() => openEditModal(cat)}>Edit</Button>
              <Button variant="delete" onClick={() => handleDelete(cat._id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </Table>

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

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          setIsAddModalOpen(false);
          fetchCategories();
        }}
      />
    </div>
  );
};

export default ManageCategories;
