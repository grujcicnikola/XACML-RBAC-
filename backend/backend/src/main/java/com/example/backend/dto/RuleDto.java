package com.example.backend.dto;

import javax.xml.bind.annotation.*;

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
@XmlRootElement(name="Rule")
@XmlAccessorType(XmlAccessType.FIELD)
public class RuleDto {
	private Long id;
	@XmlAttribute
	private String ruleId;
	@XmlAttribute
	private String effect;
	@XmlAttribute
	private String description;
	@XmlTransient
	private String creator;
	@XmlTransient
	private String created;
}
