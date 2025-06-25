// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../componants/Styles/Dashboard.css';

function ProductModal({ product = {}, onClose, onSave }) {
  const safe = product || {};
  const [form, setForm] = useState({
    name: safe.name || '',
    quantity: safe.quantity || 0,
    price: safe.price || 0,
    category: safe.category || '',
    _id: safe._id || null,
  });

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{form._id ? 'Edit' : 'Add'} Product</h2>
        <form onSubmit={handleSubmit}>
          {['name', 'quantity', 'price', 'category'].map(field => (
            <div key={field} className="modal-field">
              <label>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
                <input
                  type={field === 'name' || field === 'category' ? 'text' : 'number'}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          ))}
          <div className="modal-actions">
            <button type="submit">{form._id ? 'Update' : 'Add'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [modalData, setModalData] = useState({ open: false, product: {} });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      const data = res.data;
      setProducts(Array.isArray(data) ? data : (data.products || []));
    } catch {
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const saveProduct = async prod => {
    try {
      if (prod._id) await axios.put(`/api/products/${prod._id}`, prod);
      else await axios.post('/api/products/create', prod);
      setModalData({ open: false, product: {} });
      fetchProducts();
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const deleteProduct = async id => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="dashboard">
      <h1>Product Dashboard</h1>
      <button onClick={() => setModalData({ open: true, product: {} })}>
        ➕ Add Product
      </button>

      <table className="responsive-table">
        <thead>
          <tr>
            <th>Name</th><th>Qty</th><th>Price</th><th>Category</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(p => (
              <tr key={p._id}>
                <td data-title="Name">{p.name}</td>
                <td data-title="Qty">{p.quantity}</td>
                <td data-title="Price">{p.price}</td>
                <td data-title="Category">{p.category}</td>
                <td data-title="Actions">
                  <button onClick={() => setModalData({ open: true, product: p })}>✏️</button>
                  <button onClick={() => deleteProduct(p._id)}>❌</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5" style={{ textAlign: 'center' }}>No products found</td></tr>
          )}
        </tbody>
      </table>

      {modalData.open && (
        <ProductModal
          product={modalData.product}
          onClose={() => setModalData({ open: false, product: {} })}
          onSave={saveProduct}
        />
      )}
    </div>
  );
}
