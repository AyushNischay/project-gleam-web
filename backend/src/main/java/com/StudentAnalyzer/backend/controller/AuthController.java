package com.StudentAnalyzer.backend.controller;

import com.StudentAnalyzer.backend.dto.Requests.LoginRequest;
import com.StudentAnalyzer.backend.dto.Requests.RegisterRequest;
import com.StudentAnalyzer.backend.dto.Response.LoginResponse;
import com.StudentAnalyzer.backend.model.User;
import com.StudentAnalyzer.backend.repository.UserRepository;
import com.StudentAnalyzer.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:5173"}, allowCredentials = "true")
public class AuthController {

    @Autowired private AuthenticationManager authManager;
    @Autowired private com.StudentAnalyzer.backend.security.CustomUserDetailsService users;
    @Autowired private JwtUtil jwt;
    @Autowired private UserRepository userRepository;
    @Autowired private com.StudentAnalyzer.backend.service.AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
            UserDetails ud = users.loadUserByUsername(req.getEmail());
            String token = jwt.generateToken(ud);

            // Fetch domain user to include role and id in response
            User domainUser = userRepository.findByEmail(req.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            LoginResponse resp = new LoginResponse(token, domainUser.getEmail(), domainUser.getRole(), domainUser.getId());
            return ResponseEntity.ok(resp);
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        authService.register(req);
        return ResponseEntity.status(201).build();
    }
}