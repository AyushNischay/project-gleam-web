package com.StudentAnalyzer.backend.dto.Response;

import java.time.LocalDate;

import com.StudentAnalyzer.backend.model.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponse {
    private Long id;
    private String studentId;
    private String name;
    private String email;
    private String phone;
    private String className;
    private String rollNo;
    private String section;
    private LocalDate dateOfBirth;
    private String address;
    private String parentName;
    private String parentContact;
    private String bloodGroup;
    private LocalDate admissionDate;
    private Status status;
}
