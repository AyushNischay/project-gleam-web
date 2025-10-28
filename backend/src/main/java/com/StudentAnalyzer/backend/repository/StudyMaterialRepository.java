package com.StudentAnalyzer.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.StudentAnalyzer.backend.model.Difficulty;
import com.StudentAnalyzer.backend.model.MaterialType;
import com.StudentAnalyzer.backend.model.StudyMaterial;

@Repository
public interface StudyMaterialRepository extends JpaRepository<StudyMaterial, Long> {
    List<StudyMaterial> findBySubjectId(Long subjectId);
    List<StudyMaterial> findByType(MaterialType type);
    List<StudyMaterial> findBySubjectIdAndDifficultyOrderByRatingDesc(Long subjectId, Difficulty difficulty);
    List<StudyMaterial> findBySubjectIdOrderByRatingDesc(Long subjectId);
}