package com.prodapt.cmsprojectmain.service;

import com.prodapt.cmsprojectmain.entities.Features;
import com.prodapt.cmsprojectmain.exceptions.FeatureNotFoundException;

public interface FeatureService {
	public Features createFeature(Features feature);
	
	
	public String deleteFeatureById(Long featureId) throws FeatureNotFoundException;

}
