import { FC } from "react";
import { IIcon } from "@/interfaces/IIcon";

export const EyeClosedIcon: FC<IIcon> = ({
  size = 24,
  strokeWidth = 1.5,
  color = "#000000",
  className = "",
}) => {
  return (
    <svg
      fill="none"
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
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
          d="M9.76404 5.29519C10.4664 5.10724 11.2123 5 12 5C15.7574 5 18.564 7.4404 20.2326 9.43934C21.4848 10.9394 21.4846 13.0609 20.2324 14.5609C20.0406 14.7907 19.8337 15.0264 19.612 15.2635M12.5 9.04148C13.7563 9.25224 14.7478 10.2437 14.9585 11.5M3 3L21 21M11.5 14.9585C10.4158 14.7766 9.52884 14.0132 9.17072 13M4.34914 8.77822C4.14213 9.00124 3.94821 9.22274 3.76762 9.43907C2.51542 10.9391 2.51523 13.0606 3.76739 14.5607C5.43604 16.5596 8.24263 19 12 19C12.8021 19 13.5608 18.8888 14.2744 18.6944"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
