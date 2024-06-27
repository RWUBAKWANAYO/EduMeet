import React, { useContext } from "react";
import { CommonButton } from "../buttons";
import { UIContext } from "../../../hooks/context/UIContext";

interface CardI {
  title: string;
  photo?: string;
  icon?: any;
  hasImage: boolean;
  hasUniqueColor?: string;
  onClick?: () => void;
  cursor?: string;
}

export const CommonCard: React.FC<{ card: CardI }> = ({ card }) => {
  const { theme } = useContext(UIContext);
  return (
    <div
      onClick={card.onClick}
      key={card.title}
      className={`h-full flex flex-col items-center p-4 rounded-md  grow cursor-pointer ${
        card.hasUniqueColor
          ? card.hasUniqueColor
          : theme === "dark"
          ? "border bg-blue-800 border-transparent-90 "
          : "border bg-white-100 border-gray-800"
      }
        `}
    >
      {card.hasImage ? (
        <img src={card.photo} alt="icon" className=" w-10 h-10 mb-4 rounded-lg" />
      ) : (
        <CommonButton
          type="button"
          children={card.icon}
          hasUniqueColor={`${
            card.hasUniqueColor
              ? "bg-transparent-200  border-transparent-200"
              : theme === "dark"
              ? "text-white-500 bg-transparent-400  border-transparent-100"
              : "border-gray-800 b text-black-400 bg-white-100 "
          }`}
          extraClass="mb-4 w-fit h-fit p-2"
        />
      )}

      <h4
        className={` text-xs font-semi-bold text-center ${
          card.hasUniqueColor
            ? "text-inherit"
            : theme === "dark"
            ? "text-white-500 "
            : "text-black-400"
        }`}
      >
        {card.title}
      </h4>
    </div>
  );
};
