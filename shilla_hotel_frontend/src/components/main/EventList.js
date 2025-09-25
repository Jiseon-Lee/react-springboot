import React from 'react'

import CardItem from './CardItem';

function Event(props) {
    let data = props.data;
    console.log("event ", data);

    return (
        <div className="mt-5">
            <h2>이벤트</h2>
            <div className="row">
                {
                    data.map(product => (
                        <div className="col-md-4">
                            <CardItem product={product} type="event" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Event
