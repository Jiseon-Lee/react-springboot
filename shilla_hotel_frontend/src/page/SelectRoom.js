import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import RoomCard from '../components/sub/RoomCard';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

function SelectRoom() {
    const { state: reservationInfo } = useLocation();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get('/json/roomInfo.json')
            .then(res => {
                setRooms(res.data);
        })
    }, []);

    return (
        <>
            <Header/>
            <div style={{width:"1200px", margin:"60px auto"}}>
                <h3>예약</h3>
                {rooms.map((room) => (
                    <RoomCard
                        key={room.code}
                        room={room}
                        reservationInfo={reservationInfo}
                    />
                ))}
            </div>
            <Footer/>
        </>
    );
}

export default SelectRoom;
