import React, { useState, useEffect } from 'react';

const ProductCatalog = ({ onOrderClick }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Product Catalog</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>₹{product.price}/kg</p>
            <button onClick={() => onOrderClick(product)}>
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
