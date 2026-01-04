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
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.quantity || formData.quantity <= 0) {
      setMessage('Please enter valid quantity');
      setIsProcessing(false);
      setIsSuccess(false);
      return;
    }
    
    setIsProcessing(true);
    setMessage('Processing order...');
    
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (response.ok) {
        setOrderId(data.order_id);
        setIsProcessing(false);
        setIsSuccess(true);
        setMessage(`Order confirmed! Your Order ID: ${data.order_id}`);
        // Reset form but keep product name
        setFormData({ 
          product_name: selectedProduct?.name || '', 
          quantity: '', 
          buyer_name: '', 
          delivery_address: '' 
        });
      } else {
        setIsProcessing(false);
        setIsSuccess(false);
        setMessage(data.error || 'Failed to place order');
      }
    } catch (error) {
      setIsProcessing(false);
      setIsSuccess(false);
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Place Order</h2>
        {message && (
          <div className={
            isSuccess ? 'success-message' : 
            isProcessing ? 'processing-message' : 
            'error-message'
          }>
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
              placeholder="Select a product"
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
              step="0.5"
              placeholder="Enter quantity in kg"
            />
          </div>
          <div className="form-group">
            <label>Your Name:</label>
            <input
              type="text"
              value={formData.buyer_name}
              onChange={(e) => setFormData({...formData, buyer_name: e.target.value})}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label>Delivery Address:</label>
            <textarea
              value={formData.delivery_address}
              onChange={(e) => setFormData({...formData, delivery_address: e.target.value})}
              required
              rows="3"
              placeholder="Enter complete delivery address"
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
