package com.prodapt.cmsprojectmain.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
 
@SpringBootTest
public class ManagerControllerTest {
 
	@InjectMocks
	private ManagerController managerController;
 
	@Mock
	private ProductService productService;
 
	@Mock
	private QuotationService quotationService;
 
	@Mock
	private UserEntityService userService;
 
	@Mock
	private ModelMapper modelMapper;
	private Product product;
	private UserEntity user;
	private Quotation quotation;
	private QuotationDTO quotationDTO;
 
	@BeforeEach
	public void setup() {
		product = new Product();
		product.setId(1L);
		product.setName("Test Product");
 
		user = new UserEntity();
		user.setId(1);
		user.setUsername("testuser");
		user.setEmail("testuser@example.com");
		user.setPassword("testpassword");
 
		quotation = new Quotation();
		quotation.setId(1L);
		quotation.setUserEntity(user);
		quotation.setProduct(product);
		quotation.setTotalAmount(100.0);
		quotation.setQuantity(2);
 
		
	}
 
	@Test
	void testGetProductByName_Success() throws ProductNotFoundException {
		when(productService.getProductByName("Test Product")).thenReturn(product);
 
		ResponseEntity<Product> response = managerController.getProductByName("Test Product");
		assertNotNull(product);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(product, response.getBody());
	}
 
	@Test
	void testGetProductByName_Failure() throws ProductNotFoundException {
		when(productService.getProductByName("Test Product"))
				.thenThrow(new ProductNotFoundException("Product not found"));
		assertNotNull(product);
		assertThrows(ProductNotFoundException.class, () -> managerController.getProductByName("Test Product"));
	}
 
	@Test
	void testGetProductById_Success() throws ProductNotFoundException {
		when(productService.getProductById(1L)).thenReturn(product);
 
		ResponseEntity<Product> response = managerController.getProductById(1L);
		assertNotNull(product);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(product, response.getBody());
	}
 
	@Test
	void testGetProductById_Failure() throws ProductNotFoundException {
		when(productService.getProductById(1L)).thenThrow(new ProductNotFoundException("Product not found"));
		assertNotNull(product);
		assertThrows(ProductNotFoundException.class, () -> managerController.getProductById(1L));
	}
 
	@Test
	void testGetAllProducts() {
		List<Product> products = new ArrayList<>();
		products.add(product);
 
		when(productService.getAllProducts()).thenReturn(products);
 
		ResponseEntity<List<Product>> response = managerController.getAllProducts();
		assertNotNull(product);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(products, response.getBody());
	}
 
//	@Test
//	void testAddQuotationSuccess() throws UserNotFoundException, ProductNotFoundException {
//		// Arrange
//		quotationDTO = new QuotationDTO();
//		quotationDTO.setId(1L);
//		quotationDTO.setUserId(user.getId());
//		quotationDTO.setProductId(product.getId());
//		quotationDTO.setTotalAmount(100.0);
//		quotationDTO.setQuantity(2);
//		
//		when(userService.getUserEntityById(quotationDTO.getUserId())).thenReturn(user);
//		when(productService.getProductById(quotationDTO.getProductId())).thenReturn(product);
//		when(quotationService.addQuotation(quotation)).thenReturn(quotation);
// 
//		ResponseEntity<QuotationDTO> result = managerController.addQuotation(quotationDTO);
// 
//		// Assert
//		assertNotNull(quotationDTO);
//		assertNotNull(quotation);
//		assertEquals(HttpStatus.CREATED, result.getStatusCode());
//		assertEquals(quotationDTO, result.getBody());
//	}
 
	@Test
	void testAddQuotationFailure() throws UserNotFoundException, ProductNotFoundException {
		// Arrange
		QuotationDTO quotationDTO = new QuotationDTO();
 
		when(userService.getUserEntityById(quotationDTO.getUserId())).thenThrow(new UserNotFoundException());
		when(productService.getProductById(quotationDTO.getProductId())).thenThrow(new ProductNotFoundException());
 
		// Act and Assert
		assertNotNull(quotation);
		assertNotNull(quotationDTO);
		assertThrows(UserNotFoundException.class, () -> {
			managerController.addQuotation(quotationDTO);
		});
	}
 
	@Test
	void testGetQuotationByIdSuccess() throws QuotationNotFoundException {
		// Arrange
		Long quotationId = 1L;
		Quotation quotation = new Quotation();
		QuotationDTO quotationDTO = new QuotationDTO();
 
		when(quotationService.getQuotationById(quotationId)).thenReturn(quotation);
		when(modelMapper.map(quotation, QuotationDTO.class)).thenReturn(quotationDTO);
 
		// Act
		ResponseEntity<QuotationDTO> result = managerController.getQuotationById(quotationId);
 
		// Assert
		assertNotNull(quotation);
		assertNotNull(quotationDTO);
		assertEquals(HttpStatus.OK, result.getStatusCode());
		assertEquals(quotationDTO, result.getBody());
	}
 
	@Test
	void testGetQuotationByIdFailure() throws QuotationNotFoundException {
		// Arrange
		Long quotationId = 1L;
		when(quotationService.getQuotationById(quotationId)).thenThrow(new QuotationNotFoundException());
 
		// Act and Assert
		assertNotNull(quotation);
		//assertNotNull(quotationDTO);
		assertThrows(QuotationNotFoundException.class, () -> {
			managerController.getQuotationById(quotationId);
		});
	}
}