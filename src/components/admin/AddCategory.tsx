import React, { useState } from 'react';
import { categoryService } from '../../services/categoryService';

const AddCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState('');
  const [icon, setIcon] = useState('');
  const [availableCountries, setAvailableCountries] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // Split countries by comma and trim whitespace
      const countriesArray = availableCountries.split(',').map(c => c.trim()).filter(c => c !== '');
      
      await categoryService.saveCategory({ 
        categoryName, 
        icon: { iconName: icon }, // Sending as an object as per schema
        availableCountries: countriesArray 
      });
      
      setSuccess('Category added successfully!');
      setCategoryName('');
      setIcon('');
      setAvailableCountries('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-card">
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Ex. Electronics"
            required
          />
        </div>

        <div className="form-group">
          <label>Icon Name/Tag</label>
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="Ex. devices"
            required
          />
        </div>

        <div className="form-group">
          <label>Available Countries (comma separated)</label>
          <input
            type="text"
            value={availableCountries}
            onChange={(e) => setAvailableCountries(e.target.value)}
            placeholder="Ex. USA, Canada, UK"
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <div className="spinner"></div> : 'Save Category'}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
