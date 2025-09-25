import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

function MainSlider() {
    return (
        <>
            <Carousel>
                <Carousel.Item interval={1500}>
                    <img src={`${process.env.PUBLIC_URL}/img/main/mBanner1.jpg`} width="100%"/>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img src={`${process.env.PUBLIC_URL}/img/main/mBanner2.jpg`} width="100%"/>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img src={`${process.env.PUBLIC_URL}/img/main/mBanner3.jpg`} width="100%"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={`${process.env.PUBLIC_URL}/img/main/mBanner4.jpg`} width="100%"/>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default MainSlider
