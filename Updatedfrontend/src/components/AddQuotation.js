import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const AddQuotation = () => {
  const [formData, setFormData] = useState({
    userId: "", // Changed userId to string for storing the user ID
    productId: "",
    totalAmount: 0,
    quantity: 0,
  });
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getalluser(); // Adjust based on your actual service method
        setUsers(response.data); // Assuming response contains an array of users
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users. Please try again later.");
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await UserService.getall(); // Adjust based on your actual service method
        setProducts(response.data); // Assuming response contains an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again later.");
      }
    };

    fetchUsers();
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
      await UserService.addQuotation(formData);
      setSuccess(true);
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
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 rounded">
            <h2 className="mb-4">Add Quotation</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="userId">User:</label>
                <select
                  className="form-control"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select User --</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="productId">Product Name:</label>
                <select
                  className="form-control"
                  id="productId"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Product --</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
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
            {success && (
              <p className="text-success mt-3">Quotation added successfully.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuotation;
