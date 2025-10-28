package com.StudentAnalyzer
.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.StudentAnalyzer.backend.dto.Requests.StudentRequest;
import com.StudentAnalyzer.backend.dto.Response.StudentResponse;
import com.StudentAnalyzer.backend.model.Student;
import com.StudentAnalyzer.backend.repository.StudentRepository;
import com.StudentAnalyzer.backend.repository.UserRepository;
import com.StudentAnalyzer.backend.model.User;
import com.StudentAnalyzer.backend.model.Role;
import com.StudentAnalyzer.backend.model.Status;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public List<StudentResponse> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public StudentResponse getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return convertToResponse(student);
    }
    
    @Transactional
    public StudentResponse createStudent(StudentRequest request) {
        // Create user account for student
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode("student123")); // Default password
        user.setRole(Role.STUDENT);
        user = userRepository.save(user);
        
        // Generate student ID
        String studentId = generateStudentId();
        
        // Create student
        Student student = new Student();
        student.setUser(user);
        student.setStudentId(studentId);
        student.setName(request.getName());
        student.setPhone(request.getPhone());
        student.setClassName(request.getClassName());
        student.setRollNo(request.getRollNo());
        student.setSection(request.getSection());
        student.setDateOfBirth(request.getDateOfBirth());
        student.setAddress(request.getAddress());
        student.setParentName(request.getParentName());
        student.setParentContact(request.getParentContact());
        student.setBloodGroup(request.getBloodGroup());
        student.setAdmissionDate(request.getAdmissionDate());
        student.setStatus(request.getStatus() != null ? request.getStatus() : Status.ACTIVE);
        
        student = studentRepository.save(student);
        return convertToResponse(student);
    }
    
    @Transactional
    public StudentResponse updateStudent(Long id, StudentRequest request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        // Update student details
        student.setName(request.getName());
        student.setPhone(request.getPhone());
        student.setClassName(request.getClassName());
        student.setRollNo(request.getRollNo());
        student.setSection(request.getSection());
        student.setDateOfBirth(request.getDateOfBirth());
        student.setAddress(request.getAddress());
        student.setParentName(request.getParentName());
        student.setParentContact(request.getParentContact());
        student.setBloodGroup(request.getBloodGroup());
        student.setAdmissionDate(request.getAdmissionDate());
        
        if (request.getStatus() != null) {
            student.setStatus(request.getStatus());
        }
        
        student = studentRepository.save(student);
        return convertToResponse(student);
    }
    
    @Transactional
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        // Delete user account
        if (student.getUser() != null) {
            userRepository.delete(student.getUser());
        }
        
        studentRepository.delete(student);
    }
    
    private String generateStudentId() {
        long count = studentRepository.count();
        return String.format("STU%03d", count + 1);
    }
    
    private StudentResponse convertToResponse(Student student) {
        StudentResponse response = new StudentResponse();
        response.setId(student.getId());
        response.setStudentId(student.getStudentId());
        response.setName(student.getName());
        response.setEmail(student.getUser() != null ? student.getUser().getEmail() : null);
        response.setPhone(student.getPhone());
        response.setClassName(student.getClassName());
        response.setRollNo(student.getRollNo());
        response.setSection(student.getSection());
        response.setDateOfBirth(student.getDateOfBirth());
        response.setAddress(student.getAddress());
        response.setParentName(student.getParentName());
        response.setParentContact(student.getParentContact());
        response.setBloodGroup(student.getBloodGroup());
        response.setAdmissionDate(student.getAdmissionDate());
        response.setStatus(student.getStatus());
        return response;
    }
}