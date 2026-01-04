import React, { useState } from 'react';
import ProductCatalog from './components/ProductCatalog';
import OrderForm from './components/OrderForm';
import OrderTracking from './components/OrderTracking';
import AdminOrders from './components/AdminOrders';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('catalog');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const renderPage = () => {
    switch(currentPage) {
      case 'catalog':
        return <ProductCatalog onOrderClick={(product) => {
          setSelectedProduct(product);
          setCurrentPage('order');
        }} />;
      case 'order':
        return <OrderForm 
          selectedProduct={selectedProduct} 
          onBack={() => setCurrentPage('catalog')}
        />;
      case 'tracking':
        return <OrderTracking />;
      case 'admin':
        return <AdminOrders />;
      default:
        return <ProductCatalog />;
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>🥬 Bulk Ordering Platform</h1>
        <div>
          <button 
            onClick={() => setCurrentPage('catalog')}
            className={currentPage === 'catalog' ? 'active' : ''}
          >
            Products
          </button>
          <button 
            onClick={() => setCurrentPage('tracking')}
            className={currentPage === 'tracking' ? 'active' : ''}
          >
            Track Order
          </button>
          <button 
            onClick={() => setCurrentPage('admin')}
            className={currentPage === 'admin' ? 'active' : ''}
          >
            Admin
          </button>
        </div>
      </nav>
      {renderPage()}
    </div>
  );
}

export default App;
