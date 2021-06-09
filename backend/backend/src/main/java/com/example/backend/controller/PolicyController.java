package com.example.backend.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBException;
import javax.xml.stream.XMLStreamException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.PolicyDto;
import com.example.backend.dto.PolicySetDto;
import com.example.backend.dto.RuleDto;
import com.example.backend.dto.UserDto;
import com.example.backend.jwt.JwtAuthTokenFilter;
import com.example.backend.jwt.JwtProvider;
import com.example.backend.model.PolicySetDocument;
import com.example.backend.model.User;
import com.example.backend.security.UserDetailsServiceImpl;
import com.example.backend.security.UserPrinciple;
import com.example.backend.service.PolicySetDocumentService;
import com.example.backend.service.UserService;
import com.example.backend.service.XMLMarshalService;

@RestController
@RequestMapping("policy")
@CrossOrigin(origins = "http://localhost:4200")
public class PolicyController {
	
	@Autowired
	private XMLMarshalService xmlMarshalService;
	
	@Autowired
	private PolicySetDocumentService policySetDocumentService;
	
	@RequestMapping(value = "getPolicySet", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PolicySetDto> getPolicySet() {
		return new ResponseEntity<>(createPolicySetForTesting(), HttpStatus.OK);
	}
	
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
	
	@RequestMapping(value = "policy/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PolicyDto> policy(@PathVariable("id") Long id) {
		return new ResponseEntity<>(createPolicySetForTesting().getPolicies().get(0), HttpStatus.OK);
	}
	
	@RequestMapping(value = "rule/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RuleDto> rule(@PathVariable("id") Long id) {
		return new ResponseEntity<>(createPolicySetForTesting().getPolicies().get(0).getRules().get(0), HttpStatus.OK);
	}
	
	@RequestMapping(value = "policySet", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PolicySetDto> createPolicySet(@RequestBody PolicySetDto policySetDto, Principal principal) {
		return new ResponseEntity<>(this.policySetDocumentService.createPolicySet(policySetDto, principal.getName()), HttpStatus.OK);
	}
	
	@RequestMapping(value = "policySet", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PolicySetDto> updatePolicySet(@RequestBody PolicySetDto policySetDto, Principal principal) {
		return new ResponseEntity<>(this.policySetDocumentService.updatePolicySet(policySetDto, principal.getName()), HttpStatus.OK);
	}

	
	@RequestMapping(value = "testMarshalingPolicySet", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PolicySetDto> testMarshalingPolicySet(Principal principal) {
		PolicySetDto policySetDto = createPolicySetForTesting();
		
			String xml = xmlMarshalService.marshal(policySetDto);
			PolicySetDto policySetDto2 = xmlMarshalService.unmarshal(xml);
			String xml2 = xmlMarshalService.marshal(policySetDto2);
			PolicySetDocument policySetDocument= policySetDocumentService.savePolicySet(xml2, principal.getName());
			PolicySetDocument policySetDocument1= policySetDocumentService.getPolicySet(policySetDocument.getId());
			//System.out.print(policySetDocument1.getId());
		
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	public PolicySetDto createPolicySetForTesting() {
		RuleDto ruleDto = RuleDto.builder()
				.id("1")
				.effect("efekat")
				.ruleId("pravo id")
				.description("opis")
				.created("02/23/2017")
				.creator("ngrujcic")
				.build();
		PolicyDto policyDto = PolicyDto.builder()
				.id("2")
				.xmlns("xmlns")
				.xsi("xsi")
				.policyId("policyId")
				.version("version")
				.ruleCombiningAlgId("ruleCombiningAlgId")
				.description("opis")
				.schemaLocator("schemaLocator")
				.description("opis")
				.rules(Arrays.asList(ruleDto))
				.created("02/23/2017")
				.creator("ngrujcic")
				.build();
		PolicyDto policyDto2 = PolicyDto.builder()
				.id("3")
				.xmlns("xmlns")
				.xsi("xsi")
				.policyId("policyId")
				.version("version")
				.ruleCombiningAlgId("ruleCombiningAlgId")
				.description("opis")
				.schemaLocator("schemaLocator")
				.description("opis")
				.rules(new ArrayList<>())
				.created("02/23/2017")
				.creator("ngrujcic")
				.build();
		PolicySetDto policySetDto = PolicySetDto.builder()
				.xmlns("xmlns")
				.xsi("xsi")
				.policySetId("policySetId")
				.version("version")
				.policyCombiningAlgId("policyCombiningAlgId")
				.description("opis")
				.policySetIdReference("policySetIdReference")
				.policyIdReference("policyIdReference")
				.description("opis")
				.policies(Arrays.asList(policyDto, policyDto2))
				.created("02/23/2017")
				.creator("ngrujcic")
				.build();
		return policySetDto;
		
	}

}
