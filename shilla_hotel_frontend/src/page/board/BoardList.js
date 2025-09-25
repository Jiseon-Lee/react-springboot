import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import api from '../../api/axiosConfig';

function BoardList() {
    // 상세 페이지 이동용
    const navigate = useNavigate();
    const location = useLocation();

    // URL 쿼리스트링에서 page, size 추출
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get("page")) || 0;
    const initialSize = parseInt(queryParams.get("size")) || 3;

    const [boards, setBoards] = useState([]);
    const [pageInfo, setPageInfo] = useState({ number: initialPage, totalPages: 0, size: initialSize });
    const [currentPage, setCurrentPage] = useState(initialPage);

    const [hasToken, setHasToken] = useState(!!localStorage.getItem("token"));

    // currentPage 값이 변경될 때마다 게시글 목록을 가져옴
    useEffect(() => {
        fetchPage(currentPage);
    }, [currentPage]);

    // 특정 페이지 번호에 해당하는 회원 목록 요청
    const fetchPage = (page) => {
        api.get(`/api/board?page=${page}&size=${pageInfo.size}`)
        .then((res) => {
            const { content, number, totalPages, size } = res.data;
            console.log(res.data);

            // 만약 마지막 페이지에서 삭제로 인해 데이터가 없으면 이전 페이지로 보정
            if (content.length === 0 && number > 0) {
                fetchPage(number - 1);
            } else {
                setBoards(content);
                setPageInfo({ number, totalPages, size });
                setCurrentPage(number);
            }
        });
    };

    // 페이지 버튼 클릭 시 해당 페이지로 이동
    const handlePageClick = (pageNum) => {
        setCurrentPage(pageNum);
    };

    return (
        <>
            <Header/>
            <div className="container mt-4">
                <div className="d-flex justify-content-between mb-3">
                    <h2>게시글 목록</h2>
                    {hasToken ? (
                        <Link to="/board/new">
                            <Button variant="primary">+ 새 글 등록</Button>
                        </Link>
                    ) : (
                        <span className="text-muted">로그인하면 글 등록이 가능합니다.</span>
                    )}
                </div>

                <Table striped bordered hover responsive className="text-center">
                    <thead>
                        <tr>
                            <th className="col-1">ID</th>
                            <th className="col-5">TITLE</th>
                            <th className="col-2">WRITER</th>
                            <th className="col-2">REGTIME</th>
                            <th className="col-2">UPDATETIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boards.map((board) => (
                            <tr key={board.id}
                                style={{ cursor: "pointer" }} 
                                onClick={() => navigate(`/board/${board.id}?page=${currentPage}&size=${pageInfo.size}`, {state : {board}})}>
                                <td>{board.id}</td>
                                <td>{board.title}</td>
                                <td>{board.writer}</td>
                                <td>{board.regTime.split("T")[0]}</td>
                                <td>{board.updateTime.split("T")[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* 페이지 번호 */}
                <div className="d-flex justify-content-center mt-3">
                    {Array.from({ length: pageInfo.totalPages }, (_, i) => (
                        <Button key={i} variant={i === pageInfo.number ? "dark" : "outline-dark"} className="mx-1" onClick={() => handlePageClick(i)}>
                            {i + 1}
                        </Button>
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default BoardList;
