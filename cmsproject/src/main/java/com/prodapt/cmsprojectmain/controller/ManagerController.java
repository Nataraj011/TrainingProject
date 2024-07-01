package com.prodapt.cmsprojectmain.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.prodapt.cmsprojectmain.dto.QuotationDTO;
import com.prodapt.cmsprojectmain.entities.Product;
import com.prodapt.cmsprojectmain.entities.Quotation;
import com.prodapt.cmsprojectmain.entities.UserEntity;
import com.prodapt.cmsprojectmain.exceptions.ProductNotFoundException;
import com.prodapt.cmsprojectmain.exceptions.QuotationNotFoundException;
import com.prodapt.cmsprojectmain.exceptions.UserNotFoundException;
import com.prodapt.cmsprojectmain.service.ProductService;
import com.prodapt.cmsprojectmain.service.QuotationService;
import com.prodapt.cmsprojectmain.service.UserEntityService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
 
@RestController
@RequestMapping("/api/v1/manager")
@Tag(name = "InternetService Manager API")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ManagerController {
	 private static final Logger loggers = LoggerFactory.getLogger(ManagerController.class);

	    
	@Autowired
	private ProductService productService;
 
	@Autowired
	private QuotationService quotationService;
 
	@Autowired
	private ModelMapper modelMapper;
 
	@Autowired
	private UserEntityService userService;
 
	@Operation(summary = "Get Product By Name")
	@GetMapping("/getproductbyname")
	public ResponseEntity<Product> getProductByName(@RequestParam("name") String name) throws ProductNotFoundException {
		 loggers.info("Inside getProductByName " + ManagerController.class.getName());
		Product product = productService.getProductByName(name);
		loggers.info("Call to service layer method is success");
		return new ResponseEntity<>(product, HttpStatus.OK);
 
	}
 
	@Operation(summary = "Get Product By ID")
	@GetMapping("/getproductbyid")
	public ResponseEntity<Product> getProductById(@RequestParam("id") Long productId) throws ProductNotFoundException {
		loggers.info("Inside getProductById " + ManagerController.class.getName());
		Product product = productService.getProductById(productId);
		loggers.info("Call to service layer method is success");
		return new ResponseEntity<>(product, HttpStatus.OK);
 
	}
 
	@Operation(summary = "Get All Products")
	@GetMapping("/getallproducts")
	public ResponseEntity<List<Product>> getAllProducts() {
		loggers.info("Inside getAllProducts " + ManagerController.class.getName());
		List<Product> products = productService.getAllProducts();
		loggers.info("Call to service layer method is success");
		return new ResponseEntity<>(products, HttpStatus.OK);
	}
 
	@Operation(summary = "Add Quotation")
	@PostMapping("/addquotation")
	public ResponseEntity<QuotationDTO> addQuotation(@RequestBody QuotationDTO quotationDTO)
			throws UserNotFoundException, ProductNotFoundException {
		loggers.info("Inside addQuotation " + ManagerController.class.getName());
		// Map QuotationDTO to Quotation entity
		Quotation quotation = modelMapper.map(quotationDTO, Quotation.class);
 
		// Manually setting user and product to avoid LazyInitializationException
		UserEntity user = userService.getUserEntityById(quotationDTO.getUserId());
		if (user == null) {
			throw new UserNotFoundException("User not found");
		}
		Product product = productService.getProductById(quotationDTO.getProductId());
		if (product == null) {
			throw new ProductNotFoundException("Product not found");
		}
		quotation.setUserEntity(user);
		quotation.setProduct(product);
 
		// Save the quotation
		Quotation savedQuotation = quotationService.addQuotation(quotation);
 
		// Map saved Quotation entity back to QuotationDTO
		QuotationDTO responseQuotationDTO = modelMapper.map(savedQuotation, QuotationDTO.class);
 
		return new ResponseEntity<>(responseQuotationDTO, HttpStatus.CREATED);
	}
 
	@Operation(summary = "Get Quotation By ID")
	@GetMapping("/getquotationbyid")
	public ResponseEntity<QuotationDTO> getQuotationById(@RequestParam("id") Long quotationId)
			throws QuotationNotFoundException {
		loggers.info("Inside getQuotationById " + ManagerController.class.getName());
		// Fetch the quotation
		Quotation quotation = quotationService.getQuotationById(quotationId);
 
		// Map Quotation entity to QuotationDTO
		QuotationDTO responseQuotationDTO = modelMapper.map(quotation, QuotationDTO.class);
 
		return new ResponseEntity<>(responseQuotationDTO, HttpStatus.OK);
	}
	
	@GetMapping("/getallusersmgr")
	public ResponseEntity<Iterable<UserEntity>> getAllUsers() {
		Iterable<UserEntity> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}
}