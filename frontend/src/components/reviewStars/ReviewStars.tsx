import {  FC, MouseEvent, useState } from "react";

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
  const [stars, setStars] = useState(0);
  const [starsPreview, setStarsPreview] = useState(0);

  const onMouseOver = (e: MouseEvent<HTMLInputElement>) => {
    if (!disabled) {
      setStarsPreview(+e.currentTarget.value);
    }
  };

  const onMouseOut = () => {
    if (!disabled) {
      setStarsPreview(0);
    }
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    const val = +e.currentTarget.value;
    if (val === stars) {
      setStars(0);
      onChange(0);
    } else {
      setStars(val);
      console.log("valueee")
      onChange(val)
    }
  };

  return (
    <div className="rating rating-lg rating-half">
      {ratingValues.map((starValue, idx) => (
        <input
          key={starValue}
          type="radio"
          name={name}
          className={`mask mask-star ${
            idx % 2 === 0 ? "mask-half-1" : "mask-half-2"
          } bg-secondary-text`}
          aria-label={`${starValue} star`}
          disabled={disabled}
          value={starValue}
          checked={
            disabled
              ? starValue === value
              : starValue === (starsPreview > 0 ? starsPreview : stars)
          }
          onMouseOut={onMouseOut}
          onMouseOver={onMouseOver}
          onClick={handleClick}
          onChange={() => {}}
        />
      ))}
    </div>
  );
};

export default ReviewStars;
