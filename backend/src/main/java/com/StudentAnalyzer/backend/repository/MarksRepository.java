package com.StudentAnalyzer.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.StudentAnalyzer.backend.model.Marks;

@Repository
public interface MarksRepository extends JpaRepository<Marks, Long> {
    List<Marks> findByStudentId(Long studentId);
    List<Marks> findBySubjectId(Long subjectId);
    List<Marks> findByStudentIdAndSubjectId(Long studentId, Long subjectId);
}