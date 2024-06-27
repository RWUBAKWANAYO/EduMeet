import React, { useContext } from "react";
import { CheckIcon } from "../../../assets/icons";
import { UIContext } from "../../../hooks/context/UIContext";

interface CheckboxButtonPropsI {
  isChecked: boolean;
  children: string;
  onClickHandler: () => void;
}
export const CheckboxButton: React.FC<CheckboxButtonPropsI> = ({
  isChecked,
  children,
  onClickHandler,
}) => {
  const { theme } = useContext(UIContext);
  return (
    <div className="flex items-center space-x-2 pt-4">
      <div
        className={`w-5 h-5 flex justify-center items-center border cursor-pointer rounded-sm ${
          isChecked
            ? " border-blue-100 bg-blue-100 text-white-100"
            : theme === "dark"
            ? "bg-transparent-400 border-transparent-100 text-transparent-0"
            : "bg-white-100 border-gray-800 text-transparent-0"
        }`}
        onClick={onClickHandler}
      >
        {CheckIcon()}
      </div>
      <span className={`text-xs ${theme === "dark" ? "text-white-800" : "text-black-600"}`}>
        {children}
      </span>
    </div>
  );
};
