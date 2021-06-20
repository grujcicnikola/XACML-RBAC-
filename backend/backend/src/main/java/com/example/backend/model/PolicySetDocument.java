package com.example.backend.model;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Version;

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
    
    @Column(name="version")
    private Long version;

}