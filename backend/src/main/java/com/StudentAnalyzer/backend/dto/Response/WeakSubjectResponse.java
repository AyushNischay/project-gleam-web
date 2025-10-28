package com.StudentAnalyzer.backend.dto.Response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeakSubjectResponse {
    private String subjectId;
    private String subjectName;
    private Double averageScore;
    private Double classAverage;
    private String trend; // improving, declining, stable
    private Double lastExamScore;
    private List<String> weakTopics;
}