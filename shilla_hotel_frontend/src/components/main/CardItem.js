import React from 'react'
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

import styles from './CardItem.module.scss'

function CardItem(props) {
    const {id, title, desc, start_date, end_date} = props.product;
    const type = props.type;

    let navigate = useNavigate();

    return (
        <div className={styles.card}>
            <Nav.Link onClick={() => { navigate('/' + type + '/' + id) }}>
                <img src={`${process.env.PUBLIC_URL}/img/${type}/${type}${id}.jpg`} alt={title} className="img-fluid" />
                <h4 className="my-2">{title}</h4>
                <p className="mb-2">{desc}</p>
                <span>{start_date + " ~ " + end_date}</span>
            </Nav.Link>
        </div>
    )
}

export default CardItem
