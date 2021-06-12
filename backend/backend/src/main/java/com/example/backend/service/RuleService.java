package com.example.backend.service;

import com.example.backend.dto.PolicySetDto;
import com.example.backend.dto.RuleDto;

public interface RuleService {

	PolicySetDto addRule(String parentId, String policySetId, RuleDto ruleDto);

}
