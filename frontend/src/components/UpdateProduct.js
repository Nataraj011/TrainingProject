import React, { useState } from "react";

const UpdateProduct = ({ product, productId, onProductUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    id: product.id,
    name: product.name,
    features: product.features.map(feature => ({
      id: feature.id,
      name: feature.name,
      product: feature.product ? { id: feature.product.id, name: feature.product.name } : { id: '', name: '' },
      parameters: feature.parameters.map(param => ({
        id: param.id,
        name: param.name,
        type: param.type,
        value: param.value
      }))
    }))
  });

  const handleFeatureNameChange = (featureIndex, newValue) => {
    setUpdatedProduct(prevProduct => ({
      ...prevProduct,
      features: prevProduct.features.map((feature, index) => {
        if (index !== featureIndex) return feature;
        return { ...feature, name: newValue };
      })
    }));
  };

  const handleProductIdChange = (featureIndex, newValue) => {
    setUpdatedProduct(prevProduct => ({
      ...prevProduct,
      features: prevProduct.features.map((feature, index) => {
        if (index !== featureIndex) return feature;
        return {
          ...feature,
          product: { ...feature.product, id: newValue }
        };
      })
    }));
  };

  const handleProductNameChange = (featureIndex, newValue) => {
    setUpdatedProduct(prevProduct => ({
      ...prevProduct,
      features: prevProduct.features.map((feature, index) => {
        if (index !== featureIndex) return feature;
        return {
          ...feature,
          product: { ...feature.product, name: newValue }
        };
      })
    }));
  };

  const handleParameterChange = (featureIndex, parameterIndex, newValue) => {
    setUpdatedProduct(prevProduct => ({
      ...prevProduct,
      features: prevProduct.features.map((feature, index) => {
        if (index !== featureIndex) return feature;
        return {
          ...feature,
          parameters: feature.parameters.map((param, pIndex) => {
            if (pIndex !== parameterIndex) return param;
            return { ...param, value: newValue };
          })
        };
      })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProductUpdate(updatedProduct);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Product</h3>
      <div>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={updatedProduct.name}
          onChange={(e) => setUpdatedProduct(prevProduct => ({ ...prevProduct, name: e.target.value }))}
          required
        />
      </div>
      {updatedProduct.features.map((feature, featureIndex) => (
        <div key={feature.id}>
          <h4>Feature Name:</h4>
          <input
            type="text"
            value={feature.name}
            onChange={(e) => handleFeatureNameChange(featureIndex, e.target.value)}
            required
          />
          <h5>Product ID:</h5>
          <input
            type="text"
            value={feature.product.id}
            onChange={(e) => handleProductIdChange(featureIndex, e.target.value)}
            required
          />
          <h5>Product Name:</h5>
          <input
            type="text"
            value={feature.product.name}
            onChange={(e) => handleProductNameChange(featureIndex, e.target.value)}
            required
          />
          {feature.parameters.map((param, parameterIndex) => (
            <div key={param.id}>
              <label htmlFor={`param-${featureIndex}-${parameterIndex}`}>{param.name}:</label>
              <input
                type="text"
                id={`param-${featureIndex}-${parameterIndex}`}
                value={param.value}
                onChange={(e) => handleParameterChange(featureIndex, parameterIndex, e.target.value)}
                required
              />
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProduct;
