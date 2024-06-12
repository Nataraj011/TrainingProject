package com.project.cmsproject.service;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.cmsproject.entities.Parameter;
import com.project.cmsproject.exceptions.ParameterNotFoundException;
import com.project.cmsproject.repsoitories.ParameterRepository;

@Service
@Transactional
public class ParameterServiceImpl implements ParameterService {

    @Autowired
    private ParameterRepository repo;
    
    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImp.class);

    @Override
    public Parameter createParameter(Parameter parameter) {
        return repo.save(parameter);
    }

	@Override
	public String deleteParameterById(Long parameterId) throws ParameterNotFoundException{
		Optional<Parameter>deleteparameter=repo.findById(parameterId);
		if(deleteparameter.isPresent()) {
			repo.deleteById(parameterId);
			logger.info("Parameter "+parameterId+" exists in record");
			return "Parameter deleted sucessfully";
			
		}else {
			logger.info("Parameter "+parameterId+" exists in record");
			throw new ParameterNotFoundException();
		}
	}
		
		
		
	}

