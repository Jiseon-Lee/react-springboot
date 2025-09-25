import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { addItem } from "../../store";
import styles from './RoomCard.module.scss';

function RoomCard({ room, reservationInfo }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        const item = {
            id: room.id,
            imgurl: room.thumb_img,
            name: room.name,
            startDate: reservationInfo.startDate,
            endDate: reservationInfo.endDate,
            adults: reservationInfo.adults,
            children: reservationInfo.children,
            infants: reservationInfo.infants,
            price: room.price,
            count: 1,
        };
        dispatch(addItem(item));
        console.log(item);
        alert(`${room.name}이(가) 장바구니에 추가되었습니다.`);
        navigate('/cart');
    };

    return (
        <div className={styles['room-card']}>
            <img
                src={`${process.env.PUBLIC_URL}/img/room/${room.thumb_img}`}
                alt={room.name}
                className={styles['room-thumb']}
            />
            <div className={styles['room-info']}>
                <h3>{room.name}</h3>
                <p className={styles['room-title']}>{room.title}</p>
                <p className={styles['room-sub']}>{room.title_sub}</p>
                <p>
                    <strong>면적:</strong> {room.size_m2}㎡ | <strong>침대:</strong> {room.bed} |{' '}
                    <strong>정원:</strong> {room.occupancy.standard}명 (최대 {room.occupancy.maximum}명)
                </p>
                <p>
                    <strong>뷰:</strong> {room.view} | <strong>위치:</strong> {room.location}
                </p>
                <p className={styles['room-desc']}>
                    {room.disc_title} - {room.disc_cont}
                </p>
                <p className={styles['room-price']}>
                    ₩{room.price.toLocaleString()} <small>~</small>
                </p>
                <button onClick={handleAddToCart}>예약하기</button>
            </div>
        </div>
    );
}

export default RoomCard;