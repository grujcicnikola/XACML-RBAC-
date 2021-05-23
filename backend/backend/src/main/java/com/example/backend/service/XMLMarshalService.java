package com.example.backend.service;

import java.io.IOException;

import javax.xml.bind.JAXBException;
import javax.xml.stream.XMLStreamException;

import com.example.backend.dto.PolicySetDto;

public interface XMLMarshalService {
	
	String marshal(PolicySetDto policySetDto) throws JAXBException, IOException;
	
	PolicySetDto unmarshal(String xml) throws JAXBException, IOException, XMLStreamException;

}
