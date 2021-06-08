package com.example.backend.model;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "policy_set_document")
public class PolicySetDocument {
    
	@Id
    private String id;
    
    private String content;
    
    private String creator;

}