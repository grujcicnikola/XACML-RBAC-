package com.example.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.LoginInfoDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.jwt.JwtProvider;
import com.example.backend.jwt.JwtResponse;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "https://localhost:4200")
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private UserRepository userRep;
	@Autowired
	private AuthenticationManager authenticationManager;

	@RequestMapping(value = "login", method = RequestMethod.POST)
	public ResponseEntity<?> authenticateUser(@RequestBody LoginInfoDTO loginInfo) {
		System.out.print(loginInfo.getUsername()+" "+loginInfo.getPassword());
		Optional<User> user = userService.findUserByUsername(loginInfo.getUsername());

		if (user.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {

			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginInfo.getUsername(), loginInfo.getPassword()));

			SecurityContextHolder.getContext().setAuthentication(authentication);

			String jwt = jwtProvider.generateJwtToken(authentication);
			UserDetails userDetails = (UserDetails) authentication.getPrincipal();

			return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));

		}

	}
	
	@RequestMapping(value = "register", method = RequestMethod.POST)
	public ResponseEntity<?> register(@RequestBody UserDTO userDto) {
		Optional<User> user = userService.findUserByUsername(userDto.getUsername());

		if (user.isPresent()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			User newUser = new User(userDto);
			this.userService.register(newUser);
			return new ResponseEntity<>(userDto, HttpStatus.OK);
		}
		
	}


	@RequestMapping(value = "getUserByUsername/{username}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDTO> getUserByUserName(@PathVariable("username") String username) {

		Optional<User> user = userService.findUserByUsername(username);

		if (user == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(new UserDTO(user.get()), HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/logout/{username}/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDTO> logout(@PathVariable("username") String username) {
		Optional<User> user = userService.findUserByUsername(username);
		return new ResponseEntity<>(new UserDTO(user.get()), HttpStatus.OK);
	}

}
