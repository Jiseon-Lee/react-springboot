package com.hotel.controller;

import com.hotel.dto.LoginRequest;
import com.hotel.dto.SignupRequest;
import com.hotel.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;


@RestController   // REST API 컨트롤러
@RequestMapping("/api/auth")   // 기본 URL 경로 설정
@RequiredArgsConstructor  // 생성자 주입 자동 생성
public class AuthController {

    private final AuthService authService;

    // 공백/대소문자 정규화 유틸
    private String norm(String s) {
        return s == null ? null : s.trim().toLowerCase();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String token = authService.login(request);

        // JSON 형태로 반환 (key: "token")
        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            // username  문자공백 정규화
            request.setUsername(norm(request.getUsername()));

            authService.signup(request);

            return ResponseEntity.ok("회원가입이 완료되었습니다.");

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}