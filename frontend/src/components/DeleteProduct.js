import React, { useState } from "react";
import UserService from "../services/user.service";

const DeleteProduct = () => {
  const [productId, setProductId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await UserService.delProduct(productId);
      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      if (error.response && error.response.status === 404) {
        setError('Product not found.');
      } else {
        setError('Error deleting product');
      }
    }
    
  };

  return (
    <div className="container">
      <h2 className="mt-4">Delete Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productId" className="form-label">Product ID:</label>
          <input type="number" id="productId" className="form-control" value={productId} onChange={(e) => setProductId(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-danger">Delete Product</button>
      </form>
      {success && (
        <div className="mt-4">
          <p className="text-success">Product deleted successfully.</p>
        </div>
      )}
      {error && <p className="mt-4 text-danger">Error: {error}</p>}
    </div>
  );
};

export default DeleteProduct;
