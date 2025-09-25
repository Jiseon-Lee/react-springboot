import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import styles from './Room.module.scss';

function Room() {

    const [rooms, setRooms] = useState([]);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
        axios.get('./json/roomInfo.json')
        .then(response => {
            setRooms(response.data);
        })
        .catch(error => {
            console.error('데이터를 불러오는 중 오류 발생:', error);
        });
    }, []);

    return (
        <div className={"mt-5 " + styles.room}>
            <Swiper
                modules={[Navigation, Thumbs]}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                spaceBetween={10}
                className={"main-swiper " + styles.room_swiper_main}
            >
                {rooms.map((room, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="row">
                            <div className={"col-md-6 offset-md-1 " + styles.room_swiper_main_img}>
                                <img src={`${process.env.PUBLIC_URL}/img/room/${room.id}_1.jpg`} alt={room.name}/>
                            </div>
                            <div className={"col-md-4 " + styles.room_swiper_main_desc}>
                                <h3>{room.name}</h3>
                                <p>{room.title}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress
                className="thumb-swiper mt-3"
            >
                {rooms.map((room, idx) => (
                    <SwiperSlide key={idx}>
                        <img
                        src={`${process.env.PUBLIC_URL}/img/room/${room.id}_1.jpg`}
                        alt={room.name}
                        style={{ width: '100%', cursor: 'pointer', borderRadius: '4px' }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Room
