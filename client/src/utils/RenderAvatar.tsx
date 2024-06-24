import React, { useContext } from "react";
import { UIContext } from "../hooks/context/UIContext";

export interface IRenderAvatar {
  photo: string | null | undefined;
  fullName: string;
  hasExtraClass?: string;
  hasExtraStyle?: React.CSSProperties;
}

export const RenderAvatar: React.FC<IRenderAvatar> = ({
  photo,
  fullName,
  hasExtraClass,
  hasExtraStyle = {},
}) => {
  const { theme } = useContext(UIContext);
  return (
    <div
      className={`overflow-hidden flex items-center justify-center ${
        photo
          ? ""
          : theme === "dark"
          ? "border bg-blue-600 text-white-600 border-transparent-100"
          : "border bg-white-700 border-gray-800 text-black-600"
      } ${hasExtraClass ? hasExtraClass : "w-8 h-8 rounded-full"}
    }`}
      style={hasExtraStyle}
    >
      {photo ? (
        <img className={`w-full h-full`} src={photo} alt="avatar" />
      ) : (
        <h3 className="text-sm font-bold">{fullName[0]}</h3>
      )}
    </div>
  );
};
