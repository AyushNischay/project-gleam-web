package com.StudentAnalyzer.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.StudentAnalyzer.backend.model.Bookmark;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findByStudentId(Long studentId);
    Optional<Bookmark> findByStudentIdAndMaterialId(Long studentId, Long materialId);
    Boolean existsByStudentIdAndMaterialId(Long studentId, Long materialId);
    void deleteByStudentIdAndMaterialId(Long studentId, Long materialId);
}