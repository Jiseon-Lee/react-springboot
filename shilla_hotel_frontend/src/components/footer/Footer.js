import React from 'react';
import { Link } from "react-router-dom";

import styles from './Footer.module.scss';

function Footer() {
    return (
        <footer className={"text-lg-start " + styles.footer}>
            <div className={styles.footer_top}>
                <div className="container my-4 p-4">
                    <div className="row">
                        <div className={"col-lg-3 col-md-6 mb-4 mb-md-0 " + styles.footer_top_jeju}>
                            <div className={styles.footer_top_jeju_logo}>
                                <Link to="/"><img src={`${process.env.PUBLIC_URL}/img/footer/logo.gif"`} alt="제주신라호텔"/></Link>
                            </div>
                            <p>(주)신라호텔<br/>제주특별자치도 서귀포시 중문관광로 72번길 75 (우)63535<br/>TEL. 064-735-5114 <br/>FAX. 064-735-5415</p>
                            <ul className="list-unstyled d-flex flex-row">
                                <li>
                                    <Link className="px-2" to="#">
                                        <i class="bi bi-instagram"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="px-2" to="#">
                                        <i class="bi bi-facebook"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="px-2" to="#">
                                        <i class="bi bi-youtube"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className={"col-lg-3 col-md-6 mb-4 mb-md-0 " + styles.footer_top_brand}>
                            <ul className="list-unstyled">
                                <li className={"mb-2 " + styles.footer_top_brand_tit}>
                                    <Link to="#"><img src={`${process.env.PUBLIC_URL}/img/footer/brandTit.gif`} alt="신라호텔"/></Link>
                                </li>
                                <li className={"mb-2 " + styles.footer_top_brand_mono}>
                                    <Link to="#"><img src={`${process.env.PUBLIC_URL}/img/footer/brandMono.gif`} alt="신라모노그램"/></Link>
                                </li>
                                <li className={"mb-2 " + styles.footer_top_brand_stay}>
                                    <Link to="#"><img src={`${process.env.PUBLIC_URL}/img/footer/brandStay.gif`} alt="신라스테이"/></Link>
                                </li>
                            </ul>
                        </div>

                        <div className={"col-lg-3 col-md-6 mb-4 mb-md-0 pt-4 " + styles.footer_top_info}>
                            <h5 className="text-uppercase mb-4">소개</h5>

                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <Link to="#">호텔소개</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="#">호텔정보</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="#">층별안내도</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="#">오시는길</Link>
                                </li>
                            </ul>
                        </div>

                        <div className={"col-lg-3 col-md-6 mb-4 mb-md-0 pt-4 " + styles.footer_top_qna}>
                            <h5 className="text-uppercase mb-4">고객문의</h5>

                            <ul className="list-unstyled">
                                <li>
                                    <Link to="#">연락처</Link>
                                </li>
                                <li>
                                    <Link to="#">FAQ</Link>
                                </li>
                                <li>
                                    <Link to="#">문의하기</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer_btm}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <p>㈜호텔신라 서울특별시 중구 동호로 249 (우 : 04605) Tel: 02-2233-3131 Fax: 02-2230-3769 사업자등록번호: 203-81-43363 통신판매신고번호: 중구 00272호 대표이사 이부진 호스팅서비스제공자 삼성SDS㈜객실예약 jejushilla@samsung.com</p>
                            <p>COPYRIGHT © HOTEL SHILLA CO., LTD. ALL RIGHTS RESERVED.</p>
                        </div>
                        <div className="col-md-4">
                            <img src={`${process.env.PUBLIC_URL}/img/footer/mark_jeju.gif`} alt="인증마크"/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
