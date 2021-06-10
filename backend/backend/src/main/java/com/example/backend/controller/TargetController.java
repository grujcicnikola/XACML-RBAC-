package com.example.backend.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.PolicySetDto;
import com.example.backend.service.PolicySetDocumentService;
import com.example.backend.service.TargetService;
import com.example.backend.service.XMLMarshalService;

@RestController
@RequestMapping("target")
@CrossOrigin(origins = "http://localhost:4200")
public class TargetController {
	
	@Autowired
	private TargetService targetService;
	
	@RequestMapping(value = "target/{policySetId}/{itemId}/{type}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> addTarget(@PathVariable("policySetId") String policySetId, @PathVariable("itemId") String itemId, @PathVariable("type") String type) {
		this.targetService.addTarget(policySetId, itemId, type);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "target/{parentId}/{selectedParentType}/{policySetId}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> deleteTarget(@PathVariable("parentId") String parentId, @PathVariable("selectedParentType") String selectedParentType, @PathVariable("policySetId") String policySetId) {
		this.targetService.deleteTarget(parentId, selectedParentType, policySetId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}


