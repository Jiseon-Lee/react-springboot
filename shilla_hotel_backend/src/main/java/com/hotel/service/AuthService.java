package com.hotel.service;

import com.hotel.config.JwtUtil;
import com.hotel.dto.LoginRequest;
import com.hotel.dto.SignupRequest;
import com.hotel.entity.Member;
import com.hotel.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    // 로그인 처리 메서드
    public String login(LoginRequest request) {
        // 사용자 조회 (없으면 예외 발생)
        Member member = memberRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("사용자가 존재하지 않습니다."));

        // 비밀번호 일치 여부 확인
        if (!passwordEncoder.matches(request.getPassword(), member.getPassword())) {
            throw new RuntimeException("비밀번호가 틀렸습니다.");
        }

        return jwtUtil.createToken(member.getUsername());
    }

    // 회원가입 처리 메서드
    public void signup(SignupRequest request) {
        Optional<Member> existingMember = memberRepository.findByUsername(request.getUsername());
        if (existingMember.isPresent()) {
            // 이미 존재하는 경우 예외 발생 (회원가입 실패 처리)
            throw new RuntimeException("이미 존재하는 사용자입니다.");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        Member member = new Member();
        member.setUsername(request.getUsername());
        member.setPassword(encodedPassword);

        memberRepository.save(member);
    }
}
