package com.example.backend.service;

import com.example.backend.dto.ConditionDto;
import com.example.backend.dto.PolicySetDto;

public interface ConditionService {

	PolicySetDto addCondition(String ruleId, String policyId, String policySetId, ConditionDto conditionDto);

}
