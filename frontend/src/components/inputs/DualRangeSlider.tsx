"use client";

import { FC, ChangeEvent } from "react";

export interface DualRangeSliderProps {
  minValue: number;
  maxValue: number;
  min: number;
  max: number;
  step?: number;
  onMinChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onMaxChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  minLabel: string;
  maxLabel: string;
}

const DualRangeSlider: FC<DualRangeSliderProps> = ({
  minValue,
  maxValue,
  min,
  max,
  step = 1,
  onMinChange = () => {},
  onMaxChange = () => {},
  minLabel,
  maxLabel,
}) => {
  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;
  return (
    <div className="relative w-[20rem] max-w-sm  space-y-6">
      <div className="relative flex justify-between">
        <span
          className="absolute  text-sm font-semibold text-secondary-text bg-surface"
          style={{ left: `calc(${minPercent}% - 0.75rem)` }}
        >
          {minValue}
        </span>
        <span
          className="absolute  text-sm font-semibold text-secondary-text bg-surface"
          style={{ left: `calc(${maxPercent}% - 0.875rem)` }}
        >
          {maxValue}
        </span>
      </div>

      <div className="relative h-[0.625rem] bg-background rounded border-[0.0625rem] border-border">
        <div
          className="absolute h-[0.625rem] bg-primary-text rounded"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={onMinChange}
          className="
            absolute w-full h-[0.625rem] appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary-text
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-primary-text
            [&::-moz-range-thumb]:border
            [&::-moz-range-thumb]:border-border
            [&::-moz-range-thumb]:pointer-events-auto
          "
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={onMaxChange}
          className="
            absolute w-full h-[0.625rem] appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary-text
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-primary-text
            [&::-moz-range-thumb]:border
            [&::-moz-range-thumb]:border-border
            [&::-moz-range-thumb]:pointer-events-auto
 "
        />
      </div>

      <div className="flex justify-between text-sm font-medium text-secondary-text">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
};

export default DualRangeSlider;
