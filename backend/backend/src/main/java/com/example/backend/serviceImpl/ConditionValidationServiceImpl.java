package com.example.backend.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.dto.ApplyDto;
import com.example.backend.service.ConditionValidationService;

@Service
public class ConditionValidationServiceImpl  implements ConditionValidationService {

	@Override
	public boolean addApply(List<ApplyDto> applies, ApplyDto applyDto) {
		for (int i = 0; i < applies.size(); i++) {
			if (applies.get(i).getAttributeDesignator().getAttributeId()
					.contentEquals(applyDto.getAttributeDesignator().getAttributeId())) {
				return false;
			}

		}
		return true;
	}
	
}
