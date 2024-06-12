package com.project.cmsproject.service;

import java.util.Optional;



import com.project.cmsproject.entities.ERole;

import com.project.cmsproject.entities.Role;
import com.project.cmsproject.entities.User;
import com.project.cmsproject.exceptions.UserNotFoundException;



public interface UserService {

	public User addUserEntity(User user);

	public String updateRole(Integer userId, Role role)throws UserNotFoundException;

	public Optional<User> findByUsername(String username);

	public Boolean existsByUsername(String username);

	public Optional<User> findByRole(ERole role);
	
	    User getUserById(Integer id) throws UserNotFoundException; 
	    
	   
	
	
	
}