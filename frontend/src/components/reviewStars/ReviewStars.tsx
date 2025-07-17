"use client";

import { FC, useState, MouseEvent } from "react";

interface ReviewStarsProps {
  name?: string;
  disabled?: boolean;
  value?: number;
  onChange?: (value: number) => void;
}

const ReviewStars: FC<ReviewStarsProps> = ({
  name = "ratingStars",
  disabled = false,
  value = 0,
  onChange = () => {},
}) => {
  const ratingValues = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  const [stars, setStars] = useState(value);
  const [preview, setPreview] = useState(0);

  const currentValue = disabled ? value : preview || stars;

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    const val = +e.currentTarget.value;
    if (!disabled) {
      setStars(val === stars ? 0 : val);
      onChange(val === stars ? 0 : val);
    }
  };

  return (
    <div className="rating rating-sm rating-half">
      {ratingValues.map((val, idx) => (
        <input
          key={val}
          type="radio"
          name={name}
          className={`mask mask-star-2 ${
            idx % 2 === 0 ? "mask-half-1" : "mask-half-2"
          } bg-secondary-text`}
          value={val}
          disabled={disabled}
          checked={val === currentValue}
          onMouseOver={() => !disabled && setPreview(val)}
          onMouseOut={() => !disabled && setPreview(0)}
          onClick={handleClick}
          onChange={() => {}}
        />
      ))}
    </div>
  );
};

export default ReviewStars;
