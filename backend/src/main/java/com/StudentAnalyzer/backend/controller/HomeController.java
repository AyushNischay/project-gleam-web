package com.StudentAnalyzer.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:5173"}, allowCredentials = "true")
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Student Analyzer API is running";
    }
}
