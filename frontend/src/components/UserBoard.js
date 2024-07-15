import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UserBoard.css"; // Import your CSS file with styles

const UserBoard = () => {
  const navigateTo = (path) => {
    window.location.href = path; // Navigate using window.location.href
  };

  return (
    <div className="user-container">
      <div className="user-sidebar">
        <ul className="user-nav">
          <li className="user-nav-item" onClick={() => navigateTo("/view-all-products")}>
            View All Products
          </li>
          <li className="user-nav-item" onClick={() => navigateTo("/view-products-by-name")}>
            View Products by Name
          </li>
        </ul>
      </div>
      <header className="user-header">
        <h1 className="user-heading">User Dashboard</h1>
      </header>
    </div>
  );
};

export default UserBoard;
