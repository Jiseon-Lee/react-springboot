import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';

import styles from './RoomDetail.module.scss';

function RoomDetail({ item, type }) {
    const [commonInfo, setCommonInfo] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('/json/roomCommon.json')
            .then(res => setCommonInfo(res.data));
    }, []);

    if (!commonInfo) return null;
    if (type !== "room") return null;


    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <div className={styles.detailCont}>
            <div className={styles.title}>
                <h2>{item.name}</h2>
            </div>

            <Carousel className={styles.carousel}>
                <Carousel.Item interval={1500}>
                    <img src={`${process.env.PUBLIC_URL}/img/room/${item.id}_1.jpg`} alt={item.name} className="d-block w-100" />
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img src={`${process.env.PUBLIC_URL}/img/room/${item.id}_2.jpg`} alt={item.name} className="d-block w-100" />
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img src={`${process.env.PUBLIC_URL}/img/room/${item.id}_3.jpg`} alt={item.name} className="d-block w-100" />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={`${process.env.PUBLIC_URL}/img/room/${item.id}_4.jpg`} alt={item.name} className="d-block w-100" />
                </Carousel.Item>
            </Carousel>

            <section className={styles.description}>
                <h4>{item.title}</h4>
                <p>{item.title_sub}</p>
                <ul>
                    <li>
                        <strong>체크인</strong>
                        <span>15:00</span>
                    </li>
                    <li>
                        <strong>체크아웃</strong>
                        <span>11:00</span>
                    </li>
                    <li>
                        <strong>층 안내</strong>
                        <span>{item.location}까지</span>
                    </li>
                    <li>
                        <strong>객실 구성</strong>
                        <span>{item.room_configuration}</span>
                    </li>
                    <li>
                        <strong>투숙 인원</strong>
                        <span>{item.occupancy.standard}~{item.occupancy.maximum}명</span>
                    </li>
                    <li>
                        <strong>객실 전망</strong>
                        <span>{item.view}</span>
                    </li>
                    <li>
                        <strong>베드</strong>
                        <span>{item.bed}</span>
                    </li>
                    <li>
                        <strong>전체/실제 면적</strong>
                        <span>{item.size_m2}m²</span>
                    </li>
                    <li>
                        <strong>대표전화</strong>
                        <span>064-735-5114</span>
                    </li>
                    <li>
                        <strong>예약</strong>
                        <span>1588-1142</span>
                    </li>
                </ul>

                <div className={styles.buttonGroup}>
                    <button className={styles.btnOutline} onClick={handleShow}>도면보기</button>
                    <Link to="/qna" className={styles.btnOutline}>문의하기</Link>
                    <Link to="/select-room" className={styles.btnFill}>예약하기</Link>
                </div>

                <h6>{item.disc_title}</h6>
                <p>{item.disc_cont}</p>
            </section>

            <section className={styles.common}>
                <h4>제공 서비스</h4>
                <ul>
                {commonInfo.services.map((s, i) => (
                    <li key={i}>{s}</li>
                ))}
                </ul>

                <h4>어메니티</h4>
                <div className={styles.amenities}>
                    <div className={styles.col}>
                        <strong>침실</strong>
                        <ul>{commonInfo.amenities.bedroom.map((a, i) => <li key={i}>{a}</li>)}</ul>
                    </div>
                    <div className={styles.colWide}>
                        <strong>욕실</strong>
                        <ul className={styles.bathroomList}>{commonInfo.amenities.bathroom.map((a, i) => <li key={i}>{a}</li>)}</ul>
                    </div>
                    <div className={styles.col}>
                        <strong>미니바</strong>
                        <ul>{commonInfo.amenities.minibar.map((a, i) => <li key={i}>{a}</li>)}</ul>
                    </div>
                </div>

                <h4>조식</h4>
                <p>{commonInfo.breakfast}</p>

                <h4>룸서비스</h4>
                <ul>
                {commonInfo.room_service.map((s, i) => <li key={i}>{s}</li>)}
                </ul>

                <h4>부대시설</h4>
                <ul>
                {commonInfo.facilities.map((f, i) => (
                    <li key={i}>
                    {f.name} - {f.is_free ? '무료 이용 가능' : '유료'}
                    </li>
                ))}
                </ul>

                <h4>취소 및 환불 규정</h4>
                <p><strong>성수기</strong></p>
                <ul>
                {commonInfo.reservation.peak_season.map((r, i) => <li key={`peak${i}`}>{r}</li>)}
                </ul>
                <p><strong>비수기</strong></p>
                <ul>
                {commonInfo.reservation.off_season.map((r, i) => <li key={`off${i}`}>{r}</li>)}
                </ul>
            </section>

            <Modal show={showModal} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>도면 보기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={`${process.env.PUBLIC_URL}/img/room/${item.id}_5.gif`} alt="도면 이미지" style={{ width: '100%' }} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default RoomDetail;
