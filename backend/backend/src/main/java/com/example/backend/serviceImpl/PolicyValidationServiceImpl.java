package com.example.backend.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.converter.PolicySetDtoConverter;
import com.example.backend.dto.PolicyDto;
import com.example.backend.dto.PolicySetDto;
import com.example.backend.model.PolicySetDocument;
import com.example.backend.repository.PolicySetDocumentRepository;
import com.example.backend.service.PolicyValidationService;

@Service
public class PolicyValidationServiceImpl implements PolicyValidationService {

	@Autowired
	private PolicySetDocumentRepository policySetDocumentRepository;
	@Autowired
	private PolicySetDtoConverter policySetDtoConverter;
	
	
	@Override
	public boolean addPolicy(PolicyDto policyDto, String username) {
		List<PolicySetDocument> documents =this.policySetDocumentRepository.findByCreator(username);
		for(int i = 0; i<documents.size(); i++) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(documents.get(i));
			for (int j = 0; j < policySetDto.getPolicies().size(); j++) {
				if (policySetDto.getPolicies().get(j).getPolicyId()
						.contentEquals(policyDto.getPolicyId())) {
					return false;
				}
			}
		}
		return true;
	}

}
