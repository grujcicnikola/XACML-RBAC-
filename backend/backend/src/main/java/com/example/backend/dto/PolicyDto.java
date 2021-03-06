package com.example.backend.dto;

import java.util.ArrayList;
import java.util.List;

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
@XmlRootElement(name="Policy")
@XmlAccessorType(XmlAccessType.FIELD)
public class PolicyDto {

	private String id;
	@XmlAttribute
	private String xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17";
	@XmlAttribute(name="xmlns:xsi")
	private String xsi="http://www.w3.org/2001/XMLSchema-instance";
	@XmlAttribute(name="xsi:schemaLocator")
	private String schemaLocator ="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17 xacml-core-v3-schema-wd-17.xsd";
	@XmlAttribute(name="PolicyId")
	private String policyId;
	@XmlAttribute(name="Version")
	private double version;
	@XmlAttribute(name="RuleCombiningAlgId")
	private String ruleCombiningAlgId;
	@XmlElement(name = "Description")
	private String description;
    @XmlElement(name="Rule")
	private List<RuleDto> rules = new ArrayList<RuleDto>();
    @XmlElement(name = "Target")
	private TargetDto target = new TargetDto();
	@XmlTransient
	private String creator;
	@XmlTransient
	private String created;
}
