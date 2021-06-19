package com.example.backend.service;

import java.util.List;

import com.example.backend.dto.AnyOfDto;

public interface TargetValidationService {

	boolean addAnyOf(List<AnyOfDto> anyOfs, AnyOfDto anyOfDto);

}
