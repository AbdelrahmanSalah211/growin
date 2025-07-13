import { ChangeEvent, FC, InputHTMLAttributes } from "react";

export interface CheckBoxProps {
  title?: string;
  name?: string;
  id?: string;
  value?: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "checked">;
}

const CheckBox: FC<CheckBoxProps> = ({
  title = "Checkbox",
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
        className="checkbox border-[0.1rem] rounded-[0.125rem] border-primary-text bg-surface text-primary-text checked:border-none checked:bg-primary-text checked:text-surface w-[1.25rem] h-[1.25rem]"
        {...inputProps}
        type="checkbox"
        name={name}
        value={value}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <p>{title}</p>
    </label>
  );
};

export default CheckBox;
