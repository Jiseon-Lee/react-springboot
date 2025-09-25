import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'

import Header from '../components/header/Header'
import BookForm from '../components/main/BookForm';
import RoomPackage from '../components/main/RoomPackageList';
import Event from '../components/main/EventList';
import Room from '../components/main/Room';
import Footer from '../components/footer/Footer';
import MainSlider from '../components/main/MainSlider';
import { Container } from 'react-bootstrap';

function Home() {

    const [packageData, setPackageData] = useState([]);
    const [eventData, setEventData] = useState([]);

    useEffect(() => {
        axios.get("./json/roomPackage.json")
        .then(res => setPackageData(res.data.slice(0, 3)))
        .catch(error => console.error('package데이터를 불러오는 중 오류 발생:', error));

        axios.get("./json/event_product.json")
        .then(res => setEventData(res.data.slice(0, 3)))
        .catch(error => console.error('package데이터를 불러오는 중 오류 발생:', error));
    }, []);

    return (
        <>
            <Header></Header>
            <MainSlider/>
            <Container>
                <BookForm/>
                <RoomPackage data={packageData}/>
                <Event data={eventData}/>
                <Room/>
            </Container>
            <Footer/>
        </>
    )
}

export default Home
