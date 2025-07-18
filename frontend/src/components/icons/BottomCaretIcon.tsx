import { FC } from "react";
import { IIcon } from "@/interfaces/IIcon";

export const BottomCaretIcon: FC<IIcon> = ({
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
          d="M4.46938 9.39966C4.76227 9.10677 5.23715 9.10677 5.53004 9.39966L11.894 15.7636C11.9916 15.8613 12.1499 15.8613 12.2476 15.7636L18.6115 9.39966C18.9044 9.10677 19.3793 9.10677 19.6722 9.39966C19.9651 9.69256 19.9651 10.1674 19.6722 10.4603L13.3082 16.8243C12.6248 17.5077 11.5168 17.5077 10.8333 16.8243L4.46938 10.4603C4.17649 10.1674 4.17649 9.69256 4.46938 9.39966Z"
          fill={color}
        />
      </g>
    </svg>
  );
};
