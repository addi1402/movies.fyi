import "../stylesheets/StarRating.css";
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import React from "react";

const comments = [
  "Terrible",
  "Poor",
  "Average",
  "Good",
  "Excellent"
];

export default function StarRating({
  maxRating = 10,
  color = "gray",
  className = "",
  score,
  setScore
}) {
  const [hoverScore, setHoverScore] = React.useState(null);

  let textStyle = {
    color: color,
    className: "",
  };

  const handleHover = (score) => {
    setHoverScore(score);
  };

  const handleMouseLeave = () => {
    setHoverScore(null);
  };

  return (
    <div>
      <div className="ratings" style={textStyle}>
        <div className="stars" onMouseLeave={handleMouseLeave}>
          {Array.from({ length: maxRating }, (_, i) => (
            <Star
              key={i}
              onClick={() => setScore(i + 1)}
              filled={hoverScore ? i + 1 <= hoverScore : i + 1 <= score}
              onMouseEnter={() => handleHover(i + 1)}
            />
          ))}
        </div>
        <span>{score}</span>
      </div>
      <p>
        {comments || comments.length === maxRating ? comments[hoverScore ? hoverScore -1 : score - 1] : null}
      </p>
    </div>
  );
}

function Star({ onClick, filled, onMouseEnter }) {
  return filled ? (
    <GoStarFill onClick={onClick} onMouseEnter={onMouseEnter} />
  ) : (
    <GoStar onClick={onClick} onMouseEnter={onMouseEnter} />
  );
}
