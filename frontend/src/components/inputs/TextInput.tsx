"use client";
import { FC, InputHTMLAttributes, ReactNode } from "react";

export interface TextInputProps {
  title?: string;
  placeHolder?: string;
  name?: string;
  icon?: ReactNode;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  value?: string;
  onChange?: () => {};
}

const TextInput: FC<TextInputProps> = ({
  name,
  title = "Text",
  placeHolder = "Type here..",
  icon = (
    <svg fill="#2C3E50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M7,7 L7,12 L8.5,12 C8.77614237,12 9,12.2238576 9,12.5 C9,12.7761424 8.77614237,13 8.5,13 L4.5,13 C4.22385763,13 4,12.7761424 4,12.5 C4,12.2238576 4.22385763,12 4.5,12 L6,12 L6,7 L4,7 L4,7.5 C4,7.77614237 3.77614237,8 3.5,8 C3.22385763,8 3,7.77614237 3,7.5 L3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L9.5,6 C9.77614237,6 10,6.22385763 10,6.5 L10,7.5 C10,7.77614237 9.77614237,8 9.5,8 C9.22385763,8 9,7.77614237 9,7.5 L9,7 L7,7 Z M12.5,7 C12.2238576,7 12,6.77614237 12,6.5 C12,6.22385763 12.2238576,6 12.5,6 L18.5,6 C19.8807119,6 21,7.11928813 21,8.5 L21,16.5 C21,17.8807119 19.8807119,19 18.5,19 L6.5,19 C5.11928813,19 4,17.8807119 4,16.5 L4,15.5 C4,15.2238576 4.22385763,15 4.5,15 C4.77614237,15 5,15.2238576 5,15.5 L5,16.5 C5,17.3284271 5.67157288,18 6.5,18 L18.5,18 C19.3284271,18 20,17.3284271 20,16.5 L20,8.5 C20,7.67157288 19.3284271,7 18.5,7 L12.5,7 Z"></path>{" "}
      </g>
    </svg>
  ),
  inputProps = {},
  onChange = () => {},
}) => {
  return (
    <>
      <label htmlFor={name} className="block w-[23.125rem]">
          
        <p className=" w-fit text-[#2C3E50] font-normal">{title}</p>
        <div className=" flex bg-[#F2F5F7] h-[3.4375rem] rounded-[0.625rem]">
          {icon && <span className="relative top-[0.8rem]">{icon}</span>}
          <input
            {...inputProps}
            type="text"
            onChange={onChange}
            placeholder={placeHolder}
            name={name}
            className=" focus:outline-none w-full"
            
            />
        </div>
      </label>
    </>
  );
};

export default TextInput;
