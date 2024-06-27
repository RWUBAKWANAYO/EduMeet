import React, { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";

interface RadioButtonPropsI {
  isActive: boolean;
  children: string;
  onClickHandler: () => void;
}

export const RadioButton: React.FC<RadioButtonPropsI> = ({
  isActive,
  children,
  onClickHandler,
}) => {
  const { theme } = useContext(UIContext);
  return (
    <div className="flex space-x-2 items-center">
      <div
        className={`w-5 h-5 flex justify-center items-center border cursor-pointer rounded-full ${
          isActive
            ? " border-blue-100 bg-blue-100 text-white-100"
            : theme === "dark"
            ? "bg-transparent-400 border-transparent-100 text-transparent-0"
            : "bg-white-100 border-gray-800 text-transparent-0"
        }`}
        onClick={onClickHandler}
      >
        <button
          type="button"
          className={`w-1/2 h-1/2 rounded-full ${isActive ? "bg-white-100" : "bg-transparent-0"}`}
        ></button>
      </div>
      <span className={`text-xs ${theme === "dark" ? "text-white-800" : "text-black-600"}`}>
        {children}
      </span>
    </div>
  );
};
