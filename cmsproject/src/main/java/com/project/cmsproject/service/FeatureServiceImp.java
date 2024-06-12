package com.project.cmsproject.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.cmsproject.entities.Features;
import com.project.cmsproject.exceptions.FeatureNotFoundException;
import com.project.cmsproject.repsoitories.FeatureRepository;


@Service


public class FeatureServiceImp implements FeatureService {

	private static final Logger logger = LoggerFactory.getLogger(ProductServiceImp.class);
	@Autowired
	private FeatureRepository repo;
	@Override
	public Features createFeature(Features feature) {
		// TODO Auto-generated method stub
		return repo.save(feature);
	}
	
	@Override
	public String deleteFeatureById(Long featureId) throws FeatureNotFoundException {
	    Optional<Features> deletedFeature = repo.findById(featureId);
	    if (deletedFeature.isPresent()) {
	        repo.deleteById(featureId);
	        logger.info("Feature with ID " + featureId + " has been deleted.");
	        return "Feature deleted sucessfully";
	    } else {
	        logger.info("Feature with ID " + featureId + " does not exist in the record.");
	        throw new FeatureNotFoundException();
	    }
	}
	
	

	}



