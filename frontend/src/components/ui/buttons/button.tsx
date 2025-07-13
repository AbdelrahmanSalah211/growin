import { FC, ButtonHTMLAttributes, MouseEvent } from "react";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  buttonProps?: Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "className"
  >;
  children?: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({
  type = "button",
  onClick,
  className = "",
  buttonProps,
  children = "Button",
}) => {
  const defaultStyle =
    "cursor-pointer w-[23.125rem] py-[0.9375rem] rounded-[0.625rem] text-[1.125rem] font-bold text-primary-text bg-background hover:text-background hover:bg-primary-text transition-colors disabled:text-secondary-text disabled:bg-background disabled:cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${defaultStyle} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
