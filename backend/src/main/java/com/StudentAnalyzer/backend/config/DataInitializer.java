package com.StudentAnalyzer.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.StudentAnalyzer.backend.model.Role;
import com.StudentAnalyzer.backend.model.User;
import com.StudentAnalyzer.backend.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsers(UserRepository users, PasswordEncoder encoder) {
        return args -> {
            if (!users.existsByEmail("teacher@example.com")) {
                User t = new User();
                t.setEmail("teacher@example.com");
                t.setPassword(encoder.encode("Password123!"));
                t.setRole(Role.TEACHER);
                users.save(t);
            }
            if (!users.existsByEmail("student@example.com")) {
                User s = new User();
                s.setEmail("student@example.com");
                s.setPassword(encoder.encode("Password123!"));
                s.setRole(Role.STUDENT);
                users.save(s);
            }
        };
    }
}
