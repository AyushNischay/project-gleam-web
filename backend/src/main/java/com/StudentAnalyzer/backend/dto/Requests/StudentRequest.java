package com.StudentAnalyzer.backend.dto.Requests;

import java.time.LocalDate;

import com.StudentAnalyzer.backend.model.Status;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StudentRequest {
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @Email(message = "Email should be valid")
    private String email;
    
    private String phone;
    
    @NotBlank(message = "Class is required")
    private String className;
    
    @NotBlank(message = "Roll number is required")
    private String rollNo;
    
    @NotBlank(message = "Section is required")
    private String section;
    
    private LocalDate dateOfBirth;
    private String address;
    private String parentName;
    private String parentContact;
    private String bloodGroup;
    private LocalDate admissionDate;
    private Status status;
}