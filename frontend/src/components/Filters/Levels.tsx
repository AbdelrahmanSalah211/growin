import { ChangeEvent, FC } from "react";
import CheckBox from "../inputs/CheckBox";

export interface LevelsProps {
  values?: { [key: string]: boolean };
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Levels: FC<LevelsProps> = ({ values = {}, onChange = () => {} }) => {
  const levels: {[key:string]:boolean} = {"All levels":false, "Beginner":false, "Intermediate":false, "Expert":false};
  return (
    <>
      <div>
        <h1 className="text-[1.75rem] font-extrabold text-primary-text pb-[1.25rem]">
          Levels
        </h1>
        <div className="gap-[0.625rem] text-primary-text flex flex-col">
          {Object.entries(values).map(([level,isChecked]) => (
            <CheckBox
              name={level}
              value={level}
              id={level}
              title={level}
              checked={isChecked}
              key={level}
              onChange={onChange}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Levels;
