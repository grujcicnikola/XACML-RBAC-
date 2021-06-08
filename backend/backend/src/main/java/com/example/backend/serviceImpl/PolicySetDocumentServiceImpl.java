package com.example.backend.serviceImpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.xml.bind.JAXBException;
import javax.xml.stream.XMLStreamException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.PolicySetDto;
import com.example.backend.model.PolicySetDocument;
import com.example.backend.model.User;
import com.example.backend.repository.PolicySetDocumentRepository;
import com.example.backend.service.PolicySetDocumentService;
import com.example.backend.service.UserService;
import com.example.backend.service.XMLMarshalService;

@Service
public class PolicySetDocumentServiceImpl implements PolicySetDocumentService {

	@Autowired
	private PolicySetDocumentRepository policySetDocumentRepository;
	@Autowired
	private XMLMarshalService xmlMarshalService;
	@Autowired
	private UserService userService;

	@Override
	public List<PolicySetDto> getPolicySets(String username) {
		Optional<User> user = userService.findUserByUsername(username);
		List<PolicySetDto> list = new ArrayList<>();
		if(user.isPresent()) {
			List<PolicySetDocument> documents = this.policySetDocumentRepository.findByCreator(username);
			documents.forEach(document -> {
				PolicySetDto policySet;
				policySet = xmlMarshalService.unmarshal(document.getContent());
				policySet.setCreator(document.getCreator());
				list.add(policySet);				
			});
			
		}
		return list;
	}
	
	@Override
	public PolicySetDocument savePolicySet(String xml, String username) {
		PolicySetDocument doc = new PolicySetDocument();
		doc.setContent(xml);
		doc.setCreator(username);
		return policySetDocumentRepository.save(doc);
		
	}

	@Override
	public PolicySetDocument getPolicySet(String id) {
		return this.policySetDocumentRepository.findById(id).get();
	}
}
