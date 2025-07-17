"use client";

import {
  FC,
  ChangeEvent,
  ReactNode,
  InputHTMLAttributes,
  useState,
} from "react";
import { KeySkeletonIcon } from "@/components/icons/KeySkeletonIcon";
import { EyeIcon } from "@/components/icons/EyeIcon";
import { EyeClosedIcon } from "@/components/icons/EyeClosedIcon";

export interface PasswordInputProps {
  id?: string;
  title?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  hiddenPasswordIcon?: ReactNode;
  visiblePasswordIcon?: ReactNode;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange" | "name" | "id"
  >;
}

const PasswordInput: FC<PasswordInputProps> = ({
  id,
  title = "Password",
  placeholder = "Enter your password",
  name,
  value = "",
  onChange = () => {},
  icon = <KeySkeletonIcon color="#2C3E50" />,
  hiddenPasswordIcon = <EyeClosedIcon color="#2C3E50" />,
  visiblePasswordIcon = <EyeIcon color="#2C3E50" />,
  inputProps = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const inputId = id || name;

  return (
    <label htmlFor={inputId} className="block space-y-[0.625rem] max-w-md">
      <p className="text-base text-primary-text">{title}</p>

      <div className="bg-background flex items-center p-4 gap-[0.75rem] rounded-[0.75rem] focus-within:ring-2 focus-within:ring-border transition">
        {icon && <span>{icon}</span>}

        <input
          id={inputId}
          className="w-full text-lg text-primary-text outline-none ring-0 focus:ring-0 focus:outline-none bg-background"
          {...inputProps}
          name={name}
          value={value}
          type={isVisible ? "text" : "password"}
          onChange={onChange}
          placeholder={placeholder}
        />

        <button
          type="button"
          onClick={toggleVisibility}
          className="text-primary-text cursor-pointer"
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? visiblePasswordIcon : hiddenPasswordIcon}
        </button>
      </div>
    </label>
  );
};

export default PasswordInput;