package com.project.cmsproject.service;

import java.util.List;

import com.project.cmsproject.entities.Product;
import com.project.cmsproject.exceptions.ProductNotFoundException;

public interface ProductService {
	public Product createproduct(Product product);
	
	public Product getProductById(Long productId) throws  ProductNotFoundException;
	
	public Product getProductByName(String name) throws  ProductNotFoundException;
	
	public List<Product> getAllProducts();
	
	
	 public Product updateProduct(Long id, Product updatedProduct) throws ProductNotFoundException;
	 
	 
	 public String deleteProductid(Long id) throws ProductNotFoundException;
	 
	

	 
	 
	 

}
