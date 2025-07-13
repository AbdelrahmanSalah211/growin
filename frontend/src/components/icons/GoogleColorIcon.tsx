import { FC } from "react";
import { IIcon } from "@/interfaces/IIcon";

export const GoogleColorIcon: FC<IIcon> = ({ size = 24, className = "" }) => {
  return (
    <svg
      viewBox="-0.5 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title>Google-color</title>
        <desc>Created with Sketch.</desc>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-401, -860)">
            <g transform="translate(401, 860)">
              <path
                d="M9.827 24C9.827 22.476 10.08 21.014 10.532 19.644L2.623 13.604C1.082 16.734 0.214 20.26 0.214 24C0.214 27.737 1.081 31.261 2.62 34.388L10.525 28.337C10.077 26.973 9.827 25.517 9.827 24Z"
                fill="#FBBC05"
              />
              <path
                d="M23.714 10.133C27.025 10.133 30.016 11.307 32.366 13.227L39.202 6.4C35.036 2.773 29.695 0.533 23.714 0.533C14.427 0.533 6.445 5.844 2.623 13.604L10.532 19.644C12.355 14.112 17.549 10.133 23.714 10.133Z"
                fill="#EB4335"
              />
              <path
                d="M23.714 37.867C17.549 37.867 12.355 33.888 10.532 28.356L2.623 34.395C6.445 42.156 14.427 47.467 23.714 47.467C29.446 47.467 34.918 45.431 39.025 41.618L31.518 35.814C29.4 37.149 26.732 37.867 23.714 37.867Z"
                fill="#34A853"
              />
              <path
                d="M46.145 24C46.145 22.613 45.932 21.12 45.611 19.733H23.714V28.8H36.318C35.688 31.891 33.972 34.268 31.518 35.814L39.025 41.618C43.339 37.614 46.145 31.649 46.145 24Z"
                fill="#4285F4"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
