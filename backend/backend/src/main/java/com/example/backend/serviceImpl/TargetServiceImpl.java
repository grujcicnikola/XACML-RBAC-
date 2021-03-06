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
import com.example.backend.service.TargetValidationService;
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
	@Autowired
	private TargetValidationService targetValidationService;

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
			this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator(), document.get().getVersion());
		}
	}

	@Override
	public PolicySetDto addAnyOf(String selectedParentType, String policySetId, String policyId, String ruleId,
			AnyOfDto anyOfDto) {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			if (selectedParentType.equals("PolicySet")) {
				if (this.targetValidationService.addAnyOf(policySetDto.getTarget().getAnyOfs(), anyOfDto)) {
					policySetDto.getTarget().getAnyOfs().add(anyOfDto);
				} else {
					return null;
				}
			} else if (selectedParentType.equals("Policy")) {
				for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
					if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyId)) {
						if (this.targetValidationService
								.addAnyOf(policySetDto.getPolicies().get(i).getTarget().getAnyOfs(), anyOfDto)) {
							policySetDto.getPolicies().get(i).getTarget().getAnyOfs().add(anyOfDto);
						} else {
							return null;
						}
						break;
					}
				}
			} else if (selectedParentType.equals("Rule")) {
				for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
					if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyId)) {
						for (int j = 0; j < policySetDto.getPolicies().get(i).getRules().size(); j++) {
							if (policySetDto.getPolicies().get(i).getRules().get(j).getRuleId().contentEquals(ruleId)) {
								if (this.targetValidationService.addAnyOf(
										policySetDto.getPolicies().get(i).getRules().get(j).getTarget().getAnyOfs(),
										anyOfDto)) {
									policySetDto.getPolicies().get(i).getRules().get(j).getTarget().getAnyOfs()
											.add(anyOfDto);
								} else {
									return null;
								}
								break;
							}
						}
					}
				}
			}
			return this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator(),document.get().getVersion());
		}
		return null;
	}

	@Override
	public AnyOfDto getAnyOf(String attributeId, String selectedParentOfParentType, String policySetId, String policyId,
			String ruleId) {
		// TODO Auto-generated method stub
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			if (selectedParentOfParentType.equals("PolicySet")) {
				return policySetDto
						.getTarget().getAnyOfs().stream().filter(anyOf -> anyOf.getAllOf().getMatch()
								.getAttributeDesignator().getAttributeId().equals(attributeId))
						.findFirst().orElse(null);
			} else if (selectedParentOfParentType.equals("Policy")) {
				for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
					if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyId)) {
						return policySetDto
								.getPolicies().get(i).getTarget().getAnyOfs().stream().filter(anyOf -> anyOf.getAllOf()
										.getMatch().getAttributeDesignator().getAttributeId().equals(attributeId))
								.findFirst().orElse(null);
					}
				}
			} else if (selectedParentOfParentType.equals("Rule")) {
				for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
					if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyId)) {
						for (int j = 0; j < policySetDto.getPolicies().get(i).getRules().size(); j++) {
							if (policySetDto.getPolicies().get(i).getRules().get(j).getRuleId().contentEquals(ruleId)) {
								return policySetDto.getPolicies().get(i).getRules().get(j).getTarget().getAnyOfs()
										.stream().filter(anyOf -> anyOf.getAllOf().getMatch().getAttributeDesignator()
												.getAttributeId().equals(attributeId))
										.findFirst().orElse(null);
							}
						}
					}
				}
			}
		}
		return null;
	}

	@Override
	public PolicySetDto updateAnyOf(String attributeId, String selectedParentOfParentType, String policySetId,
			String policyId, String ruleId, AnyOfDto anyOfDto) {
		// TODO Auto-generated method stub
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			if (selectedParentOfParentType.equals("PolicySet")) {
				for (int i = 0; i < policySetDto.getTarget().getAnyOfs().size(); i++) {
					if (policySetDto.getTarget().getAnyOfs().get(i).getAllOf().getMatch().getAttributeDesignator()
							.getAttributeId().equals(attributeId)) {
						policySetDto.getTarget().getAnyOfs().set(i, anyOfDto);
						break;
					}
				}
				return this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator(), document.get().getVersion());
			} else if (selectedParentOfParentType.equals("Policy")) {
				for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
					if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyId)) {
						for (int j = 0; j < policySetDto.getPolicies().get(i).getTarget().getAnyOfs().size(); j++) {
							if (policySetDto.getPolicies().get(i).getTarget().getAnyOfs().get(j).getAllOf().getMatch()
									.getAttributeDesignator().getAttributeId().equals(attributeId)) {
								policySetDto.getPolicies().get(i).getTarget().getAnyOfs().set(j, anyOfDto);
								break;
							}
						}
					}
				}
				return this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator(), document.get().getVersion());
			} else if (selectedParentOfParentType.equals("Rule")) {
				for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
					if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyId)) {
						for (int j = 0; j < policySetDto.getPolicies().get(i).getRules().size(); j++) {
							if (policySetDto.getPolicies().get(i).getRules().get(j).getRuleId().contentEquals(ruleId)) {
								for (int k = 0; k < policySetDto.getPolicies().get(i).getRules().get(j).getTarget()
										.getAnyOfs().size(); k++) {
									if (policySetDto.getPolicies().get(i).getRules().get(j).getTarget().getAnyOfs()
											.get(k).getAllOf().getMatch().getAttributeDesignator().getAttributeId()
											.equals(attributeId)) {
										policySetDto.getPolicies().get(i).getRules().get(j).getTarget().getAnyOfs()
												.set(k, anyOfDto);
										break;
									}
								}
							}
						}
					}
				}
				return this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator(), document.get().getVersion());
			}
		}
		return null;
	}

	@Override
	public void deleteAnyOf(String attributeId, String selectedParentOfParentType, String policySetId, String policyId,
			String ruleId) {
		// TODO Auto-generated method stub
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			if (selectedParentOfParentType.equals("PolicySet")) {
				for (int i = 0; i < policySetDto.getTarget().getAnyOfs().size(); i++) {
					if (policySetDto.getTarget().getAnyOfs().get(i).getAllOf().getMatch().getAttributeDesignator()
							.getAttributeId().equals(attributeId)) {
						policySetDto.getTarget().getAnyOfs().remove(i);
						this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator(),document.get().getVersion());
						break;
					}
				}
			} else if (selectedParentOfParentType.equals("Policy")) {
				for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
					if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyId)) {
						for (int j = 0; j < policySetDto.getPolicies().get(i).getTarget().getAnyOfs().size(); j++) {
							if (policySetDto.getPolicies().get(i).getTarget().getAnyOfs().get(j).getAllOf().getMatch()
									.getAttributeDesignator().getAttributeId().equals(attributeId)) {
								policySetDto.getPolicies().get(i).getTarget().getAnyOfs().remove(j);
								this.policySetDocumentService.updatePolicySet(policySetDto,
										document.get().getCreator(), document.get().getVersion());
								break;
							}
						}
					}
				}
			} else if (selectedParentOfParentType.equals("Rule")) {
				for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
					if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyId)) {
						for (int j = 0; j < policySetDto.getPolicies().get(i).getRules().size(); j++) {
							if (policySetDto.getPolicies().get(i).getRules().get(j).getRuleId().contentEquals(ruleId)) {
								for (int k = 0; k < policySetDto.getPolicies().get(i).getRules().get(j).getTarget()
										.getAnyOfs().size(); k++) {
									if (policySetDto.getPolicies().get(i).getRules().get(j).getTarget().getAnyOfs()
											.get(k).getAllOf().getMatch().getAttributeDesignator().getAttributeId()
											.equals(attributeId)) {
										policySetDto.getPolicies().get(i).getRules().get(j).getTarget().getAnyOfs()
												.remove(k);
										this.policySetDocumentService.updatePolicySet(policySetDto,
												document.get().getCreator(), document.get().getVersion());
										break;
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
