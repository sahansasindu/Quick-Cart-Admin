import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    productName: '',
    description: '',
    actualPrice: '',
    qty: '',
    categoryId: '',
  });
  const [editImages, setEditImages] = useState<File[]>([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.findAllProducts(searchText, page, 10);
      setProducts(response.data.list);
      setTotalPages(Math.ceil(response.data.productListCount / 10));
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, searchText]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.findAllCategories();
        setCategories(response?.data?.list || []);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        fetchProducts();
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setEditFormData({
      productName: product.productName,
      description: product.description,
      actualPrice: product.actualPrice.toString(),
      qty: product.qty.toString(),
      categoryId: product.categoryId,
    });
    setEditImages([]);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEditImages(Array.from(e.target.files));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', editFormData.productName);
    formData.append('description', editFormData.description);
    formData.append('actualPrice', editFormData.actualPrice);
    formData.append('qty', editFormData.qty);
    formData.append('categoryId', editFormData.categoryId);

    editImages.forEach((image) => {
      formData.append('images', image);
    });

    try {
      await productService.updateProduct(editingProduct._id, formData);
      setIsEditModalOpen(false);
      fetchProducts();
    } catch (err) {
      alert('Failed to update product');
    }
  };

  return (
    <div className="product-management-container">
      <div className="table-header">
        <h1>Manage Products</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {loading && <div className="loading">Loading products...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="product-table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.images && product.images.length > 0 ? `http://localhost:9091${product.images[0]}` : 'https://via.placeholder.com/40'}
                    alt={product.productName}
                    className="product-image-sm"
                  />
                </td>
                <td>{product.productName}</td>
                <td>{product.categoryId}</td>
                <td>${product.actualPrice}</td>
                <td>{product.qty}</td>
                <td>
                  <button className="action-btn btn-edit" onClick={() => openEditModal(product)}>Edit</button>
                  <button className="action-btn btn-delete" onClick={() => handleDelete(product._id)}>Delete</button>
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
            <h2>Edit Product</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={editFormData.productName}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    name="actualPrice"
                    value={editFormData.actualPrice}
                    onChange={handleEditChange}
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="qty"
                    value={editFormData.qty}
                    onChange={handleEditChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  name="categoryId"
                  value={editFormData.categoryId}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.categoryName}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Update Images (Optional)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleEditFileChange}
                />
              </div>
              <button type="submit" className="btn-primary">Update Product</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
