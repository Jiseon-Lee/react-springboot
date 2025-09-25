package com.hotel.service;

import com.hotel.dto.BoardDTO;
import com.hotel.entity.Board;
import com.hotel.repository.BoardRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Getter
@Setter
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    /**
     * 게시글 등록
     * @param board
     */
    public void write(Board board) {
        boardRepository.save(board);
    }

    /**
     * 게시글 조회
     * @param boardId   게시글 번호
     * @return board    게시글
     */
    public Board read(Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "board not found with id : " + boardId));
        board.setViewCount(board.getViewCount() + 1);
        boardRepository.save(board);
        return board;
    }

    /**
     * 게시글 목록
     * @return boards   게시글 리스트
     */
    public List<Board> readAll() {
        List<Board> boards = boardRepository.findAll();
        return boards;
    }

    /**
     * 게시글 삭제
     * @param boardId   게시글 번호
     */
    public void delete(Long boardId) {
        boardRepository.deleteById(boardId);
    }

    public Page<Board> readAllPage(Pageable pageable) {
        Page<Board> boardPage = boardRepository.findAll(pageable);
        return boardPage;
    }
}
