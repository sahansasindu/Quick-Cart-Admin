import React, { useState } from 'react';
import { productService } from '../../services/productService';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categories: any[];
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSuccess, categories }) => {
  const [addFormData, setAddFormData] = useState({
    name: '',
    description: '',
    price: '',
    qty: '',
    category: '',
  });
  const [addImages, setAddImages] = useState<File[]>([]);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');

  if (!isOpen) return null;

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAddFormData({ ...addFormData, [e.target.name]: e.target.value });
  };

  const handleAddFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAddImages(Array.from(e.target.files));
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError('');
    setAddSuccess('');

    const productFormData = new FormData();
    productFormData.append('productName', addFormData.name);
    productFormData.append('description', addFormData.description);
    productFormData.append('actualPrice', addFormData.price);
    productFormData.append('qty', addFormData.qty);
    productFormData.append('categoryId', addFormData.category);
    productFormData.append('oldPrice', '0');
    productFormData.append('discount', '0');

    addImages.forEach((image) => {
      productFormData.append('images', image);
    });

    try {
      await productService.saveProduct(productFormData);
      setAddSuccess('Product added successfully!');
      setAddFormData({ name: '', description: '', price: '', qty: '', category: '' });
      setAddImages([]);
      
      onSuccess();
    } catch (err: any) {
      setAddError(err.response?.data?.message || 'Failed to add product');
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Add New Product</h2>
        <form onSubmit={handleAddSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={addFormData.name}
              onChange={handleAddChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={addFormData.description}
              onChange={handleAddChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={addFormData.price}
                onChange={handleAddChange}
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="qty"
                value={addFormData.qty}
                onChange={handleAddChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={addFormData.category}
              onChange={handleAddChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id || cat.categoryName} value={cat.categoryName}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Product Images (Max 5)</label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleAddFileChange}
            />
            <small>Selected: {addImages.length} files</small>
          </div>
          {addError && <div className="error-message" style={{ marginBottom: '10px' }}>{addError}</div>}
          {addSuccess && <div className="success-message" style={{ marginBottom: '10px' }}>{addSuccess}</div>}
          <button type="submit" className="btn-primary" disabled={addLoading}>
            {addLoading ? 'Saving...' : 'Save Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
