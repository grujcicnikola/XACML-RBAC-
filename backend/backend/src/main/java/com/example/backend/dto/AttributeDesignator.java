package com.example.backend.dto;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
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
@XmlRootElement(name = "AttributeDesignator")
@XmlAccessorType(XmlAccessType.FIELD)
public class AttributeDesignator {
	
	@XmlAttribute(name="MustBePresent")
	private boolean mustBePresent;
	@XmlAttribute(name="Category")
	private String category;
	@XmlAttribute(name="AttributeId")
	private String attributeId;
	@XmlAttribute(name="DataType")
	private String dataType;
}
