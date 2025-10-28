package com.StudentAnalyzer.backend.dto.Requests;

import java.time.LocalDate;

import com.StudentAnalyzer.backend.model.ExamType;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MarksRequest {
    
    @NotNull(message = "Student ID is required")
    private Long studentId;
    
    @NotNull(message = "Subject ID is required")
    private Long subjectId;
    
    @NotNull(message = "Exam type is required")
    private ExamType examType;
    
    @NotNull(message = "Marks obtained is required")
    private Integer marksObtained;
    
    @NotNull(message = "Total marks is required")
    private Integer totalMarks;
    
    @NotNull(message = "Exam date is required")
    private LocalDate examDate;
}