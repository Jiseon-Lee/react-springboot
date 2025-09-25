import React from 'react'

function RecentReviews({ reviews }) {
  return (
    <ul>
      {reviews.map((r, idx) => (
        <li key={idx}>
          {r.review_text} (점수: {r.sentiment_score})
        </li>
      ))}
    </ul>
  )
}

export default RecentReviews
