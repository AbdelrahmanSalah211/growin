"use client";

import React from "react";

interface EmailInputProps {
    title?: string;
    placeholder?: string;
    name?: string;
    value?: string;
    icon?: React.ReactNode;
    onChange?: (value: string) => void;
    inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;
}

const EmailInput: React.FC<EmailInputProps> = ({
    title = "Email",
    placeholder = "You@example.com",
    name,
    value,
    icon,
    onChange,
    inputProps = {},
}) => {
    return (
        <div className="flex flex-col gap-1 w-[23.125rem]">
            <label htmlFor={name} className="text-lg text-primary-text">
                {title}
            </label>
            <div className="flex items-center bg-background px-3 py-2 rounded-lg gap-2">
                <span className="text-lg text-primary-text ">{icon}</span>
                <input
                    id={name}
                    name={name}
                    value={value}
                    type="email"
                    onChange={
                        onChange ? (e) => onChange(e.target.value) : undefined
                    }
                    placeholder={placeholder}
                    {...inputProps}
                    className="flex-1 outline-none bg-background text-primary-text"
                />
            </div>
        </div>
    );
};

export default EmailInput;
