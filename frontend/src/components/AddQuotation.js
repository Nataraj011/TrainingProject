import React, { useState } from "react";
import UserService from "../services/user.service";

const AddQuotation = () => {
  const [formData, setFormData] = useState({
    id: 0,
    userId: 0,
    productId: 0,
    totalAmount: 0,
    quantity: 0,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await UserService.addquotation(formData);
        setSuccess(true);
        setError(null);
      } catch (error) {
        console.error("Error adding quotation:", error);
        if ((error.response && error.response.status === 404) || (error.response && error.response.status === 500)) {
          setError("Product or user ID is invalid.");
        } else {
          setError("Error adding quotation.");
        }
      }
      
  };

  return (
    <div className="container">
      <h2 className="mt-4">Add Quotation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            type="number"
            className="form-control"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productId">Product ID:</label>
          <input
            type="number"
            className="form-control"
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">Total Amount:</label>
          <input
            type="number"
            className="form-control"
            id="totalAmount"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Quotation
        </button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
      {success && <p className="text-success mt-3">Quotation added successfully.</p>}
    </div>
  );
};

export default AddQuotation;
