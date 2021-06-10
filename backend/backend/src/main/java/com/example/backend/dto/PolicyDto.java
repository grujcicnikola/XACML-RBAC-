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
	private String xmlns;
	@XmlAttribute
	private String xsi;
	@XmlAttribute
	private String policyId;
	@XmlAttribute
	private String version;
	@XmlAttribute
	private String ruleCombiningAlgId;
	@XmlAttribute
	private String description;
	@XmlAttribute
	private String schemaLocator;
	//@XmlElementWrapper(name="rules")
    @XmlElement(name="Rule")
	private List<RuleDto> rules = new ArrayList<RuleDto>();
	@XmlTransient
	private String creator;
	@XmlTransient
	private String created;
}
