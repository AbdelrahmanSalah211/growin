import { ChangeEvent, FC, InputHTMLAttributes } from "react";

export interface RadioButtonProps {
  title?: string;
  name: string;
  id?: string;
  value: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "checked" | "name" | "value"
  >;
}

const RadioButton: FC<RadioButtonProps> = ({
  title = "Radio",
  name,
  id,
  value,
  checked,
  onChange = () => {},
  inputProps = {},
}) => {
  return (
    <label
      htmlFor={id}
      className="flex w-fit gap-[0.625rem] items-center "
    >
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        {...inputProps}
        className="radio border-[0.1rem] rounded-full border-primary-text bg-surface text-primary-text checked:border-none checked:bg-primary-text checked:text-surface w-[1.25rem] h-[1.25rem]"
      />
      <p>{title}</p>
    </label>
  );
};

export default RadioButton;
