import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import api from '../../api/axiosConfig';

const NewBoardForm = () => {
    // 입력값 상태 초기화 (title, content)
    const [board, setBoard] = useState({
        title: "",
        content: ""
    });

    // 저장 후 페이지 이동용
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
    }, [navigate]);

    // 입력 필드 변경 시 상태 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoard((prev) => ({ ...prev, [name]: value }));
    };

    // 폼 제출 시 처리
    const handleSubmit = (e) => {
        e.preventDefault();

        // 로그인 여부 확인 (이중 안전장치)
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        // 제목 공백 검사
        if (!board.title.trim()) {
            alert("제목을 입력하세요.");
            return;
        }

        // 내용 공백 검사
        if (!board.content.trim()) {
            alert("제목을 입력하세요.");
            return;
        }

        // 모든 유효성 통과 후 서버로 전송
        api.post("/api/board", board)
            .then(() => {
                alert("저장 완료!");
                navigate("/board");
            })
            .catch((error) => {
                console.error("저장 실패:", error);
                if (error.response?.status === 403) {
                    alert("권한이 없습니다.");
                } else {
                    alert("등록 실패");
                }
            });
    };

    return (
        <>
            <Header/>
            <Container className="mt-5">
                <h2 className="mb-4">새 글 등록</h2>
                <Form onSubmit={handleSubmit}>
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
                            placeholder="제목을 입력하세요"
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
                            placeholder="내용을 입력하세요"
                            required
                            />
                        </Col>
                    </Form.Group>

                    <div className="text-end">
                        <Button variant="primary" type="submit">
                            등록
                        </Button>
                    </div>
                </Form>
            </Container>
            <Footer/>
        </>
    );
};

export default NewBoardForm;
