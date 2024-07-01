import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const AddQuotation = () => {
  const [formData, setFormData] = useState({
    productId: 0,
    totalAmount: 0,
    quantity: 0,
  });
  const [products, setProducts] = useState([]);
  const [addedQuotation, setAddedQuotation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await UserService.getallmgr(); // Adjust this to your actual service method
        setProducts(response.data); // Assuming response.data is an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

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
      const response = await UserService.addquotation(formData);
      setAddedQuotation(response.data);
      setError(null);
    } catch (error) {
      console.error("Error adding quotation:", error);
      if (
        (error.response && error.response.status === 404) ||
        (error.response && error.response.status === 500)
      ) {
        setError("Product or user ID is invalid.");
      } else {
        setError("Error adding quotation.");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card p-4">
        <h2 className="mt-4 text-center">Add Quotation</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userId" className="form-label">
              User ID:
            </label>
            <input
              type="number"
              id="userId"
              name="userId"
              className="form-control form-control-medium"
              value={formData.userId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productId" className="form-label">
              Product Name:
            </label>
            <select
              className="form-control form-control-medium"
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="totalAmount" className="form-label">
              Total Amount:
            </label>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              className="form-control form-control-medium"
              value={formData.totalAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="form-control form-control-medium"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Quotation
          </button>
        </form>
        {addedQuotation && (
          <div className="mt-4">
            <h3>Quotation added successfully:</h3>
            <p>User ID: {addedQuotation.userId}</p>
            <p>Product ID: {addedQuotation.productId}</p>
            <p>Total Amount: {addedQuotation.totalAmount}</p>
            <p>Quantity: {addedQuotation.quantity}</p>
          </div>
        )}
        {error && <p className="mt-4 text-danger">Error: {error}</p>}
      </div>
    </div>
  );
};

export default AddQuotation;
