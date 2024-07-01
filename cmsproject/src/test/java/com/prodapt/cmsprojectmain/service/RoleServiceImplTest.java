package com.prodapt.cmsprojectmain.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.prodapt.cmsprojectmain.entities.ERole;
import com.prodapt.cmsprojectmain.entities.Role;
import com.prodapt.cmsprojectmain.repositories.RoleRepository;
@SpringBootTest
class RoleServiceImplTest {
 
	@Mock
	private RoleRepository repo;
 
	@InjectMocks
	private RoleServiceImpl roleService;
 
	private Role role;
 
	@BeforeEach
	public void setup() {
		role = new Role();
		role.setId(1);
		role.setName(ERole.ROLE_ADMIN);
	}
 
	@Test
	void testFindRoleByName() {
 
		// Arrange
		when(repo.findByName(ERole.ROLE_ADMIN)).thenReturn(Optional.of(role));
 
		// Act
		Optional<Role> result = roleService.findRoleByName(ERole.ROLE_ADMIN);
 
		// Assert
		assertNotNull(role);
		assertEquals(Optional.of(role), result);
 
	}
 
	@Test
	void testFindRoleById() {
 
		// Arrange
		when(repo.findById(1)).thenReturn(Optional.of(role));
 
		// Act
		Optional<Role> result = roleService.findRoleById(1);
 
		// Assert
		assertNotNull(role);
		assertEquals(Optional.of(role), result);
 
	}
}