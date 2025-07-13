import React from "react";

interface RatingProps {
  rating: number;
  color: string;
}

const Star = ({ filled, half, color }: { filled: boolean; half: boolean; color: string }) => (
  <svg
    width="2.5rem"
    height="2.5rem"
    viewBox="0 0 24 24"
    fill={filled ? color : "#e5e7eb"}
    stroke="#e5e7eb"
    strokeWidth="1"
    style={{ display: "inline-block" }}
  >
    {half ? (
      <>
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor={color} />
            <stop offset="50%" stopColor="#e5e7eb" />
          </linearGradient>
        </defs>
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill="url(#half)"
        />
      </>
    ) : (
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={filled ? color : "#e5e7eb"}
      />
    )}
  </svg>
);

const Rating: React.FC<RatingProps> = ({ rating, color }) => {
  const validRating = Math.max(0, Math.min(rating, 5));
  const fullStars = Math.floor(validRating);
  const halfStar = validRating % 1 !== 0;

  return (
    <div className="flex gap-2">
      {[0, 1, 2, 3, 4].map((idx) => (
        <Star
          key={idx}
          filled={idx < fullStars}
          half={idx === fullStars && halfStar}
          color={color}
        />
      ))}
    </div>
  );
};

export default Rating;
