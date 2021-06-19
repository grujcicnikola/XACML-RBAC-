package com.example.backend.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.dto.PolicyDto;
import com.example.backend.service.PolicyValidationService;

@Service
public class PolicyValidationServiceImpl implements PolicyValidationService {

	@Override
	public boolean addPolicy(List<PolicyDto> policies, PolicyDto policyDto) {
		for (int i = 0; i < policies.size(); i++) {
			if (policies.get(i).getPolicyId()
					.contentEquals(policyDto.getPolicyId())) {
				return false;
			}

		}
		return true;
	}

}
