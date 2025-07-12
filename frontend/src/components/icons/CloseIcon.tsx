import { FC } from "react";
import { IIcon } from "@/interfaces/IIcon";

export const CloseIcon: FC<IIcon> = ({
  size = 24,
  strokeWidth = 1.5,
  color = "#000000",
  className = "",
}) => {
  return (
    <svg
      viewBox="-0.5 0 25 25"
      fill="none"
      className={className}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M3 21.32L21 3.32001"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 3.32001L21 21.32"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
