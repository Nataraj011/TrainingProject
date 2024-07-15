import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BoardAdmin.css"; // Ensure your CSS file is correctly imported

const BoardAdmin = () => {
  const navigateTo = (path) => {
    window.location.href = path; // Use window.location.href to navigate to the specified path
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <ul className="admin-nav">
          <li className="admin-nav-item" onClick={() => navigateTo("/add-products")}>
            Add Product and Features
          </li>
          <li className="admin-nav-item" onClick={() => navigateTo("/view-product")}>
            View Products
          </li>
          <li className="admin-nav-item" onClick={() => navigateTo("/view-productbyname-admin")}>
            View Products By Name
          </li>
          <li className="admin-nav-item" onClick={() => navigateTo("/update-product")}>
            Update Products
          </li>
          <li className="admin-nav-item" onClick={() => navigateTo("/delete-product")}>
            Delete Product
          </li>
          <li className="admin-nav-item" onClick={() => navigateTo("/updaterole")}>
            Update Role for User
          </li>
        </ul>
      </div>
      <header className="admin-header">
        <h1 className="admin-heading">Admin Dashboard</h1>
      </header>
    </div>
  );
};

export default BoardAdmin;
