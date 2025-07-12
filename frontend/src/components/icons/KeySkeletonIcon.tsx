import { FC } from "react";
import { IIcon } from "@/interfaces/IIcon";

export const KeySkeletonIcon: FC<IIcon> = ({
  size = 24,
  strokeWidth = 0,
  color = "#000000",
  className = "",
}) => {
  return (
    <svg
      fill={color}
      width={size}
      height={size}
      className={className}
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title>key-skeleton</title>
        <path stroke={color} strokeWidth={strokeWidth} d="M20.959 1.209c-5.405 0.007-9.784 4.386-9.791 9.79v0.001c0.010 2.443 0.922 4.672 2.419 6.372l-0.009-0.011-10.108 10.107c-0.136 0.136-0.22 0.324-0.22 0.531s0.084 0.395 0.22 0.531v0l2 2c0.136 0.134 0.322 0.218 0.528 0.218 0.415 0 0.751-0.336 0.751-0.751 0-0.207-0.083-0.394-0.218-0.529l-1.47-1.469 1.939-1.939 4.47 4.47c0.136 0.137 0.324 0.221 0.532 0.221 0.415 0 0.751-0.336 0.751-0.751 0-0.208-0.085-0.397-0.222-0.533l-4.469-4.469 6.581-6.581c1.682 1.466 3.894 2.363 6.314 2.373h0.002c5.399-0.011 9.771-4.391 9.771-9.791s-4.372-9.78-9.77-9.791h-0.001zM20.959 19.291c-4.579 0-8.291-3.712-8.291-8.291s3.712-8.291 8.291-8.291c4.579 0 8.291 3.712 8.291 8.291 0 0 0 0 0 0v0c-0.006 4.577-3.714 8.285-8.29 8.291h-0.001z"></path>
      </g>
    </svg>
  );
};
