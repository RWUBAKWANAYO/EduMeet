import React, { useContext } from "react";
import { CommonButtonI } from "./types";
import { UIContext } from "../../../hooks/context/UIContext";

export const CommonButton: React.FC<CommonButtonI> = ({
  type,
  children,
  extraClass,
  hasUniqueColor,
  onClickHandler,
}) => {
  const { theme } = useContext(UIContext);
  return (
    <button
      type={type}
      className={`flex flex-col justify-center items-center border  ${
        extraClass?.includes("rounded") ? "" : "rounded-md"
      }
    ${
      hasUniqueColor
        ? hasUniqueColor
        : theme === "dark"
        ? "border-transparent-100 bg-transparent-400"
        : "border-gray-800 bg-white-700"
    }
     ${extraClass}`}
      onClick={onClickHandler}
    >
      <div
        className={`${
          hasUniqueColor ? "text-inherit" : theme === "dark" ? "text-white-500 " : "text-black-400"
        }`}
      >
        {children}
      </div>
    </button>
  );
};
