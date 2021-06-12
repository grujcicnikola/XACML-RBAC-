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
import com.example.backend.dto.PolicyDto;
import com.example.backend.dto.PolicySetDto;
import com.example.backend.dto.RuleDto;
import com.example.backend.service.PolicyService;
import com.example.backend.service.PolicySetDocumentService;
import com.example.backend.service.RuleService;
import com.example.backend.service.XMLMarshalService;

@RestController
@RequestMapping("rule")
@CrossOrigin(origins = "http://localhost:4200")
public class RuleController {
	
	@Autowired
	private XMLMarshalService xmlMarshalService;
	@Autowired
	private PolicySetDocumentService policySetDocumentService;
	@Autowired
	private RuleService ruleService;
	
	
//	@RequestMapping(value = "policy/{id}/{idPolicySet}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<PolicyDto> policy(@PathVariable("id") String id, @PathVariable("idPolicySet") String idPolicySet) {
//		return new ResponseEntity<>(this.policyService.getPolicy(id, idPolicySet), HttpStatus.OK);
//	}
	
	@RequestMapping(value = "rule/{parentId}/{policySetId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PolicySetDto> addRule(@PathVariable("parentId") String parentId, @PathVariable("policySetId") String policySetId, @RequestBody RuleDto ruleDto) {
		return new ResponseEntity<>(this.ruleService.addRule(parentId, policySetId, ruleDto), HttpStatus.OK);
	}
	
}