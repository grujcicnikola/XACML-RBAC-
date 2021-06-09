package com.example.backend.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

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
import com.example.backend.service.XMLMarshalService;

@RestController
@RequestMapping("policySet")
@CrossOrigin(origins = "http://localhost:4200")
public class PolicySetController {

	@Autowired
	private XMLMarshalService xmlMarshalService;
	
	@Autowired
	private PolicySetDocumentService policySetDocumentService;
	
//	@RequestMapping(value = "getPolicySet", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<PolicySetDto> getPolicySet() {
//		return new ResponseEntity<>(createPolicySetForTesting(), HttpStatus.OK);
//	}
	
	@RequestMapping(value = "getPolicySets", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<PolicySetDto>> getPolicySets(Principal principal) {
		return new ResponseEntity<>(this.policySetDocumentService.getPolicySets(principal.getName()), HttpStatus.OK);
	}
	
	@RequestMapping(value = "policySet/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PolicySetDto> policySet(@PathVariable("id") String id) {
		return new ResponseEntity<>(this.policySetDocumentService.getPolicySetDto(id), HttpStatus.OK);
	}
	
	@RequestMapping(value = "downloadPolicySet/{id}", method = RequestMethod.GET, produces = MediaType.TEXT_XML_VALUE)
	public void downloadPolicySet(@PathVariable("id") String id, HttpServletResponse httpServletResponse) throws IOException {
		this.policySetDocumentService.downloadPolicySetDto(id,httpServletResponse);
		httpServletResponse.getOutputStream().flush();
	}
	
	@RequestMapping(value = "policySet", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PolicySetDto> createPolicySet(@RequestBody PolicySetDto policySetDto, Principal principal) {
		return new ResponseEntity<>(this.policySetDocumentService.createPolicySet(policySetDto, principal.getName()), HttpStatus.OK);
	}
	
	@RequestMapping(value = "policySet", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PolicySetDto> updatePolicySet(@RequestBody PolicySetDto policySetDto, Principal principal) {
		return new ResponseEntity<>(this.policySetDocumentService.updatePolicySet(policySetDto, principal.getName()), HttpStatus.OK);
	}
}
