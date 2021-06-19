package com.example.backend.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.converter.PolicySetDtoConverter;
import com.example.backend.dto.PolicyDto;
import com.example.backend.dto.PolicySetDto;
import com.example.backend.model.PolicySetDocument;
import com.example.backend.repository.PolicySetDocumentRepository;
import com.example.backend.service.PolicySetValidationService;

@Service
public class PolicySetValidationServiceImpl implements PolicySetValidationService{

	@Autowired
	private PolicySetDocumentRepository policySetDocumentRepository;
	@Autowired
	private PolicySetDtoConverter policySetDtoConverter;
	
	
	@Override
	public boolean addPolicySet(PolicySetDto policySetDto, String username) {
		List<PolicySetDocument> documents =this.policySetDocumentRepository.findByCreator(username);
		for(int i = 0; i<documents.size(); i++) {
			PolicySetDto policySetDtoExisting = policySetDtoConverter.policySetDtoConverter(documents.get(i));
			if (policySetDtoExisting.getPolicySetId()
						.contentEquals(policySetDto.getPolicySetId())) {
					return false;
				}
			
		}
		return true;
	}

}
