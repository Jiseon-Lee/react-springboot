package com.hotel.controller;

import com.hotel.config.JwtUtil;
import com.hotel.dto.BoardDTO;
import com.hotel.entity.Board;
import com.hotel.service.BoardService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
@Log4j2
public class BoardController {

    private final BoardService boardService;

    private final JwtUtil jwtUtil;

    /**
     * 게시글 목록 조회
     * @param page
     * @param size
     * @return
     */
    @GetMapping
    public Page<BoardDTO> list(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        return boardService.readAllPage(pageable).map(board -> this.toDTO(board));
    }

    /**
     * 게시글 조회
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public BoardDTO read(@PathVariable Long id) {
        return toDTO(boardService.read(id));
    }

    /**
     * 게시글 등록
     * @param dto
     * @param request
     * @return
     */
    @PostMapping
    public ResponseEntity<String> create(@RequestBody BoardDTO dto, HttpServletRequest request) {
        // JWT 토큰에서 사용자 이름 추출
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("로그인 필요");
        }

        String token = authHeader.substring(7); // "Bearer " 제거
        String username = jwtUtil.getUsernameFromToken(token); // JWT에서 사용자 추출

        dto.setWriter(username); // 작성자 정보 저장
        boardService.write(toEntity(dto));
        return ResponseEntity.ok("게시글 등록 성공");
    }

    /**
     * 게시글 수정
     * @param id
     * @param dto
     * @param request
     * @return
     */
    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody BoardDTO dto, HttpServletRequest request) {
        dto.setId(id);

        // JWT 토큰에서 사용자 이름 추출
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("로그인 필요");
        }

        String token = authHeader.substring(7); // "Bearer " 제거
        String username = jwtUtil.getUsernameFromToken(token); // JWT에서 사용자 추출

        Board existing = boardService.read(id);

        // 작성자가 아니면 권한 없음
        if (!existing.getWriter().equals(username)) {
            return ResponseEntity.status(403).body("작성자만 수정 가능합니다");
        }

        dto.setWriter(username); // createdBy 다시 설정 (변조 방지), 작성자 정보 다시 설정
        boardService.write(toEntity(dto));
        return ResponseEntity.ok("글 수정 성공");
    }

    /**
     * 게시글 삭제
     * @param id
     * @param request
     * @return
     */
    // 회원 삭제 (작성자 본인만 가능)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id, HttpServletRequest request) {

        String authHeader = request.getHeader("Authorization");

        // 인증 안됨
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("로그인 필요");
        }

        String token = authHeader.substring(7);
        String username = jwtUtil.getUsernameFromToken(token);

        Board existing = boardService.read(id);
        // 작성자 아님
        if (!existing.getWriter().equals(username)) {
            return ResponseEntity.status(403).body("작성자만 삭제할 수 있습니다");
        }

        boardService.delete(id);
        return ResponseEntity.ok("회원 삭제 완료");
    }

    /**
     * Entity -> DTO 변환
     * @param board
     * @return
     */
    private BoardDTO toDTO(Board board) {
        return new BoardDTO(
                board.getId(),
                board.getTitle(),
                board.getContent(),
                board.getWriter(),
                board.getRegTime(),
                board.getUpdateTime(),
                board.getViewCount()
        );
    }

    /**
     * DTO -> Entity 변환
     * @param dto
     * @return
     */
    private Board toEntity(BoardDTO dto) {
        return new Board(
                dto.getId(),
                dto.getTitle(),
                dto.getContent(),
                dto.getWriter(),
                dto.getRegTime(),
                dto.getUpdateTime(),
                dto.getViewCount()
        );
    }
}
