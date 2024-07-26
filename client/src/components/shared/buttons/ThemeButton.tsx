import React, { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";
import { DarkIcon, LightIcon } from "../../../assets/icons";
import { CommonButton } from "./CommonButton";

export const ThemeButton: React.FC = () => {
  const { theme, toggleTheme } = useContext(UIContext);
  const icon = theme === "dark" ? LightIcon : DarkIcon;

  return (
    <CommonButton
      type="button"
      children={icon}
      hasUniqueColor={theme === "dark" ? "text-white-800" : "text-black-400"}
      extraClass={` flex items-center p-1.5 rounded-md gap-x-2  ${
        theme === "dark"
          ? " bg-gray-900 border border-blue-400 hover:text-white-100 "
          : " bg-white-100 border border-gray-800 hover:text-blue-700 "
      }`}
      onClickHandler={toggleTheme}
    />
  );
};
