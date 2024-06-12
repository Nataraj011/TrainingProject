import React, { useState } from "react";
import UserService from "../services/user.service";

const DeleteFeature = () => {
  const [featureId, setFeatureId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await UserService.delFeatures(featureId);
      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error('Error deleting feature:', error);
      if (error.response && error.response.status === 404) {
        setError('Feature not found.');
      } else {
        setError('Error deleting feature');
      }
    }
  };  

  return (
    <div className="container">
      <h2 className="mt-4">Delete Feature</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="featureId" className="form-label">Feature ID:</label>
          <input type="number" id="featureId" className="form-control" value={featureId} onChange={(e) => setFeatureId(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-danger">Delete Feature</button>
      </form>
      {success && (
        <div className="mt-4">
          <p className="text-success">Feature deleted successfully.</p>
        </div>
      )}
      {error && <p className="mt-4 text-danger">Error: {error}</p>}
    </div>
  );
};

export default DeleteFeature;
