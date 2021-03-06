package com.example.backend.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.example.backend.dto.PolicySetDto;
import com.example.backend.model.PolicySetDocument;

public interface PolicySetDocumentService {

	List<PolicySetDto> getPolicySets(String name);
	
	PolicySetDocument savePolicySet(String xml, String username);
	
	PolicySetDocument getPolicySet(String xml);
	
	PolicySetDto getPolicySetDto(String id);

	void downloadPolicySetDto(String id, HttpServletResponse httpServletResponse) throws IOException;

	PolicySetDto createPolicySet(PolicySetDto policySetDto, String username);

	PolicySetDto updatePolicySet(PolicySetDto policySetDto, String name, Long version);

	void deletePolicySet(String id);

}
