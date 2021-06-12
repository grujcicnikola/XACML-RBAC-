package com.example.backend.service;

import com.example.backend.dto.PolicySetDto;
import com.example.backend.dto.RuleDto;

public interface RuleService {

	PolicySetDto addRule(String parentId, String policySetId, RuleDto ruleDto);

	RuleDto getRule(String id, String parentId, String policySetId);

	PolicySetDto updateRule(String id, String parentId, String policySetId, RuleDto ruleDto);

	void deleteRule(String id, String parentId, String policySetId);

}
