import React from 'react'
import Accordion from 'react-bootstrap/Accordion';

import styles from './EventDetail.module.scss';

function RoomPackageDetail({item, type}) {
    console.log(item);

    if (type !== "event") return null;

    return (
        <div className={styles.detailCont}>
            <div className={styles.title}>
                <h3>이벤트</h3>
            </div>
            <div className={"d-grid gap-2 d-md-flex justify-content-md-end " + styles.btns}>
                <button className={styles.btns_list} type="button">목록보기</button>
            </div>
            <div className={styles.main}>
                <img src={`${process.env.PUBLIC_URL}/img/event/event${item.id}.jpg`} alt={item.name} className={styles.main_img}/>
                <img src={`${process.env.PUBLIC_URL}/img/event/event${item.id}_title.jpg`} alt={item.name} className={styles.main_title} />
                <p>{item.desc}</p>
                {item.start_date !== null && item.end_date !== null && <p>기간 : {item.start_date} ~ {item.end_date}</p>}
                <div>
                {
                    item.notification && item.notification.map((noti, id) => (
                    <p className={styles.main_noti} key={id}>※ {noti}</p>
                    ))
                }
                </div>

                <div className={styles.main_btn}>
                    <div className={"d-grid gap-2 d-md-flex justify-content-md-end " + styles.btns }>
                        <button className={"me-md-2 " + styles.btns_book} type="button">예약하기</button>
                        <button className={styles.btns_list} type="button">목록보기</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default RoomPackageDetail
