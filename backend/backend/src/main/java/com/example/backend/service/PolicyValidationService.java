package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.PolicyDto;

public interface PolicyValidationService {

	boolean addPolicy(List<PolicyDto> policies, PolicyDto policyDto);

}
