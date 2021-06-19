package com.example.backend.serviceImpl;

import java.security.Policy;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.converter.PolicySetDtoConverter;
import com.example.backend.dto.PolicyDto;
import com.example.backend.dto.PolicySetDto;
import com.example.backend.model.PolicySetDocument;
import com.example.backend.repository.PolicySetDocumentRepository;
import com.example.backend.service.PolicyService;
import com.example.backend.service.PolicySetDocumentService;
import com.example.backend.service.PolicyValidationService;
import com.example.backend.service.XMLMarshalService;

@Service
public class PolicyServiceImpl implements PolicyService {

	@Autowired
	private PolicySetDocumentRepository policySetDocumentRepository;
	@Autowired
	private PolicySetDocumentService policySetDocumentService;
	@Autowired
	private PolicySetDtoConverter policySetDtoConverter;
	@Autowired
	private PolicyValidationService policyValidationService;

	@Override
	public PolicyDto getPolicy(String id, String idPolicySet) {
		// TODO Auto-generated method stub
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(idPolicySet);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			PolicyDto policyDto = policySetDto.getPolicies().stream()
					.filter(policy -> policy.getPolicyId().contentEquals(id)).findFirst().orElse(null);
			return policyDto;
		}
		return null;
	}

	@Override
	public PolicySetDto addPolicy(String id, PolicyDto policyDto, String username) {
		// TODO Auto-generated method stub
		if (this.policyValidationService.addPolicy(policyDto, username)) {
			Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(id);
			if (document.isPresent()) {
				PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
				policySetDto.getPolicies().add(policyDto);
				return this.policySetDocumentService.updatePolicySet(policySetDto, username);
			}
		}
		return null;
	}

	@Override
	public PolicySetDto updatePolicy(String id, PolicyDto policyDto, String username) {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(id);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
				if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(policyDto.getPolicyId())) {
					policySetDto.getPolicies().set(i, policyDto);
					break;
				}
			}
			return this.policySetDocumentService.updatePolicySet(policySetDto, username);
		}
		return null;
	}

	@Override
	public void deletePolicy(String id, String idPolicySet) {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(idPolicySet);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			for (int i = 0; i < policySetDto.getPolicies().size(); i++) {
				if (policySetDto.getPolicies().get(i).getPolicyId().contentEquals(id)) {
					policySetDto.getPolicies().remove(i);
					break;
				}
			}
			this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator());
		}

	}

	@Override
	public List<String> getPolicies(String name) {
		List<String> policiesId = new ArrayList<String>();
		List<PolicySetDocument> documents = this.policySetDocumentRepository.findByCreator(name);
		documents.forEach(document -> {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document);
			policySetDto.getPolicies().forEach(policy -> {
				policiesId.add(policy.getPolicyId());
			});
		});
		return policiesId;
	}

}
