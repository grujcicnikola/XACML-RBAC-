package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.PolicySetDto;
import com.example.backend.model.PolicySetDocument;

public interface PolicySetDocumentService {

	List<PolicySetDto> getPolicySets(String name);
	
	PolicySetDocument savePolicySet(String xml, String username);
	
	PolicySetDocument getPolicySet(String xml);

}
