import { FC } from "react";
import { IIcon } from "@/interfaces/IIcon";

export const LeftCaretIcon: FC<IIcon> = ({
  size = 24,
  strokeWidth = 1.5, // Unused
  color = "#000000",
  className = "",
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.6014 4.46967C14.8943 4.76256 14.8943 5.23744 14.6014 5.53033L8.23741 11.8943C8.13978 11.9919 8.13978 12.1502 8.23741 12.2478L14.6014 18.6118C14.8943 18.9047 14.8943 19.3796 14.6014 19.6725C14.3085 19.9654 13.8336 19.9654 13.5407 19.6725L7.17675 13.3085C6.49333 12.6251 6.49333 11.517 7.17675 10.8336L13.5407 4.46967C13.8336 4.17678 14.3085 4.17678 14.6014 4.46967Z"
          fill={color}
        />
      </g>
    </svg>
  );
};
