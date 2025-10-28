package com.StudentAnalyzer.backend.dto.Response;

import java.util.List;

import com.StudentAnalyzer.backend.model.Difficulty;
import com.StudentAnalyzer.backend.model.MaterialType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaterialResponse {
    private Long id;
    private String title;
    private String description;
    private MaterialType type;
    private String url;
    private String subjectName;
    private List<String> topicsCovered;
    private Difficulty difficulty;
    private String thumbnailUrl;
    private String duration;
    private Integer pages;
    private Double rating;
    private Long views;
    private Boolean isBookmarked;
}