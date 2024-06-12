package com.project.cmsproject.service;

import java.util.Optional;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.cmsproject.entities.ERole;
import com.project.cmsproject.entities.Role;
import com.project.cmsproject.entities.User;
import com.project.cmsproject.exceptions.UserNotFoundException;
import com.project.cmsproject.repsoitories.RoleRepository;
import com.project.cmsproject.repsoitories.UserRepository;


@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository repo;
	
	@Autowired
	RoleRepository rep;
	
	
	
	
	@Override
	public String updateRole(Integer userId, Role role) throws UserNotFoundException{
		Optional<User> user= repo.findById(userId);
		if(user.isPresent())
		{
		  user.get().setRole(role);
		  repo.save(user.get());
		  return "Role Updated Successfully!!!";
		  
		}
		else  {
			throw new UserNotFoundException("User with" + userId+"not found");
		}
		
			
		}
	

	@Override
	public User addUserEntity(User user) {
		User userEntity=repo.save(user);
		return userEntity;
	}

	@Override
	public Optional<User> findByUsername(String username) {
		Optional<User>  user =repo.findByUsername(username);
		return user;
	}

	@Override
	public Boolean existsByUsername(String username) {
		Boolean b=repo.existsByUsername(username);
		return b;
	}

	@Override
	public Optional<User> findByRole(ERole role) {
		 Optional<User>  user =repo.findByRole(role);
		return user;
	}
	
	 @Override
	    public User getUserById(Integer id) throws UserNotFoundException {
	        return repo.findById(id)
	            .orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found"));
	    }
	 
	

	
	
	

}
