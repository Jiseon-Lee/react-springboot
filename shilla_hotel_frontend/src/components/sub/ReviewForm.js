import React, { useState } from 'react';


function ReviewForm({ onResult }) {
    const [review, setReview] = useState('');

    const handleSubmit = async () => {
      if (!review.trim()) return alert("리뷰를 입력하세요");
  
      const res = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review })
      });
      console.log(res);
      const data = await res.json();
      onResult(data);
      setReview('');
    };
  return (
    <>
       <textarea
        rows="4"
        cols="50"
        placeholder="리뷰를 입력하세요"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>감성 분석</button>
    </>
  )
}

export default ReviewForm
