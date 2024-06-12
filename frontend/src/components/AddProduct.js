
import React, { useState } from "react";
import UserService from "../services/user.service";


const Addproduct = () => {
  const [name, setName] = useState('');
  const [addedProduct, setAddedProduct] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();

      const payload = {
          id: 0,
          name: name,
          features: null
      };

      try {
          const response = await UserService.addproduct(payload);
          setAddedProduct(response.data); 
          setError(null);
      } catch (error) {
          console.error('Error adding product:', error);
          setError('Error adding product');
      }
      

  };

  return (
      <div className="container">
          <h2 className="mt-4">Add Product</h2>
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="name" className="form-label">Product Name:</label>
                  <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
          {addedProduct && (
              <div className="mt-4">
                  <h3>Product added successfully:</h3>
                  <p>Name: {addedProduct.name}</p>
              </div>
          )}
          {error && <p className="mt-4 text-danger">Error: {error}</p>}
      </div>
  );
};

export default Addproduct;
