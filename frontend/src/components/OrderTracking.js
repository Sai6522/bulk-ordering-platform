import React, { useState } from 'react';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
      const data = await response.json();
      
      if (response.ok) {
        setOrder(data);
        setMessage('');
      } else {
        setOrder(null);
        setMessage('Order not found');
      }
    } catch (error) {
      setOrder(null);
      setMessage('Error tracking order');
    }
  };

  return (
    <div className="container">
      <h2>Track Your Order</h2>
      <div className="form-container">
        <form onSubmit={handleTrack}>
          <div className="form-group">
            <label>Order ID:</label>
            <input
              type="number"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Track Order</button>
        </form>
        
        {message && <div className="error-message">{message}</div>}
        
        {order && (
          <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Product:</strong> {order.product_name}</p>
            <p><strong>Quantity:</strong> {order.quantity} kg</p>
            <p><strong>Buyer:</strong> {order.buyer_name}</p>
            <p><strong>Delivery Address:</strong> {order.delivery_address}</p>
            <p><strong>Status:</strong> 
              <span className={order.status === 'Pending' ? 'status-pending' : 'status-delivered'}>
                {order.status}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
