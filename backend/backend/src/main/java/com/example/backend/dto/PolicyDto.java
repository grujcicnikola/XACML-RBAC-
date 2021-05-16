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
public class PolicyDto {
	private Long id;
	private String xmlns;
	private String xsi;
	private String policyId;
	private String version;
	private String ruleCombiningAlgId;
	private String description;
	private String schemaLocator;
	private List<RuleDto> rules = new ArrayList<RuleDto>();
	private String creator;
	private String created;
}
