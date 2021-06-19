package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.ApplyDto;

public interface ConditionValidationService {

	boolean addApply(List<ApplyDto> applies, ApplyDto applyDto);

}
