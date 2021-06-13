package com.example.backend.serviceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.converter.PolicySetDtoConverter;
import com.example.backend.dto.ApplyDto;
import com.example.backend.dto.ConditionDto;
import com.example.backend.dto.PolicySetDto;
import com.example.backend.model.PolicySetDocument;
import com.example.backend.repository.PolicySetDocumentRepository;
import com.example.backend.service.ConditionService;
import com.example.backend.service.PolicySetDocumentService;
import com.example.backend.service.XMLMarshalService;

@Service
public class ConditionServiceImpl implements ConditionService {

	@Autowired
	private PolicySetDocumentRepository policySetDocumentRepository;
	@Autowired
	private XMLMarshalService xmlMarshalService;
	@Autowired
	private PolicySetDocumentService policySetDocumentService;
	@Autowired
	private PolicySetDtoConverter policySetDtoConverter;
	
	@Override
	public PolicySetDto addCondition(String ruleId, String policyId, String policySetId, ConditionDto conditionDto) {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
				if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyId)) {
					for (int j = 0; j < policySetDto.getPolicies().get(i).getRules().size(); j++) {
						if(policySetDto.getPolicies().get(i).getRules().get(j).getRuleId().contentEquals(ruleId)) {
							policySetDto.getPolicies().get(i).getRules().get(j).setCondition(conditionDto);
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
	public ConditionDto getCondition(String ruleId, String policyId, String policySetId) {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
				if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyId)) {
					for (int j = 0; j < policySetDto.getPolicies().get(i).getRules().size(); j++) {
						if(policySetDto.getPolicies().get(i).getRules().get(j).getRuleId().contentEquals(ruleId)) {
							return policySetDto.getPolicies().get(i).getRules().get(j).getCondition();
						}
					}
				}
			}
		}
		return null;
	}
	
	@Override
	public PolicySetDto updateCondition(String ruleId, String policyId, String policySetId, ConditionDto conditionDto) {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
				if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyId)) {
					for (int j = 0; j < policySetDto.getPolicies().get(i).getRules().size(); j++) {
						if(policySetDto.getPolicies().get(i).getRules().get(j).getRuleId().contentEquals(ruleId)) {
							policySetDto.getPolicies().get(i).getRules().get(j).setCondition(conditionDto);
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
	public void deleteCondition(String ruleId, String policyId, String policySetId) {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
				if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyId)) {
					for (int j = 0; j < policySetDto.getPolicies().get(i).getRules().size(); j++) {
						if(policySetDto.getPolicies().get(i).getRules().get(j).getRuleId().contentEquals(ruleId)) {
							policySetDto.getPolicies().get(i).getRules().get(j).setCondition(null);
							break;
						}
					}
				}
			}
			this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator());
		}
	}

	@Override
	public PolicySetDto addApply(String ruleId, String policyId, String policySetId, ApplyDto applyDto) {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
				if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyId)) {
					for (int j = 0; j < policySetDto.getPolicies().get(i).getRules().size(); j++) {
						if(policySetDto.getPolicies().get(i).getRules().get(j).getRuleId().contentEquals(ruleId)) {
							policySetDto.getPolicies().get(i).getRules().get(j).getCondition().getApplyWrapper().getApplies().add(applyDto);
							break;
						}
					}
				}
			}
			return this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator());
		}
		return null;
	}
	
}