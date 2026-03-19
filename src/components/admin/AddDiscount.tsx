import React, { useState } from 'react';
import { discountService } from '../../services/discountService';

const AddDiscount: React.FC = () => {
  const [formData, setFormData] = useState({
    discountName: '',
    percentage: '',
    startDate: '',
    EndDate: '',
    active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await discountService.saveDiscount({
        ...formData,
        percentage: parseFloat(formData.percentage),
        LastUpdate: new Date().toISOString()
      });
      setSuccess('Discount added successfully!');
      setFormData({
        discountName: '',
        percentage: '',
        startDate: '',
        EndDate: '',
        active: true,
      });
    } catch (err: any) {
      console.error('ADD DISCOUNT ERROR:', err);
      setError(err.response?.data?.message || 'Failed to add discount');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-card">
      <h2>Add New Discount</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Discount Name</label>
          <input
            type="text"
            name="discountName"
            value={formData.discountName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Percentage (%)</label>
          <input
            type="number"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="EndDate"
              value={formData.EndDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            Active
          </label>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <div className="spinner"></div> : 'Save Discount'}
        </button>
      </form>
    </div>
  );
};

export default AddDiscount;
