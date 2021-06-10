package com.example.backend.serviceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	
	@Override
	public void addTarget(String policySetId, String itemId, String type) {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetId);
		if(document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter(document.get());
			if(type.equals("PolicySet")) {
				policySetDto.setTarget(new TargetDto());
			}
			this.policySetDocumentService.updatePolicySet(policySetDto, document.get().getCreator());
		}
	}

	private PolicySetDto policySetDtoConverter(PolicySetDocument document) {
		PolicySetDto policySetDto = xmlMarshalService.unmarshal(document.getContent());
		policySetDto.setCreator(document.getCreator());
		policySetDto.setId(document.getId());
		return policySetDto;
	}
}
