package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.RuleDto;

public interface RuleValidationService {

	boolean addRule(List<RuleDto> rules, RuleDto ruleDto);

}
