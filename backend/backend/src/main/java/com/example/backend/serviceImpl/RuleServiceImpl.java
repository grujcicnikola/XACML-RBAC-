package com.example.backend.serviceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.converter.PolicySetDtoConverter;
import com.example.backend.dto.PolicySetDto;
import com.example.backend.dto.RuleDto;
import com.example.backend.model.PolicySetDocument;
import com.example.backend.repository.PolicySetDocumentRepository;
import com.example.backend.service.PolicySetDocumentService;
import com.example.backend.service.RuleService;
import com.example.backend.service.XMLMarshalService;

@Service
public class RuleServiceImpl implements RuleService {
	
	@Autowired
	private PolicySetDocumentRepository policySetDocumentRepository;
	@Autowired
	private XMLMarshalService xmlMarshalService;
	@Autowired
	private PolicySetDocumentService policySetDocumentService;
	@Autowired
	private PolicySetDtoConverter policySetDtoConverter;
	
	@Override
	public PolicySetDto addRule(String parentId, String policySetId, RuleDto ruleDto) {
		// TODO Auto-generated method stub
		Optional<PolicySetDocument> document =this.policySetDocumentRepository.findById(policySetId);
		if(document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			for(int i=0; i< policySetDto.getPolicies().size(); i++) {
				if(policySetDto.getPolicies().get(i).getPolicyId().contentEquals(parentId)) {
					policySetDto.getPolicies().get(i).getRules().add(ruleDto);
					break;
				}
			}
			return this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator());
		}
		return null;
	}

}
