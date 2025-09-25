import React from 'react'
import Accordion from 'react-bootstrap/Accordion';

import styles from './RoomPackageDetail.module.scss';

function RoomPackageDetail({item, type}) {
  console.log(item);

  if (!item.notification) return null;
  if (type!=="package") return null;

  return (
    <div className={styles.detailCont}>
      <div className={styles.title}>
        <h3>객실 페키지</h3>
      </div>
      <div className={"d-grid gap-2 d-md-flex justify-content-md-end " + styles.btns}>
        <button className={"me-md-2 " + styles.btns_book} type="button">예약하기</button>
        <button className={styles.btns_list} type="button">목록보기</button>
      </div>
      <div className={styles.main}>
        <img src={`${process.env.PUBLIC_URL}/img/package/package${item.id}.jpg`} alt={item.name} className={styles.main_img}/>
        <img src={`${process.env.PUBLIC_URL}/img/package/package${item.id}_title.jpg`} alt={item.name} className={styles.main_title} />
        <p>{item.desc}</p>
        <p>기간 : {item.start_date} ~ {item.end_date}</p>
        <div>
          {
            item.notification && item.notification.map((noti, id) => (
              <p className={styles.main_noti} key={id}>※ {noti}</p>
            ))
          }
        </div>
        
        <table className={styles.main_benefit}>
          <tbody>
            <tr>
              <th>패키지 구성</th>
              <td>
                {
                  item.benefits && item.benefits.map((benefit, id) => (
                    <p key={id}>&bull; {benefit}</p>
                  ))
                }
              </td>
            </tr>
            <tr>
              <th>객실 타입 및 가격</th>
              <td>
                {
                  item.room_type && item.room_type.list.map((roominfo, id) => (
                    <p key={id}><b>[{roominfo.room}]</b> {roominfo.per_night}원</p>
                  ))
                }
                {
                  item.room_type.notification && item.room_type.notification.map((noti, id) => (
                    <p key={id}>{noti}</p>
                  ))
                }
              </td>
            </tr>
          </tbody>
        </table>
        {
          item.promotion.length === 0 && item.shillaS === false ? null : (
            <div className={styles.main_promotion}>
              {
                item.promotion && item.promotion.map((p, i) => (
                  <>
                    <div key={i}>
                      <p><strong>[{p.title}]</strong></p>
                      {p.desc && p.desc.map((d, j) => (
                        <p key={j}>- {d}</p>
                      ))}
                      {p.noti && p.noti.map((n, k) => (
                        <p className={styles.main_promotion_noti} key={k}>※ {n}</p>
                      ))}
                    </div>
                    {(item.promotion.length - 1 !== i || (item.promotion.length>=1 && item.shillaS===true)) ? <hr/> : null}
                  </>
                ))
              }
              {item.shillaS === true ? <ShillaS/> : null}
            </div>
          )
        }
        
        {item.shillaReward === true ? <ShillaRewards/> : null}

        <div className={styles.main_packProduct}>
          {
            item.product_list.map((product, i) => (
              <div className={styles.main_packProduct_unit} key={i}>
                <h5>{product.title}</h5>
                <img src={`${process.env.PUBLIC_URL}/img/package/package${item.id}_${2*i+1}.jpg`} alt={product.title}/>
                <img src={`${process.env.PUBLIC_URL}/img/package/package${item.id}_${2*i+2}.jpg`} alt={product.title}/>
                {[0, 1, 2].map((idx) => {
                  const prefix = ['', '- ', '※ '][idx];
                  const content = product.disc[idx];

                  return content.length > 0 ? (
                    <div className={styles.main_packProduct_unit_desc} key={idx}>
                      {content.map((d, j) => (
                        <p key={j}>{prefix}{d}</p>
                      ))}
                    </div>
                  ) : null;
                })}
              </div>
            ))
          }
        </div>
        <SwimingPool/>
        <img src={`${process.env.PUBLIC_URL}/img/sub/BN_pkgApp.jpg`} alt="신라호텔 모바일 앱" className={styles.main_banner}/>
        <UseInfo/>
        <RefundPolicy />
        <div className={"row justify-content-between " + styles.main_reservation}>
          <div className={"col-8 p-0 " + styles.main_reservation_info}>
            <p>문의 및 예약 <b>Tel</b> : 1588-1142 | <b>E-mail</b> : jejushilla@samsung.com</p>
          </div>
          <div className={"col-4 p-0 d-grid gap-2 d-md-flex justify-content-md-end " + styles.btns }>
            <button className={"me-md-2 " + styles.btns_book} type="button">예약하기</button>
            <button className={styles.btns_list} type="button">목록보기</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ShillaS(){
  return(
    <div>
      <p><strong>[신라에스 멤버십 혜택]</strong></p>
      <p>- 신라에스 멤버십(유료) 예약 시 패키지 할인 혜택을 제공합니다. (유선 예약 한정)</p>
      <p>&bull; 신라에스 브라운 : 패키지 10% 할인</p>
      <p>&bull; 신라에스 블랙 : 패키지 15% 할인 (성수기 10% 할인)</p>
      <p className={styles.main_promotion_noti}>※ 블루 멤버십 회원은 멤버십 기본 혜택으로 적용됩니다. (유선 예약 한정)</p>
    </div>
  );
}

function ShillaRewards(){
  return(
    <div className={styles.sRewards}>
      <div className={styles.sRewards_tit}>
        <img src={`${process.env.PUBLIC_URL}/img/sub/sReward.gif`} alt="신라리워즈" />
        <p>신라리워즈<br/>프로모션</p>
      </div>
      <div className={styles.sRewards_cont}>
        <p className={styles.sRewards_cont_tit}>회원전용상품 예약 시 <b>리워즈 1만 포인트(1박 당)를 추가 제공</b>합니다.</p>
        <p className={styles.sRewards_cont_desc}>추가 포인트는 하단 링크를 통한 온라인 예약 시에만 제공됩니다.<br/>
          (현재 페이지 또는 전화 예약 시 적립 불가)</p>
        <div className={styles.sRewards_cont_btns}>
          <a href="#" className={styles.sRewards_cont_btns_fst}>회원전용상품 예약하기</a>
          <a href="#" className={styles.sRewards_cont_btns_scd}>자세히보기</a>
        </div>
      </div>
    </div>
  );
}

function SwimingPool() {
  return (
    <div className={styles.swimingPool}>
      <h5>※ 실내&middot;외 수영장 이용 안내</h5>
      <p>- 운영 시간 : 실내 수영장 07:00 ~ 23:00, 패밀리/어덜트 풀 09:00 ~ 23:00</p>
      <p className={styles.padding}>ㆍ체크아웃 당일에는 15시까지 이용 가능하며, 13시 전에 입장하여 주시기 바랍니다.</p>
      <p>- 신장 1.3m 미만 어린이는 구명 조끼 착용 및 보호자 동반 시 이용 가능합니다.</p>
      <p>- 어덜트 풀은 만 19세 이상 고객만 입장 가능합니다.</p>
    </div>
  )
  
}

function UseInfo() {
  return (
    <div className={styles.useInfo}>
      <h5>※ 공통혜택</h5>
      <p>- 객실 인터넷 이용 제공</p>
      <p>- 그린 캠페인 참여 고객 대상 친환경 재생지 연필 증정</p>
      <p className={styles.padding}>* 그린 캠페인이란? 물, 에너지, 화학제품 사용의 최소화를 위해 침구 교체 없이 이용하실 경우 기념품을 드리는 친환경 캠페인입니다.</p>
      <h5>※ 이용안내</h5>
      <p>- 본 상품은 블루, Shilla S 멤버십 또는 카드사 할인 등의 중복 할인 혜택이 적용되지 않습니다.</p>
      <p>- 본 상품은 성인 2인 1실 기준이며, 요금에는 10% 부가가치세가 포함되었습니다.</p>
      <p>- 객실 타입 변경 시 추가 금액이 부과됩니다.</p>
      <p>- 기준 인원을 초과하여 투숙 시 추가 인원에 대해서는 별도의 요금이 부과됩니다.</p>
      <p className={styles.padding}>&bull; 객실 1실 당 성인은 최대 3인까지만 투숙 가능하며, 소인(37개월이상~만12세 이하)은 최대 2인까지만 동반 투숙 가능합니다.</p>
      <p className={styles.padding}>&bull; 객실 1실 당 성인과 소인 동반 시 최대 4인까지만 투숙 가능합니다.</p>
      <p>- 해당 내용은 기상 상황 또는 호텔 사정에 의해 장소 변경 및 취소 될 수 있습니다.</p>
      <p>- 체크 아웃 당일 부대시설 이용(수영장, 체련실, 사우나)은 15시까지 가능하며, 13시 전에 입장하여 주시기 바랍니다.</p>
      <p>- 어린이 고객 안전을 위하여 수영장 이용 시 신장 1.3m 미만 어린이는 반드시 구명 조끼 착용과 보호자 동반시 이용이 가능합니다.</p>
      <p>- 쾌적한 환경을 위해 전 객실 금연실로 운영합니다.</p>
      <p>- 호텔 체크인은 오후 3시이며, 체크 아웃은 오전 11시입니다.</p>
    </div>
  )
}

function RefundPolicy() {
  return (
    <Accordion defaultActiveKey={null}>
      <Accordion.Item eventKey="0" className={styles.refundPolicy}>
        <Accordion.Header className={styles.refundPolicy_header}>취소 및 환불 규정</Accordion.Header>
        <Accordion.Body className={styles.refundPolicy_body}>
          <p><strong>예약 취소/변경 및 No-Show 안내</strong></p>
          <p>성수기(5월~10월, 12월 24일~31일)</p>
          <p>
            - 숙박 예정일 7일 전까지는 위약금 없이 취소 및 변경됩니다.<br />
            - 숙박 예정일 6일 전 ~ 1일 전 18시까지 취소 및 변경 시, 최초 1박 요금의 20%가 위약금으로 부과됩니다.<br />
            - 숙박 예정일 1일 전 18시 이후 취소/변경하거나 노쇼(No-Show) 시, 최초 1박 요금의 80%가 위약금으로 부과됩니다.
          </p>

          <p>비수기(성수기 외 기간)</p>
          <p>
            - 숙박 예정일 1일 전 18시까지는 위약금 없이 취소 및 변경됩니다.<br />
            - 숙박 예정일 1일 전 18시 이후 취소/변경하거나 노쇼(No-Show) 시, 최초 1박 요금의 10%가 위약금으로 부과됩니다.
          </p>

          <p>
            ※ 홈페이지 또는 모바일 앱 예약의 경우, 금일 기준 7일 이후 체크인하는 예약에 한해 온라인에서 취소 및 변경이 가능하며,<br />
            금일 기준 7일 이내 체크인하는 예약의 경우 제주신라호텔 예약실(1588-1142)로 전화 주시기 바랍니다.
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default RoomPackageDetail
