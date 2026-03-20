import React, { useState, useEffect } from 'react';
import { discountService } from '../../services/discountService';

const ManageDiscounts: React.FC = () => {
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    discountName: '',
    percentage: '',
    startDate: '',
    EndDate: '',
    active: true,
  });

  const fetchDiscounts = async () => {
    setLoading(true);
    try {
      const response = await discountService.findAllDiscounts(searchText, page, 10);
      setDiscounts(response?.data?.list || []);
      setTotalPages(Math.ceil((response?.data?.discountListCount || 0) / 10));
    } catch (err: any) {
      console.error('FETCH DISCOUNTS ERROR:', err);
      setError(err.response?.data?.message || 'Failed to fetch discounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, [page, searchText]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this discount?')) {
      try {
        await discountService.deleteDiscount(id);
        fetchDiscounts();
      } catch (err) {
        alert('Failed to delete discount');
      }
    }
  };

  const openEditModal = (discount: any) => {
    setEditingDiscount(discount);
    setEditFormData({
      discountName: discount.discountName,
      percentage: discount.percentage.toString(),
      startDate: discount.startDate ? new Date(discount.startDate).toISOString().split('T')[0] : '',
      EndDate: discount.EndDate ? new Date(discount.EndDate).toISOString().split('T')[0] : '',
      active: discount.active,
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setEditFormData({ 
      ...editFormData, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await discountService.updateDiscount(editingDiscount._id, {
        ...editFormData,
        percentage: parseFloat(editFormData.percentage),
        LastUpdate: new Date().toISOString()
      });
      setIsEditModalOpen(false);
      fetchDiscounts();
    } catch (err) {
      alert('Failed to update discount');
    }
  };

  return (
    <div className="product-management-container">
      <div className="table-header">
        <h1>Manage Discounts</h1>
        <input
          type="text"
          placeholder="Search discounts..."
          className="search-bar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {loading && <div className="loading">Loading discounts...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="product-table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Percentage</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount._id}>
                <td>{discount.discountName}</td>
                <td>{discount.percentage}%</td>
                <td>{discount.startDate ? new Date(discount.startDate).toLocaleDateString() : 'N/A'}</td>
                <td>{discount.EndDate ? new Date(discount.EndDate).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <span className={`status-badge ${discount.active ? 'active' : 'inactive'}`}>
                    {discount.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button className="action-btn btn-edit" onClick={() => openEditModal(discount)}>Edit</button>
                  <button className="action-btn btn-delete" onClick={() => handleDelete(discount._id)}>Delete</button>
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
            <h2>Edit Discount</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Discount Name</label>
                <input
                  type="text"
                  name="discountName"
                  value={editFormData.discountName}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Percentage (%)</label>
                <input
                  type="number"
                  name="percentage"
                  value={editFormData.percentage}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={editFormData.startDate}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="EndDate"
                    value={editFormData.EndDate}
                    onChange={handleEditChange}
                  />
                </div>
              </div>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="active"
                    checked={editFormData.active}
                    onChange={handleEditChange}
                  />
                  Active
                </label>
              </div>
              <button type="submit" className="btn-primary">Update Discount</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDiscounts;
