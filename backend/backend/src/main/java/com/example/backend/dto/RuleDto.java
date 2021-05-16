package com.example.backend.dto;

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
public class RuleDto {
	private Long id;
	private String ruleId;
	private String effect;
	private String description;
	private String creator;
	private String created;
}
