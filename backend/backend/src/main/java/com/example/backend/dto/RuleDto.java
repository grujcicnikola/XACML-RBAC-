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
	@XmlAttribute(name="RuleId")
	private String ruleId;
	@XmlAttribute(name="Effect")
	private String effect;
	@XmlElement(name = "Condition")
	private ConditionDto condition;
	@XmlElement(name = "Target")
	private TargetDto target = new TargetDto();
	@XmlElement(name = "Description")
	private String description;
}

