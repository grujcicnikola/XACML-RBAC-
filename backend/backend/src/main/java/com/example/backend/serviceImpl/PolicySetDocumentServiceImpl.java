package com.example.backend.serviceImpl;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import javax.xml.bind.JAXBException;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.converter.PolicySetDtoConverter;
import com.example.backend.dto.PolicySetDto;
import com.example.backend.model.PolicySetDocument;
import com.example.backend.model.User;
import com.example.backend.repository.PolicySetDocumentRepository;
import com.example.backend.service.PolicySetDocumentService;
import com.example.backend.service.PolicySetValidationService;
import com.example.backend.service.PolicyValidationService;
import com.example.backend.service.UserService;
import com.example.backend.service.XMLMarshalService;

@Service
@Transactional(rollbackOn = Throwable.class)
public class PolicySetDocumentServiceImpl implements PolicySetDocumentService {

	@Autowired
	private PolicySetDocumentRepository policySetDocumentRepository;
	@Autowired
	private XMLMarshalService xmlMarshalService;
	@Autowired
	private PolicySetDtoConverter policySetDtoConverter;
	@Autowired
	private UserService userService;
	@Autowired
	private PolicySetValidationService PolicySetValidationService;

	@Override
	public List<PolicySetDto> getPolicySets(String username) {
		Optional<User> user = userService.findUserByUsername(username);
		List<PolicySetDto> list = new ArrayList<>();
		if (user.isPresent()) {
			List<PolicySetDocument> documents = this.policySetDocumentRepository.findByCreator(username);
			documents.forEach(document -> {
				PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document);
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
		doc.setVersion(0L);
		return policySetDocumentRepository.save(doc);

	}

	@Override
	public PolicySetDocument getPolicySet(String id) {
		return this.policySetDocumentRepository.findById(id).get();
	}

	@Override
	public PolicySetDto getPolicySetDto(String id) {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(id);
		if (document.isPresent()) {
			PolicySetDto policySetDto = policySetDtoConverter.policySetDtoConverter(document.get());
			return policySetDto;
		}
		return null;
	}

	@Override
	public void downloadPolicySetDto(String id, HttpServletResponse httpServletResponse) throws IOException {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(id);
		if (document.isPresent()) {
			httpServletResponse.addHeader("Content-Disposition",
					"attachment; filename=" + document.get().getId() + ".xml");
			httpServletResponse.setContentType("text/xml");
			httpServletResponse.getOutputStream().println(document.get().getContent());
		}
	}

	@Override
	public PolicySetDto createPolicySet(PolicySetDto policySetDto, String username) {
		if (this.PolicySetValidationService.addPolicySet(policySetDto, username)) {
			String xml = xmlMarshalService.marshal(policySetDto);
			PolicySetDocument document = savePolicySet(xml, username);
			return policySetDtoConverter.policySetDtoConverter(document);
		} else {
			return null;
		}
	}

	@Override
	public PolicySetDto updatePolicySet(PolicySetDto policySetDto, String username, Long version) {
		if(version==-1L) {
			version =setRealVersion(policySetDto);
		}
		if (checkIfYouCanUpdate(policySetDto, username, version)) {

			String xml = xmlMarshalService.marshal(policySetDto);
			PolicySetDocument document = new PolicySetDocument();
			document.setContent(xml);
			document.setCreator(username);
			document.setId(policySetDto.getId());
			document.setVersion(++version);
			return policySetDtoConverter.policySetDtoConverter(this.policySetDocumentRepository.save(document));
		}
		return null;
	}

	private Long setRealVersion(PolicySetDto policySetDto) {
		// TODO Auto-generated method stub
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetDto.getId());
		if(document.isPresent()) {
			return document.get().getVersion();
		}
		return -1L;
		
	}

	private boolean checkIfYouCanUpdate(PolicySetDto policySetDto, String username, Long version) {
		Optional<PolicySetDocument> document = this.policySetDocumentRepository.findById(policySetDto.getId());
		if(document.isPresent()) {
			if(document.get().getVersion() == version) {
				return true;
			}

		}
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void deletePolicySet(String id) {
		this.policySetDocumentRepository.deleteById(id);
	}
}
