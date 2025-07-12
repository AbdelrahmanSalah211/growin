"use client";

import { FC, ReactNode, InputHTMLAttributes, ChangeEvent } from "react";
import { EmailAddressSignAtIcon } from "../icons/EmailAddressSignAtIcon";

export interface EmailInputProps {
  title?: string;
  placeholder?: string;
  name?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "name" | "value" | "onChange" | "placeholder"
  >;
}

const EmailInput: FC<EmailInputProps> = ({
  title = "Email",
  placeholder = "you@example.com",
  name,
  icon = <EmailAddressSignAtIcon color="#2C3E50" />,
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
          name={name}
          value={value}
          type="email"
          onChange={onChange}
          placeholder={placeholder}
          {...inputProps}
        />
      </div>
    </label>
  );
};

export default EmailInput;
