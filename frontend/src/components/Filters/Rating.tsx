"use client";
import { ChangeEvent, FC } from "react";
import RadioButton from "../inputs/RadioButton";

export interface RatingProps {
  value?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const Ratings: FC<RatingProps> = ({
  value,
  onChange = () => {},
  name = "rating",
}) => {
  const ratingValues: number[] = [0.5, 1.5, 2.5, 3.5, 4.5];

  return (
    <>
      <div>
        <h1 className="text-[1.75rem] font-extrabold text-primary-text pb-[1.25rem]">
          Ratings
        </h1>

        <div className="flex flex-col gap-2">
          {ratingValues.map((ratingValue) => (
            <RadioButton
              key={ratingValue.toString()}
              title={`${ratingValue} & up`}
              name={name} // same for all to group them
              value={ratingValue.toString()}
              checked={ratingValue === value}
              id={`rating-${ratingValue}`} // unique ID
              onChange={onChange}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Ratings;
