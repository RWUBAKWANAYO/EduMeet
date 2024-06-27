import { useContext } from "react";
import { RenderAvatar } from "../../utils/RenderAvatar";
import { TrophyIcon } from "../../assets/icons";
import { UIContext } from "../../hooks/context/UIContext";
import { textSlice } from "../../utils";

export const Ranking = () => {
  const { theme } = useContext(UIContext);
  return (
    <div
      className={`py-4 w-full rounded-lg border ${
        theme === "dark" ? "bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
      }`}
    >
      <div
        className={`px-4 mb-4 flex justify-between items-end pb-4  border-b ${
          theme === "dark" ? " border-transparent-90" : " border-gray-800"
        }`}
      >
        <div className={` flex space-x-3 items-center`}>
          <div className={`${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}>
            {TrophyIcon("size-7")}
          </div>
          <div>
            <h3
              className={`text-xs ${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}
            >
              Total 5 Attendees
            </h3>
            <h4
              className={`text-xs font-medium  ${
                theme === "dark" ? "text-white-800" : "text-black-600"
              }`}
            >
              Most proactive
            </h4>
          </div>
        </div>
        <h3
          className={`text-xs font-medium  ${
            theme === "dark" ? "text-white-800" : "text-black-600"
          }`}
        >
          Score
        </h3>
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          className={`mx-4  flex justify-between items-center py-2 border-b ${
            theme === "dark" ? " border-transparent-90" : " border-gray-800"
          } `}
        >
          <div
            className={` flex space-x-2 items-center ${
              theme === "dark" ? "text-transparent-300" : "text-black-400"
            }`}
          >
            <RenderAvatar
              photo={null}
              fullName="Rwubakwanayo"
              hasExtraClass={`w-9 h-9  rounded-full`}
            />
            <h3
              className={`text-xs ${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}
            >
              {textSlice("Rwubakwanayo Olivier", 20)}
            </h3>
          </div>
          <div>
            <h4
              className={`text-sm font-semibold ${
                theme === "dark" ? "text-white-800" : "text-black-600"
              }`}
            >
              93%
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};
