import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem } from '../store';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import styles from './Cart.module.scss'; // SCSS 모듈 import

function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    return (
        <>
            <Header />
            <div className={styles.cartContainer}>
                <h2>장바구니</h2>
                {cart.length === 0 ? (
                    <p className={styles.emptyCart}>장바구니가 비어있습니다.</p>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>이미지</th>
                                    <th>객실명</th>
                                    <th>기간</th>
                                    <th>인원</th>
                                    <th>가격</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <img src={`${process.env.PUBLIC_URL}/img/room/${item.imgurl}`} alt={item.name} />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.startDate} ~ {item.endDate}</td>
                                        <td>성인 {item.adults}, 어린이 {item.children}, 유아 {item.infants}</td>
                                        <td>{item.price.toLocaleString()}원</td>
                                        <td>
                                            <button className={styles.deleteBtn} onClick={() => dispatch(deleteItem(item.id))}>삭제</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={styles.totalPrice}>
                            <strong>총 금액: </strong>{totalPrice.toLocaleString()}원
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Cart;
