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
import com.example.backend.service.RuleValidationService;
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
	@Autowired
	private RuleValidationService ruleValidationService;

	@Override
	public PolicySetDto addRule(String parentId, String policySetId, RuleDto ruleDto) {
		// TODO Auto-generated method stub
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
				if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(parentId)) {
					if(this.ruleValidationService.addRule(policySetDto.getPolicies().get(i).getRules(), ruleDto)) {
						policySetDto.getPolicies().get(i).getRules().add(ruleDto);
					}else {
						return null;
					}
					break;
				}
			}
			return this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator());
		}
		return null;
	}

	@Override
	public RuleDto getRule(String id, String parentId, String policySetId) {
		// TODO Auto-generated method stub
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
				if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(parentId)) {
					return policySetDto.getPolicies().get(i).getRules().stream()
							.filter(rule -> rule.getRuleId().contentEquals(id)).findFirst().orElse(null);
				}
			}
		}
		return null;
	}

	@Override
	public PolicySetDto updateRule(String id, String parentId, String policySetId, RuleDto ruleDto) {
		// TODO Auto-generated method stub
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
				if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(parentId)) {
					for (int j = 0; j < policySetDto.getPolicies().get(i).getRules().size(); j++) {
						if(policySetDto.getPolicies().get(i).getRules().get(j).getRuleId().contentEquals(id)) {
							policySetDto.getPolicies().get(i).getRules().set(j, ruleDto);
							break;
						}
					}
				}
			}
			return this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator());
		}
		return null;
	}

	@Override
	public void deleteRule(String id, String parentId, String policySetId) {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
				if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(parentId)) {
					for (int j = 0; j < policySetDto.getPolicies().get(i).getRules().size(); j++) {
						if(policySetDto.getPolicies().get(i).getRules().get(j).getRuleId().contentEquals(id)) {
							policySetDto.getPolicies().get(i).getRules().remove(j);
							break;
						}
					}
				}
			}
			this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator());
		}	
	}

}
