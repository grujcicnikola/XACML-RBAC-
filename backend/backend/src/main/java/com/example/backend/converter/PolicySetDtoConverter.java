package com.example.backend.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.backend.dto.PolicySetDto;
import com.example.backend.model.PolicySetDocument;
import com.example.backend.service.XMLMarshalService;

@Component
public class PolicySetDtoConverter {
	
	@Autowired
	private XMLMarshalService xmlMarshalService;
	
	public PolicySetDto policySetDtoConverter(PolicySetDocument document) {
		PolicySetDto policySetDto = xmlMarshalService.unmarshal(document.getContent());
		policySetDto.setCreator(document.getCreator());
		policySetDto.setId(document.getId());
		return policySetDto;
	}

}
