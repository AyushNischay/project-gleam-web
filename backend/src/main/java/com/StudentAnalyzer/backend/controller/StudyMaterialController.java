package com.StudentAnalyzer.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.StudentAnalyzer.backend.dto.Response.ApiResponse;
import com.StudentAnalyzer.backend.dto.Response.MaterialResponse;
import com.StudentAnalyzer.backend.dto.Response.WeakSubjectResponse;
import com.StudentAnalyzer.backend.service.RecommendationService;

@RestController
@RequestMapping("/api/study-materials")
@CrossOrigin(origins = "http://localhost:5173")
public class StudyMaterialController {
    
    @Autowired
    private RecommendationService recommendationService;
    
    @GetMapping("/weak-subjects/{studentId}")
    public ResponseEntity<ApiResponse<List<WeakSubjectResponse>>> getWeakSubjects(@PathVariable Long studentId) {
        try {
            List<WeakSubjectResponse> weakSubjects = recommendationService.getWeakSubjects(studentId);
            return ResponseEntity.ok(ApiResponse.success(weakSubjects));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/recommendations/{studentId}")
    public ResponseEntity<ApiResponse<List<MaterialResponse>>> getRecommendations(
            @PathVariable Long studentId,
            @RequestParam(required = false) Long subjectId) {
        try {
            List<MaterialResponse> materials = recommendationService.getRecommendations(studentId, subjectId);
            return ResponseEntity.ok(ApiResponse.success(materials));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}