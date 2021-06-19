package com.example.backend.service;

import com.example.backend.dto.PolicySetDto;

public interface PolicySetValidationService {

	boolean addPolicySet(PolicySetDto policySetDto, String username);

}
