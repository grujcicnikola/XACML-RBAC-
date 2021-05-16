package com.example.backend.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.PolicyDto;
import com.example.backend.dto.PolicySetDto;
import com.example.backend.dto.RuleDto;
import com.example.backend.dto.UserDto;
import com.example.backend.model.User;

@RestController
@RequestMapping("policy")
@CrossOrigin(origins = "https://localhost:4200")
public class PolicyController {
	
	@RequestMapping(value = "getPolicySet", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PolicySetDto> getUserByUserName() {
		return new ResponseEntity<>(createPolicySetForTesting(), HttpStatus.OK);
	}

	
	public PolicySetDto createPolicySetForTesting() {
		RuleDto ruleDto = RuleDto.builder()
				.id(1L)
				.effect("efekat")
				.ruleId("pravo id")
				.description("opis")
				.created("02/23/2017")
				.creator("ngrujcic")
				.build();
		PolicyDto policyDto = PolicyDto.builder()
				.id(2L)
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
				.id(4L)
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
				.id(3L)
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
	
	/*
	 *const tasks: TaskModel[] = [
      {
        id: 1,
        type: TypesEnum.PolicySet,
        creator: 'ngrujcic',
        created: new Date("02/23/2017"),
        isParent: true,
        ParentID: null,
      },
      {
        id: 2,
        type: TypesEnum.Policy,
        creator: 'ngrujcic',
        created: new Date("02/23/2017"),
        isParent: true,
        ParentID: 1
      },
      {
        id: 3,
        type: TypesEnum.Rule,
        creator: 'ngrujcic',
        created: new Date("02/23/2017"),
        isParent: true,
        ParentID: 2
      },
     
    ];
    return tasks; */
}
