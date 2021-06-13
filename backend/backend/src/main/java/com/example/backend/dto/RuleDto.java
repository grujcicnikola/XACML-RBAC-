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
	@XmlAttribute
	private String ruleId;
	@XmlAttribute
	private String effect;
	@XmlElement(name = "Condition")
	private ConditionDto condition;
	@XmlElement(name = "Target")
	private TargetDto target = new TargetDto();
	
	private String description;
}

