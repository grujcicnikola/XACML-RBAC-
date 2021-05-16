package com.example.backend.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PolicySetDto {
	private Long id;
	private String xmlns;
	private String xsi;
	private String policySetId;
	private String version;
	private String policyCombiningAlgId;
	private String description;
	private String policySetIdReference;
	private String policyIdReference;
	private List<PolicyDto> policies = new ArrayList<PolicyDto>();
	private String creator;
	private String created;
}

