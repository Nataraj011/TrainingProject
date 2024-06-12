package com.project.cmsproject.controller;

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

import com.project.cmsproject.dto.QuotationDTO;
import com.project.cmsproject.entities.Product;
import com.project.cmsproject.entities.Quotation;
import com.project.cmsproject.entities.User;
import com.project.cmsproject.exceptions.ProductNotFoundException;
import com.project.cmsproject.exceptions.QuotationNotFoundException;
import com.project.cmsproject.service.ProductService;
import com.project.cmsproject.service.QuotationService;
import com.project.cmsproject.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/manager")
@Tag(name="InternetService Manager API")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ManagerController {

    private static final Logger logger = LoggerFactory.getLogger(ManagerController.class);

    @Autowired
    private ProductService productService;
    

    @Autowired
    private QuotationService quotationService;
    
    @Autowired
    private ModelMapper modelMapper;
     
    
    @Autowired
    private UserService userService;
    
    

    
    
   
    
   

    @Operation(summary = "Get Product By Name")
    @GetMapping("/getproductbyname")
    public ResponseEntity<?> getProductByName(@RequestParam("name") String name) {
        logger.info("Inside getProductByName " + ManagerController.class.getName());
        try {
            Product product = productService.getProductByName(name);
            logger.info("Call to service layer method is success");
            return new ResponseEntity<Product>(product, HttpStatus.OK);
        } catch (ProductNotFoundException ex) {
            logger.error("ProductNotFoundException: " + ex.getMessage());
            return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Get Product By ID")
    @GetMapping("/getproductbyid")
    public ResponseEntity<?> getProductById(@RequestParam("id") Long productId) {
        logger.info("Inside getProductById " + ManagerController.class.getName());
        try {
            Product product = productService.getProductById(productId);
            logger.info("Call to service layer method is success");
            return new ResponseEntity<Product>(product, HttpStatus.OK);
        } catch (ProductNotFoundException ex) {
            logger.error("ProductNotFoundException: " + ex.getMessage());
            return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Get All Products")
    @GetMapping("/getallproducts")
    public ResponseEntity<?> getAllProducts() {
        logger.info("Inside getAllProducts " + ManagerController.class.getName());
        List<Product> products = productService.getAllProducts();
        logger.info("Call to service layer method is success");
        return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
    }
   
    
    @Operation(summary = "Add Quotation")
    @PostMapping("/addquotation")
    public ResponseEntity<?> addQuotation(@RequestBody QuotationDTO quotationDTO) {
        logger.info("Inside addQuotation " + ManagerController.class.getName());
        try {
            // Map QuotationDTO to Quotation entity
            Quotation quotation = modelMapper.map(quotationDTO, Quotation.class);

            // Manually setting user and product to avoid LazyInitializationException
            User user = userService.getUserById(quotationDTO.getUserId());
            if (user == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
            Product product = productService.getProductById(quotationDTO.getProductId());
            if (product == null) {
                return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
            }
            quotation.setUser(user);
            quotation.setProduct(product);

            // Save the quotation
            Quotation savedQuotation = quotationService.addQuotation(quotation);

            // Map saved Quotation entity back to QuotationDTO
            QuotationDTO responseQuotationDTO = modelMapper.map(savedQuotation, QuotationDTO.class);

            return new ResponseEntity<>(responseQuotationDTO, HttpStatus.CREATED);
        } catch (Exception ex) {
            logger.error("Exception occurred while adding quotation: " + ex.getMessage());
            return new ResponseEntity<>("An error occurred while adding quotation", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @Operation(summary = "Get Quotation By ID")
    @GetMapping("/getquotationbyid")
    public ResponseEntity<?> getQuotationById(@RequestParam("id") Long quotationId) {
        logger.info("Inside getQuotationById " + ManagerController.class.getName());
        try {
            // Fetch the quotation
            Quotation quotation = quotationService.getQuotationById(quotationId);

            // Map Quotation entity to QuotationDTO
            QuotationDTO responseQuotationDTO = modelMapper.map(quotation, QuotationDTO.class);

            return new ResponseEntity<>(responseQuotationDTO, HttpStatus.OK);
        } catch (QuotationNotFoundException ex) {
            logger.error("QuotationNotFoundException: " + ex.getMessage());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception ex) {
            logger.error("Exception occurred while fetching quotation: " + ex.getMessage());
            return new ResponseEntity<>("An error occurred while fetching quotation", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

    
    
    
    
    
    
    
    
    
    
    
    
    
   

