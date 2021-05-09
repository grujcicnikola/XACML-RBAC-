package com.example.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

//transakciono izvlacimo podatke o korisniku iz bace i kreiramo UserPrincipe objekat
//koji ce se koristiti za kreiranje tokena
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository repository;

	@Override 
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = repository.findByUsername(username)
				.orElseThrow(() -> 
                new UsernameNotFoundException("User Not Found with -> email : " + username)
		);
		
		return UserPrinciple.build(user); 
	}

}
