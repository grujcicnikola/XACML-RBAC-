package com.example.backend.service;

public interface TargetService {

	void addTarget(String policySetId, String itemId, String type);

	void deleteTarget(String parentId, String selectedParentType, String policySetId);

}
