package com.example.backend.service;

import java.io.IOException;

import javax.xml.bind.JAXBException;
import javax.xml.stream.XMLStreamException;

import com.example.backend.dto.PolicySetDto;
import com.example.backend.model.PolicySetDocument;

public interface XMLMarshalService {
	
	String marshal(PolicySetDto policySetDto);
	
	PolicySetDto unmarshal(String xml);

}
