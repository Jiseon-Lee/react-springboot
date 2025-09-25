import React from 'react'

import styles from './RoomPackage.module.scss'
import CardItem from './CardItem';

function RoomPackage(props) {
    let data = props.data;

    return (
        <div className="mt-5">
            <h2 className={styles.package_title}>객실패키지</h2>
            <div className={"row " + styles.package_cont}>
                {
                    data.map((product, id) => (
                        <div className={"col-md-4 " + styles.package_product} key={id}>
                            <CardItem product={product} type="package" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RoomPackage
