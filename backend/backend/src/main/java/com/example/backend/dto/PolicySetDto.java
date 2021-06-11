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
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PolicySetDto {
	@XmlTransient
	private String id;
	@XmlAttribute
	private String xmlns;
	@XmlAttribute
	private String xsi;
	@XmlAttribute
	private String policySetId;
	@XmlAttribute
	private String version;
	@XmlAttribute
	private String policyCombiningAlgId;
	@XmlAttribute
	private String description;
	@XmlElement
	private String policySetIdReference;
	@XmlAttribute
	private String policyIdReference;

	// @XmlElementWrapper(name="Policies")
	@XmlElement(name = "Policy")
	private List<PolicyDto> policies = new ArrayList<PolicyDto>();
	// @XmlTransient: annotate fields that we don't want to be included in XML
	@XmlTransient
	private String creator;
	@XmlTransient
	private String created;

	@XmlElement(name = "Target")
	private TargetDto target;
}
