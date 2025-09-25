package com.hotel.repository;

import com.hotel.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * 사용자 조회를 위한 JPA 인터페이스
 */
public interface MemberRepository extends JpaRepository<Member, Long> {
    // username으로 사용자 조회 (로그인 시 사용)
    Optional<Member> findByUsername(String username);
}
