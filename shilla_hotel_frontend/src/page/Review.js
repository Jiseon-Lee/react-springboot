import React, { useState, useEffect } from 'react';
import RecentReviews from '../components/sub/RecentReviews';
import ReviewForm from '../components/sub/ReviewForm';
import ResultView from '../components/sub/ResultView';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';


function Review() {
  const [recentReviews, setRecentReviews] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then(res => res.json())
      .then(data => setRecentReviews(data))
      .catch(err => console.error("최근 리뷰 가져오기 실패", err));
  }, []);

  const handleAnalysisResult = (data) => {
    setResult(data);
    // 분석 요청 후 최근 리뷰도 갱신
    fetch("http://localhost:5000/api/reviews")
      .then(res => res.json())
      .then(data => setRecentReviews(data));
  };

  return (
    <>
        <Header/>
        <div className="container" style={{ padding: "20px" }}>
            <h2> 최근 리뷰 5개</h2>
            <RecentReviews reviews={recentReviews} />

            <h2>리뷰 작성</h2>
            <ReviewForm onResult={handleAnalysisResult} />

            {result && <ResultView result={result} />}
        </div>
        <Footer/>
    </>
  );
}
export default Review;
