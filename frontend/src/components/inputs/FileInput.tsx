"use client";

import {
  FC,
  InputHTMLAttributes,
  ReactNode,
  DragEvent,
  useRef,
  useState,
} from "react";
import { FileUploadIcon } from "../icons/FileUploadIcon";

export interface FileInputProps {
  title?: string;
  placeHolder?: ReactNode;
  icon?: ReactNode;
  acceptedFileType?: string;
  multiple?: boolean;
  onDrop?: (e: DragEvent<HTMLLabelElement>) => void;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "accept" | "multiple" | "onChange"
  >;
  files?: FileList | null;
  onFilesChange?: (files: FileList) => void;
}


export const FileInput: FC<FileInputProps> = ({
  icon = <FileUploadIcon size={75} color="#5D6D7E" strokeWidth={0.8} />,
  multiple = false,
  onDrop,
  inputProps = {},
  title = "Browse Files",
  placeHolder = (
    <>
      Drag and drop your
      <br />
      file{multiple ? "s" : ""} here
    </>
  ),
  acceptedFileType = "*/*",
  files,
  onFilesChange,
}) => {
  const [dragCounter, setDragCounter] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDragging = dragCounter > 0;

  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragCounter((prev) => prev + 1);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragCounter((prev) => Math.max(prev - 1, 0));
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragCounter(0);

    const droppedFiles = e.dataTransfer.files;
    if (onFilesChange) onFilesChange(droppedFiles);
    if (onDrop) onDrop(e);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && onFilesChange) {
      onFilesChange(e.target.files);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <label
      className={`relative w-[28.125rem] min-h-[18.75rem] rounded-[0.625rem] bg-surface ${
        isDragging ? "border-4" : "border-2"
      } border-border flex flex-col items-center justify-center px-4 py-6 gap-4 cursor-pointer transition-all duration-200 focus-within:ring-2 focus-within:ring-border`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {isDragging && (
        <div
          className="absolute inset-0 bg-primary/10 backdrop-blur flex items-center justify-center text-primary-text text-lg font-semibold rounded-[0.625rem] pointer-events-none z-10"
          aria-hidden="true"
        >
          Drop file{multiple ? "s" : ""} here!
        </div>
      )}

      <div className="flex flex-col items-center gap-2 z-0 pointer-events-none">
        {icon && <div>{icon}</div>}

        <div className="text-[1.125rem] text-secondary-text text-center">
          {placeHolder}
        </div>

        <div className="relative py-1 flex items-center gap-2 w-full">
          <p className="absolute px-3 bg-surface text-[0.75rem] text-secondary-text left-1/2 -translate-x-1/2">
            OR
          </p>
          <hr className="flex-1 border-border" />
        </div>

        <div
          className="btn text-primary-text w-[16.875rem] h-[3.4375rem] rounded-[0.625rem] border-none flex items-center justify-center"
          aria-hidden="true"
        >
          {title}
        </div>
      </div>

      <input
        {...inputProps}
        ref={inputRef}
        type="file"
        accept={acceptedFileType}
        multiple={multiple}
        className="sr-only"
        onChange={handleFileChange}
      />

      {files && (
        <div className="w-full max-h-[6rem] overflow-y-auto px-2">
          <ul className="text-center text-sm text-primary-text space-y-1">
            {Array.from(files).map((file, index) => (
              <li key={index} className="truncate">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </label>
  );
};

export default FileInput;
