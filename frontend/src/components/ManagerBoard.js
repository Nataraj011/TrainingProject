import React, { useState } from "react";
import { Link } from "react-router-dom";

const ManagerBoard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="container-fluid p-5 bg-gradient-gray">
      <div className="row justify-content-center">
        <h2 className="text-center mb-4">Manager Dashboard</h2>
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
              <Link to="/create-quotation" className="dropdown-item">
                Create Quotation
              </Link>
            </li>
            <li>
              <Link to="/get-quotation" className="dropdown-item">
                Get Quotation
              </Link>
            </li>
            <li>
              <Link to="/view-product-by-id-mgr" className="dropdown-item">
                View Product by ID
              </Link>
            </li>
            <li>
              <Link to="/view-product-by-name-mgr" className="dropdown-item">
                View Product by Name
              </Link>
            </li>
            <li>
              <Link to="/view-all-products-mgr" className="dropdown-item">
                View All Products
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagerBoard;
