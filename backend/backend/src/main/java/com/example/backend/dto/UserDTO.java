package com.example.backend.dto;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;

import com.example.backend.model.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
	
	private Long id;
	
	@NotBlank
	@Size(min = 3, max = 8)
	private String name;
	
	@NotBlank
	@Size(min = 3, max = 20)
	private String surname;

	@NotBlank
	@Size(min = 3, max = 20)
	private String username;
	
	@NotBlank
	@Email
	@Size(min = 3, max = 20)
	private String email;
	
	@NotBlank
	@Size(min = 8, max = 20)
	private String password;
	
	@NotBlank
	@Size(min = 8, max = 20)
	private String repeated_passoword;
	
	public UserDTO(User user) {
		this.id = user.getId();
		this.name = user.getName();
		this.surname = user.getSurname();
		this.email = user.getEmail();
		this.password = user.getPassword();
		this.username = user.getUsername();
	}
		
}