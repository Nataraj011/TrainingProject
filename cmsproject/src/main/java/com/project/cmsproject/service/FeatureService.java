package com.project.cmsproject.service;

import com.project.cmsproject.entities.Features;
import com.project.cmsproject.exceptions.FeatureNotFoundException;

public interface FeatureService {
	public Features createFeature(Features feature);
	
	
	public String deleteFeatureById(Long featureId) throws FeatureNotFoundException;

}
