import React, { useState } from 'react';
import { discountService } from '../../services/discountService';

interface AddDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddDiscountModal: React.FC<AddDiscountModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [addFormData, setAddFormData] = useState({
    discountName: '',
    percentage: '',
    startDate: '',
    EndDate: '',
    active: true,
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');

  if (!isOpen) return null;

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setAddFormData({ 
      ...addFormData, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError('');
    setAddSuccess('');
    try {
      await discountService.saveDiscount({
        ...addFormData,
        percentage: parseFloat(addFormData.percentage),
        LastUpdate: new Date().toISOString()
      });
      setAddSuccess('Discount added successfully!');
      setAddFormData({
        discountName: '',
        percentage: '',
        startDate: '',
        EndDate: '',
        active: true,
      });
      onSuccess();
    } catch (err: any) {
      setAddError(err.response?.data?.message || 'Failed to add discount');
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Add New Discount</h2>
        <form onSubmit={handleAddSubmit}>
          <div className="form-group">
            <label>Discount Name</label>
            <input
              type="text"
              name="discountName"
              value={addFormData.discountName}
              onChange={handleAddChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Percentage (%)</label>
            <input
              type="number"
              name="percentage"
              value={addFormData.percentage}
              onChange={handleAddChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={addFormData.startDate}
                onChange={handleAddChange}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="EndDate"
                value={addFormData.EndDate}
                onChange={handleAddChange}
              />
            </div>
          </div>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="active"
                checked={addFormData.active}
                onChange={handleAddChange}
              />
              Active
            </label>
          </div>
          {addError && <div className="error-message" style={{ marginBottom: '10px' }}>{addError}</div>}
          {addSuccess && <div className="success-message" style={{ marginBottom: '10px' }}>{addSuccess}</div>}
          <button type="submit" className="btn-primary" disabled={addLoading}>
            {addLoading ? 'Saving...' : 'Save Discount'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDiscountModal;
