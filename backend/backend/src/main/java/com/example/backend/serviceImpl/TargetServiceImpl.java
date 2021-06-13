package com.example.backend.serviceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.converter.PolicySetDtoConverter;
import com.example.backend.dto.AnyOfDto;
import com.example.backend.dto.PolicySetDto;
import com.example.backend.dto.TargetDto;
import com.example.backend.model.PolicySetDocument;
import com.example.backend.repository.PolicySetDocumentRepository;
import com.example.backend.service.PolicySetDocumentService;
import com.example.backend.service.TargetService;
import com.example.backend.service.XMLMarshalService;

@Service
public class TargetServiceImpl implements TargetService {

	@Autowired
	private PolicySetDocumentRepository policySetDocumentRepository;
	@Autowired
	private XMLMarshalService xmlMarshalService;
	@Autowired
	private PolicySetDocumentService policySetDocumentService;
	@Autowired
	private PolicySetDtoConverter policySetDtoConverter;

//	@Override
//	public void addTarget(String policySetId, String itemId, String type) {
//		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
//		if (document.isPresent()) {
//			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
//			if (type.equals("PolicySet")) {
//				policySetDto.setTarget(new TargetDto());
//			}
//			else if (type.equals("Policy")) {
//				for(int i=0; i< policySetDto.getPolicies().size(); i++) {
//					if(policySetDto.getPolicies().get(i).getPolicyId().contentEquals(itemId)) {
//						policySetDto.getPolicies().get(i).setTarget(new TargetDto());
//					}
//				}
//			}
//			this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator());
//		}
//	}

	@Override
	public void deleteTarget(String parentId, String selectedParentType, String policySetId) {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			if (selectedParentType.equals("PolicySet")) {
				policySetDto.setTarget(null);
			}
			this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator());
		}
	}

	@Override
	public PolicySetDto addAnyOf(String selectedParentType, String policySetId, String policyId,
			 String ruleId, AnyOfDto anyOfDto) {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			if (selectedParentType.equals("PolicySet")) {
				policySetDto.getTarget().getAnyOfs().add(anyOfDto);
			}
			else if (selectedParentType.equals("Policy")) {
				for(int i=0; i< policySetDto.getPolicies().size(); i++) {
					if(policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyId)) {
						policySetDto.getPolicies().get(i).getTarget().getAnyOfs().add(anyOfDto);
						break;
					}
				}
			}
			else if (selectedParentType.equals("Rule")) {
				for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
					if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyId)) {
						for (int j = 0; j < policySetDto.getPolicies().get(i).getRules().size(); j++) {
							if(policySetDto.getPolicies().get(i).getRules().get(j).getRuleId().contentEquals(ruleId)) {
								policySetDto.getPolicies().get(i).getRules().get(j).getTarget().getAnyOfs().add(anyOfDto);
								break;
							}
						}
					}
				}
			}
			return this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator());
		}
		return null;
	}

	@Override
	public AnyOfDto getAnyOf(String id, String parentId, String selectedParentType, String policySetId) {
		// TODO Auto-generated method stub
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			if (selectedParentType.equals("Target")) {
				return policySetDto.getTarget().getAnyOfs().stream()
						.filter(anyOf -> anyOf.getAllOf().getMatch().getMatchId().equals(id))
						.findFirst()
						.orElse(null);
			}
		}
		return null;
	}

	@Override
	public PolicySetDto updateAnyOf(String id, String parentId, String selectedParentType, String policySetId,
			AnyOfDto anyOfDto) {
		// TODO Auto-generated method stub
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			if (selectedParentType.equals("Target")) {
				for(int i=0; i< policySetDto.getPolicies().size(); i++) {
					if(policySetDto.getTarget().getAnyOfs().get(i).getAllOf().getMatch().getMatchId().contentEquals(id)) {
						policySetDto.getTarget().getAnyOfs().set(i, anyOfDto);
						break;
					}
				}
				return this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator());
			}
		}
		return null;
	}

	@Override
	public void deleteAnyOf(String id, String parentId, String selectedParentType, String policySetId) {
		// TODO Auto-generated method stub
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			if (selectedParentType.equals("Target")) {
				for(int i=0; i< policySetDto.getPolicies().size(); i++) {
					if(policySetDto.getTarget().getAnyOfs().get(i).getAllOf().getMatch().getMatchId().contentEquals(id)) {
						policySetDto.getTarget().getAnyOfs().remove(i);
						this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator());
						break;
					}	
				}
			}
		}
	}
}
