import React, { useState } from 'react';
import { categoryService } from '../../services/categoryService';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newIcon, setNewIcon] = useState('');
  const [newAvailableCountries, setNewAvailableCountries] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');

  if (!isOpen) return null;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError('');
    setAddSuccess('');
    try {
      const countriesArray = newAvailableCountries.split(',').map(c => c.trim()).filter(c => c !== '');
      await categoryService.saveCategory({
        categoryName: newCategoryName,
        icon: { iconName: newIcon },
        availableCountries: countriesArray
      });
      setAddSuccess('Category added successfully!');
      setNewCategoryName('');
      setNewIcon('');
      setNewAvailableCountries('');
      onSuccess();
    } catch (err: any) {
      setAddError(err.response?.data?.message || 'Failed to add category');
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Add New Category</h2>
        <form onSubmit={handleAdd}>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Ex. Electronics"
              required
            />
          </div>
          <div className="form-group">
            <label>Icon Name/Tag</label>
            <input
              type="text"
              value={newIcon}
              onChange={(e) => setNewIcon(e.target.value)}
              placeholder="Ex. devices"
              required
            />
          </div>
          <div className="form-group">
            <label>Available Countries (comma separated)</label>
            <input
              type="text"
              value={newAvailableCountries}
              onChange={(e) => setNewAvailableCountries(e.target.value)}
              placeholder="Ex. USA, Canada, UK"
              required
            />
          </div>
          {addError && <div className="error-message" style={{ marginBottom: '10px' }}>{addError}</div>}
          {addSuccess && <div className="success-message" style={{ marginBottom: '10px' }}>{addSuccess}</div>}
          <button type="submit" className="btn-primary" disabled={addLoading}>
            {addLoading ? 'Saving...' : 'Save Category'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
