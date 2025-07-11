"use client";

import { FC, ReactNode, InputHTMLAttributes, ChangeEvent } from "react";
import { TextFieldIcon } from "../icons/TextFieldIcon";

export interface TextInputProps {
  title?: string;
  placeholder?: string;
  name?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange" | "name" | "placeholder"
  >;
}

const TextInput: FC<TextInputProps> = ({
  title = "Text",
  placeholder = "Type here...",
  name,
  icon = <TextFieldIcon color="#2C3E50" />,
  value = "",
  onChange = () => {},
  inputProps = {},
}) => {
  return (
    <label htmlFor={name} className="block space-y-[0.625rem] w-[23.125rem]">
      <p className="text-[1.125rem] text-primary-text">{title}</p>
      <div className="bg-background flex items-center p-4 gap-[0.75rem] rounded-[0.75rem] focus-within:ring-2 focus-within:ring-border transition">
        <span>{icon}</span>
        <input
          className="w-full text-primary-text outline-none ring-0 focus:ring-0 focus:outline-none"
          {...inputProps}
          name={name}
          value={value}
          type="text"
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </label>
  );
};

export default TextInput;
