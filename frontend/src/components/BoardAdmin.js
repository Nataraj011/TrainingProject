import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Allproducts.css"; // Ensure your CSS file with animations is correctly imported

const BoardAdmin = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="container-fluid fade-in"> {/* Apply fade-in animation */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <header className="jumbotron slide-in"> {/* Apply slide-in animation */}
            <h2 className="text-center mb-4">Admin Dashboard</h2>
            <div className="form-group mt-3">
              <label htmlFor="actions">Actions:</label>
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  onClick={toggleDropdown}
                >
                  Select Action
                </button>
                <ul
                  className={`dropdown-menu${dropdownOpen ? " show" : ""}`}
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <Link to="/add-products" className="dropdown-item">
                      Add Product and Features
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/add-features" className="dropdown-item">
                      Add Features
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/view-product" className="dropdown-item">
                      View Products
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to="/view-productbyid-admin"
                      className="dropdown-item"
                    >
                      View Products By ID
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      to="/view-productbyname-admin"
                      className="dropdown-item"
                    >
                      View Products By Name
                    </Link>
                  </li>
                  <li>
                    <Link to="/update-product" className="dropdown-item">
                      Update Products And Features
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/delete-param" className="dropdown-item">
                      Delete Parameters
                    </Link>
                  </li>
                  <li>
                    <Link to="/delete-feature" className="dropdown-item">
                      Delete Features
                    </Link>
                  </li> */}
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
          </header>
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin;
