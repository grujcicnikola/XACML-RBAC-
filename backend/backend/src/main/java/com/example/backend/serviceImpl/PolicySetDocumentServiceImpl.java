package com.example.backend.serviceImpl;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBException;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;

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
				PolicySetDto policySetDto = policySetDtoConverter(document);
				list.add(policySetDto);				
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

	@Override
	public PolicySetDto getPolicySetDto(String id) {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(id);
		if(document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter(document.get());
			return policySetDto;
		}
		return null;
	}

	private PolicySetDto policySetDtoConverter(PolicySetDocument document) {
		PolicySetDto policySetDto = xmlMarshalService.unmarshal(document.getContent());
		policySetDto.setCreator(document.getCreator());
		policySetDto.setId(document.getId());
		return policySetDto;
	}

	@Override
	public void downloadPolicySetDto(String id, HttpServletResponse httpServletResponse) throws IOException {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(id);
		if(document.isPresent()) {
			httpServletResponse.addHeader("Content-Disposition", "attachment; filename=" + document.get().getId()+".xml");
			httpServletResponse.setContentType("text/xml");
			httpServletResponse.getOutputStream().println(document.get().getContent());
        }
	}

	@Override
	public PolicySetDto createPolicySet(PolicySetDto policySetDto, String username) {
		String xml = xmlMarshalService.marshal(policySetDto);
		PolicySetDocument document= savePolicySet(xml, username);
		return policySetDtoConverter(document);
	}

	@Override
	public PolicySetDto updatePolicySet(PolicySetDto policySetDto, String username) {
		String xml = xmlMarshalService.marshal(policySetDto);
		PolicySetDocument document = new PolicySetDocument();
		document.setContent(xml);
		document.setCreator(username);
		document.setId(policySetDto.getId());
		return policySetDtoConverter(this.policySetDocumentRepository.save(document));
	}

	@Override
	public void deletePolicySet(String id) {
		this.policySetDocumentRepository.deleteById(id);
	}
}
