import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const ViewAllproductsuser = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch all products
  const getAllProducts = async () => {
    try {
      const response = await UserService.getallbyuser();
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
    <div className="container mt-4">
      <h2 className="mb-4">All Products</h2>
      {error && <p className="text-danger"> {error}</p>}
      <div>
        {products.map(product => (
          <div key={product.id} className="card mb-4">
            <div className="card-header">
              <h3 className="card-title">Product: {product.name}</h3>
            </div>
            <div className="card-body">
              {product.features.map(feature => (
                <div key={feature.id} className="mb-3">
                  <h4 className="mb-2">Feature: {feature.name}</h4>
                  <ul className="list-group">
                    {feature.parameters.map(parameter => (
                      <li key={parameter.id} className="list-group-item">
                        {parameter.name}: {parameter.value} ({parameter.type})
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllproductsuser;
