import { FC } from "react";
import { FilterIcon } from "@/components/icons/FilterIcon"; // or your inline SVG

interface Props {
  onClick: () => void;
}

const FiltersToggler: FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-surface px-8 py-5 rounded-full shadow-md cursor-pointer"
    >
      <FilterIcon size={24} color="#2C3E50" />
      <span className="text-base text-primary-text font-bold">All Filters</span>
    </button>
  );
};

export default FiltersToggler;
