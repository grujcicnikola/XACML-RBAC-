package com.example.backend.dto;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

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
@XmlRootElement(name = "Match")
@XmlAccessorType(XmlAccessType.FIELD)
public class MatchDto {
	
	@XmlAttribute(name="MatchId")
	private String matchId;
	@XmlElement(name = "AttributeValue")
	private AttributeValue attributeValue;
	@XmlElement(name = "AtributeDesignator")
	private AttributeDesignator attributeDesignator;
}
