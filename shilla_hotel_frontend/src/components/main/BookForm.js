import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './BookForm.module.scss'

function BookingForm() {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);

    const navigate = useNavigate();
    
    const getNights = () => {
        if (!startDate || !endDate) return 1;
        const timeDiff = endDate.getTime() - startDate.getTime();
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    };

    const handleSearchRooms = () => {
        const info = {
            startDate: startDate.toISOString().slice(0, 10),
            endDate: endDate.toISOString().slice(0, 10),
            rooms,
            adults,
            children,
            infants
        };
        
        navigate('/select-room', { state: info });
    };

    return (
        <Container className={styles.bookContainer}>
            <Form className={styles.bookContainer_form}>
                <Row className="align-items-end g-3">
                    <Col md={2}>
                        <Form.Group controlId="formCheckIn">
                            <Form.Label>체크인</Form.Label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date);
                                    if (endDate && date > endDate) {setEndDate(null)};
                                }}
                                selectsStart
                                monthsShown={2}
                                startDate={startDate}
                                endDate={endDate}
                                minDate={today}
                                dateFormat="yyyy.MM.dd"
                                className={styles.bookContainer_form_control}
                                calendarClassName="react-datepicker"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={1} className="text-center">
                        <div className="fw-bold"><i class="bi bi-moon-stars-fill"></i><br/>{getNights()}박</div>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="formCheckOut">
                            <Form.Label>체크아웃</Form.Label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                monthsShown={2}
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate || today}
                                dateFormat="yyyy.MM.dd"
                                className={styles.bookContainer_form_control}
                                calendarClassName="react-datepicker"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Form.Group controlId="formRooms">
                            <Form.Label>객실</Form.Label>
                            <Form.Control
                                type="number"
                                min={1}
                                value={rooms}
                                onChange={(e) => setRooms(parseInt(e.target.value))}
                                className={styles.bookContainer_form_control}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Form.Group controlId="formAdults">
                        <Form.Label>성인</Form.Label>
                            <Form.Control
                                type="number"
                                min={1}
                                value={adults}
                                onChange={(e) => setAdults(parseInt(e.target.value))}
                                className={styles.bookContainer_form_control}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Form.Group controlId="formChildren">
                            <Form.Label>어린이</Form.Label>
                            <Form.Control
                                type="number"
                                min={0}
                                value={children}
                                onChange={(e) => setChildren(parseInt(e.target.value))}
                                className={styles.bookContainer_form_control}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Form.Group controlId="formInfants">
                            <Form.Label>유아</Form.Label>
                            <Form.Control
                                type="number"
                                min={0}
                                value={infants}
                                onChange={(e) => setInfants(parseInt(e.target.value))}
                                className={styles.bookContainer_form_control}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2} className="ms-auto">
                        <Button variant="dark" className="w-100" style={{ marginTop: '30px' }} onClick={handleSearchRooms}>
                            예약하기
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default BookingForm;
