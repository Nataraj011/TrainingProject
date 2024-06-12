import React, { useState } from "react";
import { Link } from "react-router-dom";

const BoardAdmin = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="container-fluid p-5 bg-gradient-gray">
      <div className="row justify-content-center">
        <h2 className="text-center mb-4">Admin Dashboard</h2>
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
              <Link to="/add-product" className="dropdown-item">
                Add Product
              </Link>
            </li>
            <li>
              <Link to="/add-features" className="dropdown-item">
                Add Features
              </Link>
            </li>
            <li>
              <Link to="/view-product" className="dropdown-item">
                View Products
              </Link>
            </li>
            <li>
              <Link to="/view-productbyid-admin" className="dropdown-item">
                View Products By ID
              </Link>
            </li>
            <li>
              <Link to="/view-productbyname-admin" className="dropdown-item">
                View Products By Name
              </Link>
            </li>
            <li>
              <Link to="/update-product" className="dropdown-item">
                Update Products
              </Link>
            </li>
            <li>
              <Link to="/delete-param" className="dropdown-item">
                Delete Parameters
              </Link>
            </li>
            <li>
              <Link to="/delete-feature" className="dropdown-item">
                Delete Features
              </Link>
            </li>
            <li>
              <Link to="/delete-product" className="dropdown-item">
                Delete Product
              </Link>
            </li>
            <li>
              <Link to="/updaterole" className="dropdown-item">
                Update Role for User
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default BoardAdmin;
