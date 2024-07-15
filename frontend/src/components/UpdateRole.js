import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";

const UpdateRole = () => {
  const { userId } = useParams(); // Get userId from URL
  const [selectedRole, setSelectedRole] = useState(null); // State for selected role object
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(""); // State for selected user ID

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getalluser();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await UserService.getallrole();
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchUsers();
    fetchRoles();
  }, []);

  useEffect(() => {
    // Set the userId state when it's available from URL params
    if (userId) {
      setSelectedUserId(userId); // Corrected to setSelectedUserId
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const selectedUser = users.find((user) => user.id.toString() === selectedUserId);
      if (!selectedUser) {
        throw new Error("User not found.");
      }

      if (!selectedRole) {
        throw new Error("Please select a role.");
      }

      await UserService.updaterolebyuser(selectedUserId, selectedRole); // Pass entire selectedRole object
      setMessage("Role updated successfully!");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("User not found.");
      } else {
        setError("An error occurred while updating the role.");
      }
    }
  };

  const handleRoleChange = (e) => {
    const roleId = e.target.value;
    const role = roles.find((r) => r.id.toString() === roleId);
    setSelectedRole(role);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card p-4 rounded">
            <h2 className="mb-4">Update User Role</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>User Username:</label>
                <input
                  type="text"
                  className="form-control"
                  value={users.find(user => user.id === parseInt(selectedUserId))?.username || ""}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <select
                  className="form-control"
                  value={selectedRole ? selectedRole.id : ""}
                  onChange={handleRoleChange}
                  required
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Update Role</button>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
            {error && <div className="mt-3 alert alert-danger">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRole;
