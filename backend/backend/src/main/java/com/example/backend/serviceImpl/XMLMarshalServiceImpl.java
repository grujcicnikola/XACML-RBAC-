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
	
	@Autowired
	private PolicySetDocumentRepository policySetDocumentRepository;
	
	
	@Override
	public String marshal(PolicySetDto policySetDto) throws JAXBException, IOException {
	    JAXBContext context = JAXBContext.newInstance(PolicySetDto.class);
	    Marshaller mar= context.createMarshaller();
	    mar.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
	    StringWriter sw = new StringWriter();
	    mar.marshal(policySetDto, sw);
	    System.out.println(sw.toString());
	    return sw.toString();
	}
	
	public PolicySetDto unmarshal(String xml) throws JAXBException, IOException, XMLStreamException {
//	    JAXBContext context = JAXBContext.newInstance(PolicySetDto.class);
//	    
//	    XMLEventReader streamReader = xif.createXMLEventReader(new StringReader(xml));
//		Unmarshaller unmarshaller = jc.createUnmarshaller();
//		PolicySetDto customer = (PolicySetDto) unmarshaller.unmarshal(streamReader);
//	    return (PolicySetDto) context.createUnmarshaller()
//	      .unmarshal(new FileReader("./book.xml"));
//	    
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
	}

	@Override
	public PolicySetDocument savePolicySet(String xml) {
		// TODO Auto-generated method stub
		PolicySetDocument doc = new PolicySetDocument();
		doc.setContent(xml);
		return policySetDocumentRepository.save(doc);
		
	}

	@Override
	public PolicySetDocument getPolicySet(String id) {
		// TODO Auto-generated method stub
		return this.policySetDocumentRepository.findById(id).get();
	}

}
