import { FC } from "react";
import { IIcon } from "@/interfaces/IIcon";

export const MenuIcon: FC<IIcon> = ({
  size = 24,
  strokeWidth = 1.5,
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
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g id="Menu / Menu_Alt_01">
          <path
            id="Vector"
            d="M12 17H19M5 12H19M5 7H19"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};
