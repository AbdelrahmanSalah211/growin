import { FC } from "react";
import { IIcon } from "@/interfaces/IIcon";

export const RightCaretIcon: FC<IIcon> = ({
  size = 24,
  strokeWidth = 1.5, // Unused, but kept for interface consistency
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
          d="M9.39862 4.32752C9.69152 4.03463 10.1664 4.03463 10.4593 4.32752L16.8232 10.6915C17.5067 11.3749 17.5067 12.4829 16.8232 13.1664L10.4593 19.5303C10.1664 19.8232 9.69152 19.8232 9.39863 19.5303C9.10573 19.2374 9.10573 18.7625 9.39863 18.4697L15.7626 12.1057C15.8602 12.0081 15.8602 11.8498 15.7626 11.7521L9.39863 5.38818C9.10573 5.09529 9.10573 4.62041 9.39862 4.32752Z"
          fill={color}
        />
      </g>
    </svg>
  );
};
