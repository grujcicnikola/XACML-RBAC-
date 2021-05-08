package com.example.backend.service;

import java.util.Optional;

import com.example.backend.dto.UserDTO;
import com.example.backend.model.User;

public interface UserService {

	Optional<User> findUserByUsername(String username);
	
	User register(User user);
	
	void deleteUser(User user);
	
	User findUserByEmail(String email);

}
