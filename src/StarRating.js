import { useState } from "react";

export default function StarRating({
  max = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  onSetRating = (r) => {},
}) {
  // state variables
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  // derived state variables
  const displayedRating = tempRating || rating;
  const componentStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    className: className,
  };
  const startsStyle = { display: "flex" };
  const testStyle = {
    lineHeight: "1",
    color: color,
    fontSize: `${size / 2}px`,
  };
  // callbacks
  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  return (
    <div style={componentStyle}>
      <div style={startsStyle}>
        {Array.from({ length: max }, (_, i) => (
          <Star
            key={i}
            fill={displayedRating >= i + 1}
            color={color}
            size={size}
            onRate={() => handleRating(i + 1)}
            onHover={() => setTempRating(i + 1)}
            onLeave={() => setTempRating(0)}
          >
            {displayedRating >= i + 1 ? (
              <FilledStar color={color} />
            ) : (
              <EmptyStar color={color} />
            )}
          </Star>
        ))}
      </div>
      <p style={testStyle}>{displayedRating || ""}</p>
    </div>
  );
}

function Star({ size, onRate, onHover, onLeave, children }) {
  return (
    <span
      style={{
        height: `${size}px`,
        width: `${size}px`,
        display: "block",
        cursor: "pointer",
      }}
      onClick={() => onRate()}
      onMouseEnter={() => onHover()}
      onMouseLeave={() => onLeave()}
    >
      {children}
    </span>
  );
}

function EmptyStar({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

function FilledStar({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={color}
      stroke={color}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
