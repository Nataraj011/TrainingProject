package com.prodapt.cmsprojectmain.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.prodapt.cmsprojectmain.entities.Product;
import com.prodapt.cmsprojectmain.entities.Quotation;
import com.prodapt.cmsprojectmain.entities.UserEntity;
import com.prodapt.cmsprojectmain.exceptions.QuotationNotFoundException;
import com.prodapt.cmsprojectmain.repositories.QuotationRepository;
 
@SpringBootTest
public class QuotationServiceImplTest {
 
	@Mock
	private QuotationRepository quotationRepository;
 
	@InjectMocks
	private QuotationServiceImpl quotationService;
 
	private Quotation quotation;
 
	@BeforeEach
	public void setup() {
		quotation = new Quotation();
		quotation.setId(1L);
		quotation.setUserEntity(new UserEntity());
		quotation.setProduct(new Product());
		quotation.setTotalAmount(100.0);
		quotation.setQuantity(2);
	}
 
	@Test
	void testAddQuotationSuccess() {
		// Arrange
		when(quotationRepository.save(quotation)).thenReturn(quotation);
 
		// Act
		Quotation result = quotationService.addQuotation(quotation);
 
		// Assert
		assertNotNull(quotation);
		assertEquals(quotation, result);
	}
 
	@Test
	void testAddQuotationFailure() {
		// Arrange
		when(quotationRepository.save(quotation)).thenThrow(new RuntimeException("Error saving quotation"));
 
		// Act and Assert
		assertThrows(RuntimeException.class, () -> {
			quotationService.addQuotation(quotation);
		});
	}
 
	@Test
	void testGetQuotationByIdSuccess() throws QuotationNotFoundException {
		// Arrange
		when(quotationRepository.findById(1L)).thenReturn(Optional.of(quotation));
 
		// Act
		Quotation result = quotationService.getQuotationById(1L);
 
		// Assert
		assertNotNull(quotation);
		assertEquals(quotation, result);
	}
 
	@Test
	void testGetQuotationByIdFailure() {
		// Arrange
		when(quotationRepository.findById(1L)).thenReturn(Optional.empty());
 
		// Act and Assert
		assertThrows(QuotationNotFoundException.class, () -> {
			quotationService.getQuotationById(1L);
		});
	}
 
}