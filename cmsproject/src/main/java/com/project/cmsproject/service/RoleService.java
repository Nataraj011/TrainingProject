package com.project.cmsproject.service;



import java.util.Optional;

import com.project.cmsproject.entities.ERole;
import com.project.cmsproject.entities.Role;



public interface RoleService {
	
	public Optional<Role> findRoleByName(ERole role);
	
	public Optional<Role> findRoleById(Integer id);

}