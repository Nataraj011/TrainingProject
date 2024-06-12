package com.project.cmsproject.repsoitories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.project.cmsproject.entities.ERole;
import com.project.cmsproject.entities.User;

public interface UserRepository extends CrudRepository<User,Integer>{
	
	public Optional<User> findByUsername(String username);

	public Boolean existsByUsername(String username);

	public Boolean existsByEmail(String email);
	
	public Optional<User> findByRole(ERole role);
}


