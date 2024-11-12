package com.app.streaming.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true, nullable = false, length = 50)
    private String username;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "email", unique = true, nullable = false, length = 255)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "phone", nullable = false)
    private Long phone;

    @Column(name = "is_verified", nullable = false)
    private Boolean isVerified;

    public String getPasswordHash() {
        return passwordHash;
    }
}
