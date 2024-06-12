import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserBoard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="container-fluid p-5 bg-gradient-gray">
      <div className="row justify-content-center">
        <h2 className="text-center mb-4">User Dashboard</h2>
      </div>
      <div className="row justify-content-center">
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            onClick={toggleDropdown}
          >
            Actions
          </button>
          <ul
            className={`dropdown-menu${dropdownOpen ? " show" : ""}`}
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <Link to="/view-all-products" className="dropdown-item">
                View All Products
              </Link>
            </li>
            <li>
              <Link to="/view-products-by-name" className="dropdown-item">
                View Products by Name
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserBoard;
