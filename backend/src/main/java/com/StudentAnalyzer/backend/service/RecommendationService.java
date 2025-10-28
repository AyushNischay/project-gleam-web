package com.StudentAnalyzer.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.StudentAnalyzer.backend.dto.Response.MaterialResponse;
import com.StudentAnalyzer.backend.dto.Response.WeakSubjectResponse;
import com.StudentAnalyzer.backend.model.Bookmark;
import com.StudentAnalyzer.backend.model.Difficulty;
import com.StudentAnalyzer.backend.model.Marks;
import com.StudentAnalyzer.backend.model.StudyMaterial;
import com.StudentAnalyzer.backend.model.Subject;
import com.StudentAnalyzer.backend.repository.BookmarkRepository;
import com.StudentAnalyzer.backend.repository.MarksRepository;
import com.StudentAnalyzer.backend.repository.StudyMaterialRepository;
import com.StudentAnalyzer.backend.repository.SubjectRepository;

@Service
public class RecommendationService {
    
    @Autowired
    private MarksRepository marksRepository;
    
    @Autowired
    private StudyMaterialRepository materialRepository;
    
    @Autowired
    private BookmarkRepository bookmarkRepository;
    
    @Autowired
    private SubjectRepository subjectRepository;
    
    public List<WeakSubjectResponse> getWeakSubjects(Long studentId) {
        // Get all marks for student
        List<Marks> allMarks = marksRepository.findByStudentId(studentId);
        
        if (allMarks.isEmpty()) {
            return new ArrayList<>();
        }
        
        // Group by subject and calculate averages
        Map<Subject, List<Marks>> subjectMarks = allMarks.stream()
                .collect(Collectors.groupingBy(Marks::getSubject));
        
        List<WeakSubjectResponse> weakSubjects = new ArrayList<>();
        
        for (Map.Entry<Subject, List<Marks>> entry : subjectMarks.entrySet()) {
            Subject subject = entry.getKey();
            List<Marks> marks = entry.getValue();
            
            // Calculate average percentage
            double avgPercentage = marks.stream()
                    .mapToDouble(m -> (m.getMarksObtained() * 100.0) / m.getTotalMarks())
                    .average()
                    .orElse(0.0);
            
            // If below 75%, consider it weak
            if (avgPercentage < 75.0) {
                WeakSubjectResponse response = new WeakSubjectResponse();
                response.setSubjectId(subject.getId().toString());
                response.setSubjectName(subject.getSubjectName());
                response.setAverageScore(avgPercentage);
                response.setClassAverage(82.0); // TODO: Calculate actual class average
                
                // Get last exam score
                Marks lastMark = marks.get(marks.size() - 1);
                double lastScore = (lastMark.getMarksObtained() * 100.0) / lastMark.getTotalMarks();
                response.setLastExamScore(lastScore);
                
                // Determine trend
                if (marks.size() >= 2) {
                    Marks prevMark = marks.get(marks.size() - 2);
                    double prevScore = (prevMark.getMarksObtained() * 100.0) / prevMark.getTotalMarks();
                    
                    if (lastScore > prevScore + 5) {
                        response.setTrend("improving");
                    } else if (lastScore < prevScore - 5) {
                        response.setTrend("declining");
                    } else {
                        response.setTrend("stable");
                    }
                } else {
                    response.setTrend("stable");
                }
                
                // TODO: Identify weak topics based on detailed analysis
                response.setWeakTopics(Arrays.asList("Topic 1", "Topic 2"));
                
                weakSubjects.add(response);
            }
        }
        
        // Sort by average score (lowest first)
        weakSubjects.sort(Comparator.comparing(WeakSubjectResponse::getAverageScore));
        
        return weakSubjects;
    }
    
    public List<MaterialResponse> getRecommendations(Long studentId, Long subjectId) {
        List<StudyMaterial> materials;
        
        if (subjectId != null) {
            // Get materials for specific subject
            materials = materialRepository.findBySubjectIdOrderByRatingDesc(subjectId);
        } else {
            // Get materials for all weak subjects
            List<WeakSubjectResponse> weakSubjects = getWeakSubjects(studentId);
            materials = new ArrayList<>();
            
            for (WeakSubjectResponse weak : weakSubjects) {
                Long subjId = Long.parseLong(weak.getSubjectId());
                
                // Determine difficulty based on score
                Difficulty difficulty = determineDifficulty(weak.getAverageScore());
                
                List<StudyMaterial> subjectMaterials = 
                    materialRepository.findBySubjectIdAndDifficultyOrderByRatingDesc(subjId, difficulty);
                
                materials.addAll(subjectMaterials);
            }
        }
        
        // Get bookmarked materials for this student
        List<Bookmark> bookmarks = bookmarkRepository.findByStudentId(studentId);
        Set<Long> bookmarkedIds = bookmarks.stream()
                .map(b -> b.getMaterial().getId())
                .collect(Collectors.toSet());
        
        // Convert to response and mark bookmarks
        return materials.stream()
                .map(m -> convertToMaterialResponse(m, bookmarkedIds.contains(m.getId())))
                .limit(15)
                .collect(Collectors.toList());
    }
    
    private Difficulty determineDifficulty(double score) {
        if (score < 50) return Difficulty.BEGINNER;
        if (score < 70) return Difficulty.INTERMEDIATE;
        return Difficulty.ADVANCED;
    }
    
    private MaterialResponse convertToMaterialResponse(StudyMaterial material, boolean isBookmarked) {
        MaterialResponse response = new MaterialResponse();
        response.setId(material.getId());
        response.setTitle(material.getTitle());
        response.setDescription(material.getDescription());
        response.setType(material.getType());
        response.setUrl(material.getUrl());
        response.setSubjectName(material.getSubject().getSubjectName());
        response.setTopicsCovered(material.getTopicsCovered());
        response.setDifficulty(material.getDifficulty());
        response.setThumbnailUrl(material.getThumbnailUrl());
        response.setDuration(material.getDuration());
        response.setPages(material.getPages());
        response.setRating(material.getRating());
        response.setViews(material.getViews());
        response.setIsBookmarked(isBookmarked);
        return response;
    }
}
