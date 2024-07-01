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

import com.prodapt.cmsprojectmain.entities.Features;
import com.prodapt.cmsprojectmain.exceptions.FeatureNotFoundException;
import com.prodapt.cmsprojectmain.repositories.FeatureRepository;
 
@SpringBootTest
class FeatureServiceImplTest {
 
	@Mock
	private FeatureRepository repo;
 
	@InjectMocks
	private FeatureServiceImpl featureService;
 
	private Features feature;
 
	@BeforeEach
	public void setup() {
		feature = new Features();
		feature.setId(1L);
		feature.setName("Test Feature");
	}
 
	@Test
	void testCreateFeatureSuccess() {
		// Arrange
		Features feature = new Features();
		feature.setName("Test Feature");
 
		when(repo.save(feature)).thenReturn(feature);
 
		// Act
		Features result = featureService.createFeature(feature);
 
		// Assert
		assertNotNull(result);
		assertEquals(feature, result);
	}
 
	@Test
	void testCreateFeatureFailure() {
		// Arrange
		Features feature = new Features();
		feature.setName("Test Feature");
 
		when(repo.save(feature)).thenThrow(new RuntimeException("Error saving feature"));
 
		// Act and Assert
		assertThrows(RuntimeException.class, () -> {
			featureService.createFeature(feature);
		});
	}
 
	@Test
	void testDeleteFeatureByIdSuccess() throws FeatureNotFoundException {
		// Arrange
		Long featureId = 1L;
		when(repo.findById(featureId)).thenReturn(Optional.of(new Features()));
 
		// Act
		String result = featureService.deleteFeatureById(featureId);
 
		// Assert
		assertEquals("Feature deleted successfully", result);
	}
 
	@Test
	void testDeleteFeatureByIdFailure() {
		// Arrange
		Long featureId = 1L;
		when(repo.findById(featureId)).thenReturn(Optional.empty());
 
		// Act and Assert
		assertThrows(FeatureNotFoundException.class, () -> {
			featureService.deleteFeatureById(featureId);
		});
	}
}