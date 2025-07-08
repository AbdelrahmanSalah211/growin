"use client";

import React from "react";

interface TextareaProps {
    title?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    value: string;
    onChange?: (value: string) => void;
    textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

const Textarea: React.FC<TextareaProps> = ({
    title = "Text",
    placeholder = "Type your text here…",
    icon,
    value,
    onChange,
    textareaProps = {},
}) => {
    return (
        <div className="flex flex-col gap-1 w-[48.75rem]">
            <label className="text-lg text-primary-text">{title}</label>
            <div className="flex items-start bg-background px-3 py-2 rounded-lg gap-2">
                {icon && <span className="pt-1 text-primary-text">{icon}</span>}
                <textarea
                    value={value}
                    onChange={
                        onChange ? (e) => onChange(e.target.value) : undefined
                    }
                    placeholder={placeholder}
                    {...textareaProps}
                    className="flex-1 outline-none bg-background text-primary-text resize-none"
                />
            </div>
        </div>
    );
};

export default Textarea;
