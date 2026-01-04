import React, { useState, useEffect } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchOrders(); // Refresh the orders list
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div className="container">
      <h2>Admin - Order Management</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Buyer Name</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Delivery Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.buyer_name}</td>
              <td>{order.product_name}</td>
              <td>{order.quantity} kg</td>
              <td>{order.delivery_address}</td>
              <td>
                <span className={order.status === 'Pending' ? 'status-pending' : 'status-delivered'}>
                  {order.status}
                </span>
              </td>
              <td>
                {order.status === 'Pending' && (
                  <button 
                    onClick={() => updateOrderStatus(order.id, 'Delivered')}
                    className="btn-primary"
                    style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                  >
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
