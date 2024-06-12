import React, { useState } from "react";
import UserService from "../services/user.service";
import UpdateProduct from "./UpdateProduct";

const UpdateProductForm = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.getproductbyid(productId);
      if (response.data) {
        setProduct(response.data);
        setShowUpdateForm(true);
        setError(null);
        setResponseMessage('Product details fetched successfully.');
      } else {
        setProduct(null);
        setShowUpdateForm(false);
        setError('Product not found.');
        setResponseMessage('');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
      setShowUpdateForm(false);
      if (error.response && error.response.status === 404) {
        setError('Product not found.');
      } else {
        setError('An unexpected error occurred.');
      }
      setResponseMessage('Error fetching product. Please try again.');
    }
  };


  const handleProductUpdate = async (updatedProduct) => {
    try {
      await UserService.updateproduct(productId, updatedProduct);
      // Optional: You may want to fetch the updated product here to refresh the data
      setShowUpdateForm(false);
      setResponseMessage('Product updated successfully.');
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Error updating product');
      setResponseMessage('Error updating product. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">Update Product</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="productId">Enter Product ID:</label>
        <input 
          type="text" 
          id="productId" 
          value={productId} 
          onChange={handleProductIdChange} 
          required 
        />
        <button type="submit">Get Product Details</button>
      </form>
      {error && <p className="mt-4 text-danger">{error}</p>}
      {responseMessage && <p className="mt-4">{responseMessage}</p>}
      {showUpdateForm && product && (
        <UpdateProduct product={product} onProductUpdate={handleProductUpdate} />
      )}
    </div>
  );
};

export default UpdateProductForm;
