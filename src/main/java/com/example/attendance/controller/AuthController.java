package com.example.attendance.controller;

import com.example.attendance.dao.UserDAO;
import com.example.attendance.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final UserDAO userDAO;

    public AuthController(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        Optional<User> user = userDAO.findByUsername(loginUser.getUsername());
        if (user.isPresent() && user.get().getPassword().equals(loginUser.getPassword())) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
