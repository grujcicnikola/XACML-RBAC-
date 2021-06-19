package com.example.backend.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.dto.AnyOfDto;
import com.example.backend.service.TargetValidationService;

@Service
public class TargetValidationServiceImpl implements TargetValidationService {

	@Override
	public boolean addAnyOf(List<AnyOfDto> anyOfs, AnyOfDto anyOfDto) {
		for (int i = 0; i < anyOfs.size(); i++) {
			if (anyOfs.get(i).getAllOf().getMatch().getAttributeDesignator().getAttributeId()
					.contentEquals(anyOfDto.getAllOf().getMatch().getAttributeDesignator().getAttributeId())) {
				return false;
			}

		}
		return true;
	}

}
