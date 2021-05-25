package com.example.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.backend.model.PolicySetDocument;

public interface PolicySetDocumentRepository extends MongoRepository<PolicySetDocument, String> {
	
}