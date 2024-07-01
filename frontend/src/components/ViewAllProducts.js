import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import UserService from "../services/user.service";
import "./Allproducts.css";

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch all products
  const getAllProducts = async () => {
    try {
      const response = await UserService.getall();
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
      <h2 className="mt-4">Our Products</h2>
      {error && <p className="text-danger mt-4">{error}</p>}
      <div className="row">
        <TransitionGroup component={null}>
          {products.map((product) => (
            <CSSTransition key={product.id} classNames="fade" timeout={500}>
              <div className="col-md-6 mb-4">
                <div className="card product-card">
                  <div className="card-header">
                    <h3 className="card-title">Product: {product.name}</h3>
                  </div>
                  <div className="card-body">
                    {product.features.map((feature) => (
                      <div key={feature.id} className="mb-3">
                        <h4>Feature: {feature.name}</h4>
                        <h5>Parameters</h5>
                        <ul className="list-unstyled">
                          {feature.parameters.map((parameter) => (
                            <li key={parameter.id}>
                              {parameter.name}: {parameter.value} (
                              {parameter.type})
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default ViewAllProducts;
