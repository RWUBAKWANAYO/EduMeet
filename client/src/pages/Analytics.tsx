import { useContext } from "react";
import { ActivitiesCount, MuteTime, Participants } from "../components/analytics";
import { UIContext } from "../hooks/context/UIContext";

export const Analytics = () => {
  const { theme } = useContext(UIContext);
  return (
    <div className="w-full flex">
      <div className={` w-[320px] h-full  py-8 pl-8 pr-0 `}>
        <div className={`w-full `} style={{ height: "calc(100vh - 60px)" }}>
          <h3 className={`pb-4 text-sm ${theme === "dark" ? "text-white-800" : "tetx-black-600"}`}>
            Participants
          </h3>
          <Participants />;
        </div>
      </div>
      <div
        className={`flex-1 h-full  pt-8 pl-4 pr-8 border-l  ${
          theme === "dark" ? "border-transparent-400" : "border-gray-800"
        }`}
      >
        <h3
          className={`pb-2 text-lg font-medium ${
            theme === "dark" ? "text-white-800" : "tetx-black-600"
          }`}
        >
          Oliver Rwubakwanayo stats
        </h3>
        <div className={`w-full h-full space-y-3 overflow-auto`}>
          <ActivitiesCount />
          <MuteTime />
        </div>
      </div>
    </div>
  );
};
