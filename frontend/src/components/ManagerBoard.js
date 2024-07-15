import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ManagerBoard.css"; // Import your CSS file with styles

const ManagerBoard = () => {
  const navigateTo = (path) => {
    window.location.href = path; // Navigate using window.location.href
  };

  return (
    <div className="manager-container">
      <div className="manager-sidebar">
        <ul className="manager-nav">
          <li className="manager-nav-item" onClick={() => navigateTo("/create-quotation")}>
            Create Quotation
          </li>
          <li className="manager-nav-item" onClick={() => navigateTo("/get-quotation")}>
            View Quotation
          </li>
          <li className="manager-nav-item" onClick={() => navigateTo("/view-product-by-name-mgr")}>
            View Products By Name
          </li>
          <li className="manager-nav-item" onClick={() => navigateTo("/view-all-products-mgr")}>
            View All Products
          </li>
        </ul>
      </div>
      <header className="manager-header">
        <h1 className="manager-heading">Manager Dashboard</h1>
      </header>
    </div>
  );
};

export default ManagerBoard;
