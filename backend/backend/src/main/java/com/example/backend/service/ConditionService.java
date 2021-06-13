package com.example.backend.service;

import com.example.backend.dto.ApplyDto;
import com.example.backend.dto.ConditionDto;
import com.example.backend.dto.PolicySetDto;

public interface ConditionService {

	PolicySetDto addCondition(String ruleId, String policyId, String policySetId, ConditionDto conditionDto);
	
	ConditionDto getCondition(String ruleId, String policyId, String policySetId);

	PolicySetDto updateCondition(String ruleId, String policyId, String policySetId, ConditionDto conditionDto);
	
	void deleteCondition(String ruleId, String policyId, String policySetId);

	PolicySetDto addApply(String ruleId, String policyId, String policySetId, ApplyDto applyDto);
	
	PolicySetDto updateApply(String ruleId, String policyId, String policySetId, ApplyDto applyDto);
	
	void deleteApply(String applyId, String ruleId, String policyId, String policySetId);
	
	ApplyDto getApply(String applyId, String ruleId, String policyId, String policySetId);
}
