"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";

interface DropdownProps<T> {
    options: T[];
    selectedOption: string;
    onSelect: (option: string) => void;
    className?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    showIcon?: boolean;
    title?: string;
    getLabel: (option: T) => string;
    getValue: (option: T) => string;
}

const Dropdown = <T,>({
    options,
    selectedOption,
    onSelect,
    className = "",
    placeholder = "Select an option",
    icon,
    showIcon = true,
    title,
    getLabel,
    getValue,
}: DropdownProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: T) => {
        const value = getValue(option);
        onSelect(value);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const defaultIcon = <Globe className="w-5 h-5 text-gray-500" />;
    const displayIcon = icon || defaultIcon;

    // Find the selected option to display its label
    const getDisplayText = () => {
        if (!selectedOption) return placeholder;
        console.log("selectedCategoryOPtion", selectedOption);
        const foundOption = options.find(
            (option) => getValue(option) === selectedOption
        );
        return foundOption ? getLabel(foundOption) : placeholder;
    };

    return (
        <div className={`${className}`} ref={dropdownRef}>
            {title && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {title}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    className={`w-[33.75rem] px-4 py-2 flex items-center justify-between bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                        isOpen ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={toggleDropdown}
                >
                    <div className="flex items-center">
                        {showIcon && (
                            <span className="mr-3">{displayIcon}</span>
                        )}
                        <span>{getDisplayText()}</span>
                    </div>
                    <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                            isOpen ? "transform rotate-180" : ""
                        }`}
                    />
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-background border border-gray-300 rounded-md shadow-lg">
                        <ul className="py-1 overflow-auto text-base max-h-60 focus:outline-none">
                            {options.map((option) => {
                                const optionValue = getValue(option);
                                const optionDisplay = getLabel(option);

                                return (
                                    <li
                                        key={optionValue}
                                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                            optionValue === selectedOption
                                                ? "bg-blue-50 text-primary"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleOptionClick(option)
                                        }
                                    >
                                        {optionDisplay}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
