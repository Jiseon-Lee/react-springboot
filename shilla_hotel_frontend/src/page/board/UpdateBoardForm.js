import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // URL 파라미터 및 페이지 이동
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import api from '../../api/axiosConfig';

// 회원 수정 컴포넌트
const UpdateBoardForm = () => {
    // URL의 id 파라미터 추출
    const { id } = useParams();

    // 페이지 이동 함수
    const navigate = useNavigate();

    // 게시글 정보 상태 관리
    const [board, setBoard] = useState({
        title: "",
        content: "",
        writer: ""
    });

    // 진입 시 토큰 확인 + 데이터 조회 시 토큰 헤더 포함 + 작성자 본인 확인
    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");

        if (!token) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        api.get(`/api/board/${id}`)
        .then((res) => {
            setBoard(res.data);

            if (res.data?.writer && res.data.writer !== username) {
                alert("작성자만 수정할 수 있습니다.");
                navigate(`/board/${id}`);
            }
        })
        .catch((err) => {
            if (err.response?.status === 403) {
                alert("작성자만 수정할 수 있습니다.");
                navigate(`/board/${id}`);
            } else {
                alert("게시글 조회 실패");
            }
            console.log(err);
        });
    }, [id, navigate]);

    // 입력값 변경 핸들링
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoard((prev) => ({ ...prev, [name]: value })); // 기존 값 유지하며 변경된 필드 업데이트
    };

    // 폼 제출 시 실행
    const handleSubmit = (e) => {
        e.preventDefault();

        // 제출 시에도 토큰 재확인(이중 안전장치)
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        // 제목 비어있는지 확인
        if (!board.title.trim()) {
            alert("제목을 입력하세요.");
            return;
        }

        // 내용 비어있는지 확인
        if (!board.content.trim()) {
            alert("내용을 입력하세요.");
            return;
        }

        // 모든 유효성 통과 시 PUT 요청(전체 수정)
        // 회원 정보를 수정(PUT) 요청 후 성공 시 알림 및 홈으로 이동, 401 오류 시 로그인 페이지로 리다이렉트
        api.put(`/api/board/${id}`, board)
            .then(() => {
                alert("수정 완료!");
                navigate("/board");
            })
            .catch((err) => {
                console.error("수정 실패:", err);
                if (err.response?.status === 403) { // 권한 에러 처리
                    alert("작성자만 수정할 수 있습니다.");
                } else if (err.response?.status === 401) {
                    alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
                    localStorage.removeItem("token");
                    navigate("/login");
                } else {
                    alert("수정 실패");
                }
            });
    };

    return (
        <>
            <Header/>
            <Container className="mt-5">
                <h2 className="mb-4"> 회원 정보 수정</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Control type="hidden" name="id" value={board.id} />

                    <Form.Group as={Row} className="mb-3" controlId="formTitle">
                        <Form.Label column sm={2}>
                            Title
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                            type="text"
                            name="title"
                            value={board.title}
                            onChange={handleChange}
                            required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formContent">
                        <Form.Label column sm={2}>
                            Content
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                            as="textarea"
                            rows={6}
                            type="text"
                            name="content"
                            value={board.content}
                            onChange={handleChange}
                            required
                            />
                        </Col>
                    </Form.Group>

                    <div className="text-end">
                        <Button variant="primary" type="submit">
                            수정
                        </Button>
                    </div>
                </Form>
            </Container>
            <Footer/>
        </>
    );
};

export default UpdateBoardForm;
