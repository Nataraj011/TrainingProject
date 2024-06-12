
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const ViewallProductsMgr = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch all products
  const getAllProducts = async () => {
    try {
      const response = await UserService.getallmgr();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products');
    }
  };

  useEffect(() => {
    // Fetch all products when component mounts
    getAllProducts();
  }, []);

  return (
    <div className="container">
      <h2 className="mt-4">All Products</h2>
      {error && <p className="mt-4 text-danger">Error: {error}</p>}
      <div>
        {products.map(product => (
          <div key={product.id}>
            <h3>Product: {product.name}</h3>
            {product.features.map(feature => (
              <div key={feature.id}>
                <h4>Feature: {feature.name}</h4>
                <ul>
                  {feature.parameters.map(parameter => (
                    <li key={parameter.id}>
                      {parameter.name}: {parameter.value} ({parameter.type})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewallProductsMgr;
