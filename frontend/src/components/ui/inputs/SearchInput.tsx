"use client";

import {
  FC,
  InputHTMLAttributes,
  ReactNode,
  ChangeEvent,
  useRef,
  useEffect,
} from "react";
import { MagnifyingGlassIcon } from "@/components/icons/MagnifyingGlassIcon";

export interface SearchInputProps {
  placeHolder?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange" | "id"
  >;
}

export const SearchInput: FC<SearchInputProps> = ({
  placeHolder = "Search...",
  icon = <MagnifyingGlassIcon color="#2C3E50" />,
  value,
  onChange = () => {},
  inputProps = {},
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <label
      htmlFor="search"
      className="w-[34.375rem] flex items-center py-2 px-3 gap-2 bg-background rounded-full focus-within:ring-2 focus-within:ring-border transition"
    >
      <span>{icon}</span>
      <input
        ref={inputRef}
        className="w-full outline-none ring-0 focus:ring-0 focus:outline-none bg-transparent text-primary-text placeholder-secondary-text"
        {...inputProps}
        type="search"
        id="search"
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
      <span className="flex items-center gap-[0.25rem] text-[0.75rem] text-secondary-text border border-border rounded px-[0.375rem] py-[0.125rem]">
        <span className="tracking-wider">CTRL</span>
        <span>+</span>
        <span className="tracking-wider">K</span>
      </span>
    </label>
  );
};

export default SearchInput;
