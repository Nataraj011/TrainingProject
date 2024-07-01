import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const AddFeatures = () => {
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [featureName, setFeatureName] = useState('');
  const [parameterName1, setParameterName1] = useState('');
  const [parameterType1, setParameterType1] = useState('');
  const [parameterValue1, setParameterValue1] = useState('');
  const [parameterName2, setParameterName2] = useState('');
  const [parameterType2, setParameterType2] = useState('');
  const [parameterValue2, setParameterValue2] = useState('');
  const [parameterName3, setParameterName3] = useState('');
  const [parameterType3, setParameterType3] = useState('');
  const [parameterValue3, setParameterValue3] = useState('');
  const [products, setProducts] = useState([]);
  const [addedFeatures, setAddedFeatures] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products when component mounts
    async function fetchProducts() {
      try {
        const response = await UserService.getall(); // Adjust this based on your UserService implementation
        setProducts(response.data); // Assuming response contains an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    const selectedProduct = products.find(product => product.id === parseInt(selectedProductId));

    if (selectedProduct) {
      setProductId(selectedProductId); // Set productId directly from the selected value
      setProductName(selectedProduct.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: 0,
      name: featureName,
      product: {
        id: productId,
        name: productName
      },
      parameters: [
        {
          id: 0,
          name: parameterName1,
          type: parameterType1,
          value: parameterValue1
        },
        {
          id: 0,
          name: parameterName2,
          type: parameterType2,
          value: parameterValue2
        },
        {
          id: 0,
          name: parameterName3,
          type: parameterType3,
          value: parameterValue3
        }
      ]
    };

    try {
      const response = await UserService.addFeatures(payload);
      setAddedFeatures(response.data);
      setError(null);
    } catch (error) {
      console.error('Error adding features:', error);
      setError('Error adding features');
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4 text-center">Add Features</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="featureName" className="form-label">Feature Name:</label>
                <input type="text" id="featureName" className="form-control rounded" value={featureName} onChange={(e) => setFeatureName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="productDropdown" className="form-label">Select Product:</label>
                <select id="productDropdown" className="form-control rounded" onChange={handleProductChange} value={productId} required>
                  <option value="">-- Select Product --</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id.toString()}>{product.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="parameterName1" className="form-label">Parameter Name 1:</label>
                <input type="text" id="parameterName1" className="form-control rounded" value={parameterName1} onChange={(e) => setParameterName1(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="parameterType1" className="form-label">Parameter Type 1:</label>
                <input type="text" id="parameterType1" className="form-control rounded" value={parameterType1} onChange={(e) => setParameterType1(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="parameterValue1" className="form-label">Parameter Value 1:</label>
                <input type="text" id="parameterValue1" className="form-control rounded" value={parameterValue1} onChange={(e) => setParameterValue1(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="parameterName2" className="form-label">Parameter Name 2:</label>
                <input type="text" id="parameterName2" className="form-control rounded" value={parameterName2} onChange={(e) => setParameterName2(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="parameterType2" className="form-label">Parameter Type 2:</label>
                <input type="text" id="parameterType2" className="form-control rounded" value={parameterType2} onChange={(e) => setParameterType2(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="parameterValue2" className="form-label">Parameter Value 2:</label>
                <input type="text" id="parameterValue2" className="form-control rounded" value={parameterValue2} onChange={(e) => setParameterValue2(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="parameterName3" className="form-label">Parameter Name 3:</label>
                <input type="text" id="parameterName3" className="form-control rounded" value={parameterName3} onChange={(e) => setParameterName3(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="parameterType3" className="form-label">Parameter Type 3:</label>
                <input type="text" id="parameterType3" className="form-control rounded" value={parameterType3} onChange={(e) => setParameterType3(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="parameterValue3" className="form-label">Parameter Value 3:</label>
                <input type="text" id="parameterValue3" className="form-control rounded" value={parameterValue3} onChange={(e) => setParameterValue3(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary">Add Features</button>
            </form>
          </div>
        </div>
      </div>
      {addedFeatures && (
        <div className="mt-4">
          <h3>Features added successfully:</h3>
          <p>Feature ID: {addedFeatures.id}</p>
          <p>Feature Name: {addedFeatures.name}</p>
        </div>
      )}
      {error && <p className="mt-4 text-danger">Error: {error}</p>}
    </div>
  );
};

export default AddFeatures;
