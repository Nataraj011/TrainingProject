package com.project.cmsproject.repsoitories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.cmsproject.entities.ERole;
import com.project.cmsproject.entities.Role;
 

 
 
@Repository
public interface RoleRepository extends CrudRepository<Role, Integer> {
  Optional<Role> findByName(ERole name);
}