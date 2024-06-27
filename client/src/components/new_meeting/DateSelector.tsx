import moment from "moment";
import React, { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";
import { NayoCalendar } from "../shared/NayoCalendar";

interface IDateSelector {
  selectedDate: Date | null;
  selectDateHandler: (date: Date) => void;
}

export const DateSelector: React.FC<IDateSelector> = ({ selectedDate, selectDateHandler }) => {
  const { theme } = useContext(UIContext);

  return (
    <div
      className={`w-fit flex flex-col pb-4 pr-6 border-r lg:pr-8 ${
        theme === "dark" ? " border-transparent-400" : "border-gray-800 "
      }`}
    >
      <label
        className={`text-xs font-light my-4  ${
          theme === "dark" ? "text-transparent-300" : "text-black-400"
        }`}
      >
        Use calendar to select meeting date
      </label>
      <input
        type="search"
        readOnly
        value={selectedDate ? moment(selectedDate).format("MMMM Do YYYY") : ""}
        placeholder="Select meeting date below"
        className={`w-full h-12 px-4 rounded-md  border outline-none text-xs mb-4  ${
          theme === "dark"
            ? "bg-transparent-400 text-white-800 border-transparent-100"
            : "border-gray-800"
        }`}
      />
      <NayoCalendar selectDateHandler={selectDateHandler} />
    </div>
  );
};
