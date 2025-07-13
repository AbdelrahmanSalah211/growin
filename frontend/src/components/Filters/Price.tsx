"use client";

import { FC, ChangeEvent } from "react";
import DualRangeSlider from "../ui/inputs/DualRangeSlider";

export interface PriceProps {
  minValue: number;
  maxValue: number;
  min: number;
  max: number;
  onMinChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onMaxChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Price: FC<PriceProps> = ({
  minValue,
  maxValue,
  min,
  max,
  onMinChange = () => {},
  onMaxChange = () => {},
}) => {
  return (
    <>
      <div>
        <h1 className="text-[1.75rem] font-extrabold text-primary-text pb-[1.25rem]">
          Price
        </h1>
        <DualRangeSlider
          minValue={minValue}
          maxValue={maxValue}
          min={min}
          max={max}
          step={10}
          onMinChange={onMinChange}
          onMaxChange={onMaxChange}
          minLabel="E£0"
          maxLabel="E£2,000"
        />
      </div>
    </>
  );
};

export default Price;
