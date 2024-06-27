import React, { ReactNode, useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";
import { CommonButton } from "../buttons";

export const BadgeCard: React.FC<{ icon: ReactNode; title: string }> = ({ icon, title }) => {
  const { theme } = useContext(UIContext);
  return (
    <CommonButton
      type="button"
      children={
        <div className="flex items-center space-x-2">
          <div
            className={`w-5 h-5 flex justify-center items-center border cursor-pointer rounded-full ${
              theme === "dark"
                ? "text-white-800 border-white-800"
                : "text-black-600 border-black-800"
            }`}
          >
            {icon}
          </div>
          <p className="text-xs">{title}</p>
        </div>
      }
      hasUniqueColor={`bg-transparent-0 ${
        theme === "dark" ? "text-transparent-300" : "text-black-400"
      }`}
      extraClass={` py-2 px-4  ${theme === "dark" ? "border-transparent-400" : "border-gray-800"}`}
    />
  );
};
