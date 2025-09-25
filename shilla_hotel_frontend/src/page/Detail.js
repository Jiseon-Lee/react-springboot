import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import SideNav from '../components/sub/SideNav'
import RoomPackageDetail from '../components/sub/RoomPackageDetail';
import EventDetail from '../components/sub/EventDetail';
import RoomDetail from '../components/sub/RoomDetail';

function Detail({type}) {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    const typeToPath = {
        package: "/json/roomPackage.json",
        event: "/json/event_product.json",
        room: "/json/roomInfo.json",
    };

    console.log(id);
    console.log(type);

    useEffect(() => {
        setItem(null);
        console.log("useEffect");
        axios.get(typeToPath[type])
            .then((res) => {
                const found = res.data.find((data) => data.id === Number(id));
                setItem(found);
                console.log(res.data);
            })
            .catch((err) => {
                console.error("데이터 불러오기 실패", err);
            });
    }, [id, type]);

    const renderDetail = () => {
        if (!item) {
            return <p>로딩 중...</p>;
        }

        switch (type) {
            case "event":
                return <EventDetail item={item} type={type} />;
            case "package":
                return <RoomPackageDetail item={item} type={type} />;
            case "room":
                return (
                    <RoomDetail item={item} type={type} />
                );
            default:
                return <p>존재하지 않는 유형입니다.</p>;
        }
    };

    return (
        <>
            <Header/>
            <SideNav/>
            {renderDetail()}
            <Footer/>
        </>
    )
}

export default Detail
