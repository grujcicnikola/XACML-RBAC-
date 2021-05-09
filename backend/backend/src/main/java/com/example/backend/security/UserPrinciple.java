package com.example.backend.security;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.backend.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

//Informaije o korisniku koji ce se kasnije prebacivati u objekte za autentifikaciju
public class UserPrinciple implements UserDetails {

	private Long id;

	private String name;

	private String username;

	private String email;

	@JsonIgnore
	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	public UserPrinciple(Long id, String name, String username, String email, String password) {
		this.id = id;
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public static UserPrinciple build(User user) {
		return new UserPrinciple(user.getId(), user.getName(), user.getUsername(), user.getEmail(), user.getPassword());
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
