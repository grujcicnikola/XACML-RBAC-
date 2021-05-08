package com.example.backend.serviceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.UserDTO;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {


	@Autowired
    private PasswordEncoder encoder;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public Optional<User> findUserByUsername(String username) {
		// TODO Auto-generated method stub
		return userRepository.findByUsername(username);
	}

	@Override
	public User register(User user) {
		// TODO Auto-generated method stub
		String encodedPassword = encoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		return userRepository.save(user);
	}

	@Override
	public void deleteUser(User user) {
		// TODO Auto-generated method stub
		System.out.println("Brise se user " + user.getUsername());
		userRepository.delete(user);
	}

	@Override
	public User findUserByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepository.findByEmail(email);
	}


}