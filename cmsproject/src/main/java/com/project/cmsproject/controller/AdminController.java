package com.project.cmsproject.controller;

import java.util.List;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.cmsproject.entities.Features;
import com.project.cmsproject.entities.Product;
import com.project.cmsproject.entities.Role;
import com.project.cmsproject.exceptions.FeatureNotFoundException;
import com.project.cmsproject.exceptions.ParameterNotFoundException;
import com.project.cmsproject.exceptions.ProductNotFoundException;
import com.project.cmsproject.exceptions.UserNotFoundException;
import com.project.cmsproject.service.FeatureService;
import com.project.cmsproject.service.ParameterService;
import com.project.cmsproject.service.ProductService;
import com.project.cmsproject.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/admin")
@Tag(name="InternetService Admin API")
@CrossOrigin(origins = "*", maxAge = 3600)

public class AdminController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private ProductService productService;

    @Autowired
    private FeatureService featureService;

    @Autowired
    private ParameterService parameterService;

    @Operation(summary = "Create Product in APP")
    @PostMapping("/addproduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        logger.info("Inside addProduct " + AdminController.class.getName());
        Product prd = productService.createproduct(product);
        logger.info("Call to service layer method is success");
        return new ResponseEntity<Product>(prd, HttpStatus.CREATED);
    }

    @Operation(summary = "Create Feature in APP")
    @PostMapping("/addfeature")
    public ResponseEntity<Features> addFeature(@RequestBody Features feature) {
        logger.info("Inside addFeatures " + AdminController.class.getName());
        Features features = featureService.createFeature(feature);
        logger.info("Call to service layer method is success");
        return new ResponseEntity<Features>(features, HttpStatus.CREATED);
    }

    @Operation(summary = "Get Products By id")
    @GetMapping("/getproductsbyId")
    public ResponseEntity<?> getProductById(@RequestParam("id") Long productId) {
        logger.info("Inside getProductById " + AdminController.class.getName());
        try {
            Product product = productService.getProductById(productId);
            logger.info("Call to service layer method is success");
            return new ResponseEntity<Product>(product, HttpStatus.OK);
        } catch (ProductNotFoundException ex) {
            logger.error("ProductNotFoundException: " + ex.getMessage());
            return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Get Products By name")
    @GetMapping("/getproductsbyName")
    public ResponseEntity<?> getProductByName(@RequestParam("name") String name) {
        logger.info("Inside getProductByName " + AdminController.class.getName());
        try {
            Product product = productService.getProductByName(name);
            logger.info("Call to service layer method is success");
            return new ResponseEntity<Product>(product, HttpStatus.OK);
        } catch (ProductNotFoundException ex) {
            logger.error("ProductNotFoundException: " + ex.getMessage());
            return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Get All Products")
    @GetMapping("/getallproducts")
    public ResponseEntity<List<Product>> getAllProducts() {
        logger.info("Inside getAllProducts " + AdminController.class.getName());
        List<Product> products = productService.getAllProducts();
        logger.info("Call to service layer method is success");
        return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
    }

    @Operation(summary = "Update Product in APP")
    @PutMapping("/updateproduct")
    public ResponseEntity<?> updateProduct(@RequestParam("id") Long id, @RequestBody Product product) {
        logger.info("Inside updateProduct " + AdminController.class.getName());
        try {
            Product updatedProduct = productService.updateProduct(id, product);
            logger.info("Call to service layer method is success");
            return new ResponseEntity<Product>(updatedProduct, HttpStatus.OK);
        } catch (ProductNotFoundException ex) {
            logger.error("ProductNotFoundException: " + ex.getMessage());
            return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary="Delete Feature By Id")
    @PostMapping("/deletefeaturebyid")
    public ResponseEntity<String> deleteFeatureById(@RequestBody  Long featureId) {
        logger.info("Inside DeleteFeatureById " + AdminController.class.getName());
        try {
            String deletefeature = featureService.deleteFeatureById(featureId);
            logger.info("Call to service layer method is success");
            return new ResponseEntity<String>(deletefeature, HttpStatus.OK);
        } catch (FeatureNotFoundException ex) {
            logger.error("FeatureNotFoundException: " + ex.getMessage());
            return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary="Delete Parameter By Id")
    @PostMapping("/deleteparameterbyid")
    public ResponseEntity<String> deleteParameterById(@RequestBody Long parameterId) {
        logger.info("Inside DeleteParameterById " + AdminController.class.getName());
        try {
            String deleteparameter = parameterService.deleteParameterById(parameterId);
            logger.info("Call to service layer method is success");
            return new ResponseEntity<String>(deleteparameter, HttpStatus.OK);
        } catch (ParameterNotFoundException ex) {
            logger.error("ParameterNotFoundException: " + ex.getMessage());
            return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary="Delete Product By Id")
    @PostMapping("/deleteproductbyid")
    public ResponseEntity<String> deleteProductById(@RequestBody Long productId) {
        logger.info("Inside DeleteProductById " + AdminController.class.getName());
        try {
            String deleteproduct = productService.deleteProductid(productId);
            logger.info("Call to service layer method is success");
            return new ResponseEntity<String>(deleteproduct, HttpStatus.OK);
        } catch (ProductNotFoundException ex) {
            logger.error("ProductNotFoundException: " + ex.getMessage());
            return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
    @Autowired
    private UserService userService;

    @PutMapping("/users/updaterole")
    public ResponseEntity<String> updateUserRole(@RequestParam("id") Integer userId, @RequestBody Role role) {
        try {
            String result = userService.updateRole(userId, role);
            return ResponseEntity.ok(result);
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } 
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the user role.");
        }
    }
    
    
   
}

    
    
    
    

