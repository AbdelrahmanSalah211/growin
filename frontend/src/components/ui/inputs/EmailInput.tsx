"use client";

import { FC, ReactNode, InputHTMLAttributes, ChangeEvent } from "react";
import { EmailAddressSignAtIcon } from "@/components/icons/EmailAddressSignAtIcon";

export interface EmailInputProps {
  id?: string;
  title?: string;
  placeholder?: string;
  name?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "id" | "name" | "value" | "onChange" | "placeholder"
  >;
}

const EmailInput: FC<EmailInputProps> = ({
  id,
  title = "Email",
  placeholder = "you@example.com",
  name,
  icon = <EmailAddressSignAtIcon color="#2C3E50" />,
  value = "",
  onChange = () => {},
  inputProps = {},
}) => {
  return (
    <label htmlFor={id} className="block space-y-[0.625rem] max-w-md">
      <p className="text-base text-primary-text">{title}</p>
      <div className="bg-background flex items-center p-4 gap-[0.75rem] rounded-[0.75rem] focus-within:ring-2 focus-within:ring-border transition">
        <span>{icon}</span>
        <input
          id={id}
          className="w-full text-lg text-primary-text outline-none ring-0 focus:ring-0 focus:outline-none"
          {...inputProps}
          name={name}
          value={value}
          type="email"
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </label>
  );
};

export default EmailInput;
