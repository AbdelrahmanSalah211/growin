"use client";

import { FC, InputHTMLAttributes, ReactNode } from "react";

export interface SearchInputProps {
  placeholder?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: () => {};
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const SearchInput: FC<SearchInputProps> = ({
  placeholder = "Search...",
  icon = (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
          fill="#2C3E50"
        ></path>{" "}
      </g>
    </svg>
  ),
  value,
  onChange = () => {},
  inputProps = {},
}) => {
  return (
    <>
    <label htmlFor="search" className="bg-[#F2F5F7] flex w-[34.375rem] h-[2.5rem] rounded-[3rem]">
          {icon && <span className="relative top-[0.4rem]">{icon}</span>}
          <input
            {...inputProps}
            type="text"
            id="search"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full outline-none"
            />
    </label>
    </>
  );
};

export default SearchInput;
