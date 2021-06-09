package com.example.backend.serviceImpl;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;

import javax.xml.bind.*;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;
import javax.xml.transform.Result;
import javax.xml.transform.stream.StreamSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.PolicySetDto;
import com.example.backend.model.PolicySetDocument;
import com.example.backend.repository.PolicySetDocumentRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.XMLMarshalService;

@Service
public class XMLMarshalServiceImpl implements XMLMarshalService {
		
	
	public String marshal(PolicySetDto policySetDto) {
	    try {
	    	JAXBContext context = JAXBContext.newInstance(PolicySetDto.class);
		    Marshaller mar= context.createMarshaller();
			mar.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
			StringWriter sw = new StringWriter();
		    mar.marshal(policySetDto, sw);
		    //System.out.println(sw.toString());
		    return sw.toString();
		} catch (PropertyException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    return null;
	}
	
	public PolicySetDto unmarshal(String xml) {   
		try {
			JAXBContext context = JAXBContext.newInstance(PolicySetDto.class);
			XMLInputFactory xif = XMLInputFactory.newFactory();
			xif.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false);
			xif.setProperty(XMLInputFactory.SUPPORT_DTD, false);
			xif.setProperty(XMLInputFactory.IS_NAMESPACE_AWARE, false);
			
			XMLEventReader streamReader = xif.createXMLEventReader(new StringReader(xml));
			Unmarshaller unmarshaller = context.createUnmarshaller();
			StringReader sr = new StringReader(xml);
			PolicySetDto policySetDto = (PolicySetDto) unmarshaller.unmarshal(streamReader);
			return policySetDto;
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (XMLStreamException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return null;
	}

}
