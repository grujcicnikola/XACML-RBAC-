package com.example.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("test")
@CrossOrigin(origins = "https://localhost:4200")
public class TestController {
	
	@RequestMapping(value = "/test", method=RequestMethod.GET)
	public ResponseEntity<?> addBuyerInfo()
	{
		//System.out.println("test");
		return new ResponseEntity<>(HttpStatus.OK);
	}

}

