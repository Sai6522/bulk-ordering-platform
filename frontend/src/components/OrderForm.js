import React, { useState } from 'react';

const OrderForm = ({ selectedProduct, onBack }) => {
  const [formData, setFormData] = useState({
    product_name: selectedProduct?.name || '',
    quantity: '',
    buyer_name: '',
    delivery_address: ''
  });
  const [message, setMessage] = useState('');
  const [orderId, setOrderId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (response.ok) {
        setOrderId(data.order_id);
        setMessage(`Order placed successfully! Your Order ID is: ${data.order_id}`);
        setFormData({ product_name: '', quantity: '', buyer_name: '', delivery_address: '' });
      } else {
        setMessage('Error placing order');
      }
    } catch (error) {
      setMessage('Error placing order');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Place Order</h2>
        {message && (
          <div className={orderId ? 'success-message' : 'error-message'}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product:</label>
            <input
              type="text"
              value={formData.product_name}
              onChange={(e) => setFormData({...formData, product_name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Quantity (kg):</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              required
              min="1"
            />
          </div>
          <div className="form-group">
            <label>Buyer Name:</label>
            <input
              type="text"
              value={formData.buyer_name}
              onChange={(e) => setFormData({...formData, buyer_name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Delivery Address:</label>
            <textarea
              value={formData.delivery_address}
              onChange={(e) => setFormData({...formData, delivery_address: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Place Order</button>
          <button type="button" className="btn-secondary" onClick={onBack}>
            Back to Products
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
