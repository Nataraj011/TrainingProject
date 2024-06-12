package com.project.cmsproject.repsoitories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.cmsproject.entities.Features;




@Repository
public interface FeatureRepository extends CrudRepository<Features, Long> {
	public Optional<Features> findById(Long Id);
	
}