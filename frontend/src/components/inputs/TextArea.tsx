"use client";

import { ReactNode, TextareaHTMLAttributes, FC, ChangeEvent } from "react";
import { TextFieldIcon } from "../icons/TextFieldIcon";

export interface TextareaProps {
  title?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  icon?: ReactNode;
  textareaProps?: Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange" | "name" | "placeholder"
  >;
}

const TextArea: FC<TextareaProps> = ({
  title = "Text",
  placeholder = "Type your text here…",
  name,
  value = "",
  onChange = () => {},
  icon = <TextFieldIcon color="#2C3E50" />,
  textareaProps = {},
}) => {
  return (
    <label className="block space-y-[0.625rem] w-[48.75rem]">
      <p className="text-[1.125rem] text-primary-text">{title}</p>

      <div className="flex items-start bg-background p-4 gap-[0.75rem] rounded-[0.75rem] focus-within:ring-2 focus-within:ring-border transition">
        {icon && <span className="text-primary-text">{icon}</span>}

        <textarea
          className="w-full min-h-[10rem] text-primary-text outline-none ring-0 focus:ring-0 focus:outline-none bg-background resize-none"
          {...textareaProps}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </label>
  );
};

export default TextArea;
