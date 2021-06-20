package com.example.backend.dto;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@XmlRootElement(name = "PolicySet")
@XmlAccessorType(XmlAccessType.FIELD)
//@XmlType: define the order in which the fields are written in the XML file
@XmlType(namespace="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PolicySetDto {
	@XmlTransient
	private String id;
	@XmlAttribute
	private String xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17";
	@XmlAttribute(name="xmlns:xsi")
	private String xsi="http://www.w3.org/2001/XMLSchema-instance";
	@XmlAttribute(name="xsi:schemaLocator")
	private String schemaLocator ="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17 xacml-core-v3-schema-wd-17.xsd";
	
	@XmlAttribute(name="PolicySetId")
	private String policySetId;
	@XmlAttribute(name="Version")
	private String version;
	@XmlAttribute(name="PolicyCombiningAlgId")
	private String policyCombiningAlgId;
	@XmlAttribute(name="Description")
	private String description;
	@XmlElement(name="PolicySetIdReference")
	private String policySetIdReference;
	@XmlElement(name="PolicyIdReference")
	private String policyIdReference;
	// @XmlElementWrapper(name="Policies")
	//@XmlType(namespace="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17")
	@XmlElement(name="Policy")
	private List<PolicyDto> policies = new ArrayList<PolicyDto>();
	// @XmlTransient: annotate fields that we don't want to be included in XML
	@XmlTransient
	private String creator;
	@XmlTransient
	private String created;

	@XmlElement(name = "Target")
	private TargetDto target = new TargetDto();
}
