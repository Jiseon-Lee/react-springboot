import React from 'react';

function ResultView({result}) {

    console.log(result);

    return (
        <div>
            <h3>분석 결과</h3>
            <p><strong>입력 리뷰 : </strong>{result.review}</p>
            <p><strong>감성 점수 : </strong>{result.sentiment}</p>

            <h4>유사 리뷰 추천</h4>
            <ul>
                {result.recommendations.map((item, idx) => (
                    <li key={idx}>
                        {item.review_text} (wjatn : {item.sentiment_score})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ResultView;