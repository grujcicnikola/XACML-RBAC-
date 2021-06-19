package com.example.backend.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.dto.RuleDto;
import com.example.backend.service.RuleValidationService;

@Service
public class RuleValidationServiceImpl implements RuleValidationService {

	@Override
	public boolean addRule(List<RuleDto> rules, RuleDto ruleDto) {
		for (int i = 0; i < rules.size(); i++) {
			if (rules.get(i).getRuleId()
					.contentEquals(ruleDto.getRuleId())) {
				return false;
			}

		}
		return true;
	}

}
