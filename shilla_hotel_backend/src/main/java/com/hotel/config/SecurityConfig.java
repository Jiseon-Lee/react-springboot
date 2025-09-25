package com.hotel.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtUtil jwtUtil;

    // 비밀번호 암호화 설정 (빈 등록)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 비밀번호 암호화에 사용
    }

    // JWT 필터 빈 등록
    @Bean
    public JwtAuthFilter jwtAuthFilter() {
        // 만든 JwtAuthFilter 객체를 빈으로 등록
        return new JwtAuthFilter(jwtUtil);
    }

    // 스프링 시큐리티의 보안 설정을 정의하는 필터 체인
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // CSRF 보안 기능 끔
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()       // 로그인, 회원가입은 누구나 접근 가능
                        .requestMatchers("/api/board/**").permitAll()
                        .anyRequest().authenticated()                           // 나머지 요청은 인증 필요
                )
                // 요청이 들어오면 먼저 JWT 필터를 실행해서 토큰 확인
                .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();  // 설정 완료된 보안 필터 체인 반환
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();   // 인증 매니저 반환
    }
}
