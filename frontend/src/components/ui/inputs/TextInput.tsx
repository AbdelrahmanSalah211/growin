"use client";

import { FC, ReactNode, InputHTMLAttributes, ChangeEvent } from "react";
import { TextFieldIcon } from "@/components/icons/TextFieldIcon";

export interface TextInputProps {
  id?: string;
  title?: string;
  placeholder?: string;
  name?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange" | "name" | "placeholder" | "id"
  >;
}

const TextInput: FC<TextInputProps> = ({
  id,
  title = "Text",
  placeholder = "Type here...",
  name,
  icon = <TextFieldIcon color="#2C3E50" />,
  value = "",
  onChange = () => {},
  inputProps = {},
}) => {
  const inputId = id || name;

  return (
    <label htmlFor={inputId} className="block space-y-[0.625rem] max-w-md">
      <p className="text-base text-primary-text">{title}</p>
      <div className="bg-background flex items-center p-4 gap-[0.75rem] rounded-[0.75rem] focus-within:ring-2 focus-within:ring-border transition">
        <span>{icon}</span>
        <input
          {...inputProps}
          id={inputId}
          name={name}
          value={value}
          type="text"
          onChange={onChange}
          placeholder={placeholder}
          className="w-full text-lg text-primary-text outline-none ring-0 focus:ring-0 focus:outline-none"
        />
      </div>
    </label>
  );
};

export default TextInput;
