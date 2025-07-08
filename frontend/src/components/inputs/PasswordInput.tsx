"use client";

import React, { useState } from "react";

interface PasswordInputProps {
    title?: string;
    placeholder?: string;
    name?: string;
    value: string;
    onChange?: (value: string) => void;
    icon?: React.ReactNode;
    hiddenPasswordIcon?: React.ReactNode;
    visiblePasswordIcon?: React.ReactNode;
    inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    title = "Password",
    placeholder = "Enter your password",
    name,
    value,
    onChange,
    icon,
    hiddenPasswordIcon,
    visiblePasswordIcon,
    inputProps = {},
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible((prev) => !prev);

    return (
        <div className="flex flex-col gap-1 w-[23.125rem]">
            <label htmlFor={name} className="text-lg text-primary-text">
                {title}
            </label>
            <div className="flex items-center bg-background px-3 py-2 rounded-lg gap-2">
                {icon && (
                    <span className="text-lg text-primary-text">{icon}</span>
                )}

                <input
                    id={name}
                    name={name}
                    value={value}
                    type={isVisible ? "text" : "password"}
                    onChange={
                        onChange ? (e) => onChange(e.target.value) : undefined
                    }
                    placeholder={placeholder}
                    {...inputProps}
                    className="flex-1 outline-none bg-background text-primary-text"
                />

                <button
                    type="button"
                    onClick={toggleVisibility}
                    className="text-lg text-primary-text"
                >
                    {isVisible ? visiblePasswordIcon : hiddenPasswordIcon}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
