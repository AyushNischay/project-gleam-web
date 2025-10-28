package com.StudentAnalyzer.backend.dto.Requests;

import java.util.List;

import com.StudentAnalyzer.backend.model.Difficulty;
import com.StudentAnalyzer.backend.model.MaterialType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StudyMaterialRequest {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    @NotNull(message = "Type is required")
    private MaterialType type;
    
    @NotBlank(message = "URL is required")
    private String url;
    
    @NotNull(message = "Subject ID is required")
    private Long subjectId;
    
    private List<String> topicsCovered;
    
    @NotNull(message = "Difficulty is required")
    private Difficulty difficulty;
    
    private String thumbnailUrl;
    private String duration;
    private Integer pages;
}