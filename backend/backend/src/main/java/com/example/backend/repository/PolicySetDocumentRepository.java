package com.example.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.backend.model.PolicySetDocument;
import com.example.backend.model.User;

public interface PolicySetDocumentRepository extends MongoRepository<PolicySetDocument, String> {
	
	List<PolicySetDocument> findByCreator(String email);
	
}