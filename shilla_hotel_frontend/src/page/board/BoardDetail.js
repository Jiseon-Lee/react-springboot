import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Table, Button, Spinner } from "react-bootstrap";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import api from '../../api/axiosConfig';

// 회원 수정 컴포넌트
const BoardDetail = () => {
    // URL의 id 파라미터 추출
    const { id } = useParams();
    const location = useLocation();

    // 쿼리스트링 읽기
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page") || 0;
    const size = queryParams.get("size") || 3;

    // 페이지 이동 함수
    const navigate = useNavigate();

    // 게시글 정보 상태 관리
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const loginUser = localStorage.getItem("username");
    const hasToken = localStorage.getItem("token") !== null;

    // 페이지 로딩 시 게시글 정보 불러오기
    useEffect(() => {
        setLoading(true);
        api.get(`/api/board/${id}`)
        .then((res) =>  setBoard(res.data))
        .catch((err) => {
            console.error(err);
            alert("상세 조회 실패");
            navigate(`/board?page=${page}&size=${size}`);
        })
        .finally(() => setLoading(false));
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" role="status" />
            </div>
        )
    }

    if (!board) return null;

    const thStyle = {
        backgroundColor: "#f2f2f2",
        textAlign: "left"
    };

    // 회원 삭제 기능
    const handleDelete = (id) => {
        if (!hasToken) {
            alert("로그인이 필요합니다.");
            return;
        }
        if (!window.confirm("정말 삭제하시겠습니까?"))
            return;

        api.delete(`/api/board/${id}`)
            .then(() => {
                alert("삭제 완료!");
                navigate(`/board?page=${page}&size=${size}`);
            })
            .catch((err) => {
                console.error("삭제 에러:", err);
                if (err.response?.status === 403) {
                    alert("작성자만 삭제할 수 있습니다.");
                } else if (err.response?.status === 401) {
                    alert("로그인이 필요합니다.");
                } else {
                    alert("삭제 중 오류가 발생했습니다.");
                }
            });
    };

    return (
        <>
            <Header/>
            <div className="container mt-4">
                <h2 className="mb-4">글 상세</h2>
                <Table bordered hover responsive className="align-middle">
                    <tbody>
                        <tr>
                            <th style={thStyle} className="col-1">Title</th>
                            <td style={{ textAlign: "left" }} colSpan={5}>{board.title}</td>
                        </tr>
                        <tr>
                            <th style={thStyle} className="col-1">Writer</th>
                            <td style={{ textAlign: "left" }} className="col-3">{board.writer}</td>
                            <th style={thStyle} className="col-1">RegTime</th>
                            <td style={{ textAlign: "left" }} className="col-3">{board.regTime.split("T")[0]}</td>
                            <th style={thStyle} className="col-1">UpdateTime</th>
                            <td style={{ textAlign: "left" }} className="col-3">{board.updateTime.split("T")[0]}</td>
                        </tr>
                        <tr>
                            <th style={thStyle}>Content</th>
                            <td style={{ textAlign: "left" }} colSpan={5}>{board.content}</td>
                        </tr>
                    </tbody>
                </Table>

                {/* 버튼 영역 */}
                <div className="d-flex justify-content-between mt-3">
                    {/* 왼쪽: 수정 버튼 */}
                    <div className="d-flex gap-2">
                        {hasToken && board.writer === loginUser && (
                            <>
                                <Link to={`/edit/${board.id}`}>
                                    <Button variant="warning">수정</Button>
                                </Link>
                                <Button variant="danger" onClick={() => handleDelete(board.id)}>
                                    삭제
                                </Button>
                            </>
                        )}
                    </div>

                    {/* 오른쪽: 리스트 버튼 */}
                    <div>
                        <Link to={`/board?page=${page}&size=${size}`}>
                            <Button variant="secondary">리스트</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default BoardDetail;
