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

import com.example.backend.dto.AnyOfDto;
import com.example.backend.dto.PolicySetDto;
import com.example.backend.dto.TargetDto;
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
	
	@RequestMapping(value = "anyOf/{parentId}/{selectedParentType}/{policySetId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PolicySetDto> addTargetContent(@PathVariable("parentId") String parentId, @PathVariable("selectedParentType") String selectedParentType, @PathVariable("policySetId") String policySetId, @RequestBody AnyOfDto anyOfDto) {
		return new ResponseEntity<>(this.targetService.addAnyOf(parentId, selectedParentType, policySetId, anyOfDto), HttpStatus.OK);
	}
	
	@RequestMapping(value = "anyOf/{id}/{parentId}/{selectedParentType}/{policySetId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<AnyOfDto> getAnyOf(@PathVariable("id") String id, @PathVariable("parentId") String parentId, @PathVariable("selectedParentType") String selectedParentType, @PathVariable("policySetId") String policySetId) {
		return new ResponseEntity<>(this.targetService.getAnyOf(id, parentId, selectedParentType, policySetId), HttpStatus.OK);
	}
	
	@RequestMapping(value = "anyOf/{id}/{parentId}/{selectedParentType}/{policySetId}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PolicySetDto> updateAnyOf(@PathVariable("id") String id, @PathVariable("parentId") String parentId, @PathVariable("selectedParentType") String selectedParentType, @PathVariable("policySetId") String policySetId, @RequestBody AnyOfDto anyOfDto) {
		return new ResponseEntity<>(this.targetService.updateAnyOf(id, parentId, selectedParentType, policySetId, anyOfDto), HttpStatus.OK);
	}
	
	@RequestMapping(value = "anyOf/{id}/{parentId}/{selectedParentType}/{policySetId}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PolicySetDto> deleteAnyOf(@PathVariable("id") String id, @PathVariable("parentId") String parentId, @PathVariable("selectedParentType") String selectedParentType, @PathVariable("policySetId") String policySetId) {
		this.targetService.deleteAnyOf(id, parentId, selectedParentType, policySetId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}


