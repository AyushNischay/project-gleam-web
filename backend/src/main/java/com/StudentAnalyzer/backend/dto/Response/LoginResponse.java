package com.StudentAnalyzer.backend.dto.Response;

import com.StudentAnalyzer.backend.model.Role;

public class LoginResponse {
    private String token;
    private String email;
    private Role role;
    private Long userId;

    public LoginResponse() {
    }

    public LoginResponse(String token, String email, Role role, Long userId) {
        this.token = token;
        this.email = email;
        this.role = role;
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}