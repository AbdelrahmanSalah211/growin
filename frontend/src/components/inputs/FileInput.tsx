"use client";

import { FC, InputHTMLAttributes, ReactNode } from "react";

export interface FileInputProps {
  title?: string;
  placeHolder?: string;
  icon?: ReactNode;
  AcceptedFileType?: string;
  Multiple?: boolean;
  onDrop?: () => {};
  InputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const FileInput: FC<FileInputProps> = ({
  icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-25"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  ),
  Multiple = false,
  onDrop = () => {},
  InputProps = {},
  title = "Upload File",
  placeHolder = "Drag & drop or click to upload",
  AcceptedFileType = "*/*",
}) => {
  return (
    <>
      <label
        htmlFor="upload"
        className=" h-[18.75rem] w-[28.125rem] rounded-[0.625rem] bg-[#FFFFFF] border-[#E0E6EB] border-[0.3125rem] flex flex-col items-center justify-center"
      >
        {icon && <div>{icon}</div>}
        <p className="text-[1.25rem] text-[#2C3E50]">{placeHolder}</p>
        <button className="btn btn-[#F2F5F7] h-[3.4375rem] w-[16.875rem] rounded-[0.625rem] border-none hover:btn-primary">
          Browse Files
        </button>
        {/* <div className="btn btn-[#F2F5F7] h-[3.4375rem] w-[16.875rem] rounded-[0.625rem] border-none hover:btn-primary">
          Browse files
        </div> */}
        <input
          type="file"
          accept={AcceptedFileType}
          multiple={Multiple}
          onDrop={onDrop}
          id="upload"
          className="opacity-0 "
        />
      </label>
    </>
  );
};
export default FileInput;
