package com.example.backend.dto;

import java.util.ArrayList;
import java.util.List;

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
@XmlRootElement(name = "Apply")
@XmlAccessorType(XmlAccessType.FIELD)
public class ApplyWrapperDto {
	@XmlAttribute(name="FunctionId")
	private String functionId;
	@XmlElement(name="Apply")
	private List<ApplyDto> applies = new ArrayList<ApplyDto>();
}