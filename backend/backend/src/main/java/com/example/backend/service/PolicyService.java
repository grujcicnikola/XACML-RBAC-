package com.example.backend.service;

import com.example.backend.dto.PolicyDto;
import com.example.backend.dto.PolicySetDto;

public interface PolicyService {

	PolicyDto getPolicy(String id, String idPolicySet);
	
	PolicySetDto addPolicy(String id, PolicyDto policyDto, String username);
	
	PolicySetDto updatePolicy(String id, PolicyDto policyDto, String username);

	void deletePolicy(String id, String idPolicySet);

}
