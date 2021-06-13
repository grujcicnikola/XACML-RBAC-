package com.example.backend.service;

import com.example.backend.dto.AnyOfDto;
import com.example.backend.dto.PolicySetDto;
import com.example.backend.dto.TargetDto;

public interface TargetService {

	//void addTarget(String policySetId, String itemId, String type);

	void deleteTarget(String parentId, String selectedParentType, String policySetId);

	PolicySetDto addAnyOf(String parentId, String selectedParentType, String policySetId, AnyOfDto anyOfDto);

	AnyOfDto getAnyOf(String id, String parentId, String selectedParentType, String policySetId);

	PolicySetDto updateAnyOf(String id, String parentId, String selectedParentType, String policySetId, AnyOfDto anyOfDto);

	void deleteAnyOf(String id, String parentId, String selectedParentType, String policySetId);

}
