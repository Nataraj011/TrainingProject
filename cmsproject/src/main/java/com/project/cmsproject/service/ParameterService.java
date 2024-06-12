package com.project.cmsproject.service;

import com.project.cmsproject.entities.Parameter;
import com.project.cmsproject.exceptions.ParameterNotFoundException;

public interface ParameterService {
    public Parameter createParameter(Parameter parameter);
    
    public String deleteParameterById(Long parameterId)throws ParameterNotFoundException;
}
