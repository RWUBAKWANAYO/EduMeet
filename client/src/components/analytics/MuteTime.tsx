import { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";

export const MuteTime = () => {
  const { theme } = useContext(UIContext);
  const MuteTimeCard = ({ title }: { title: string }) => (
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
        <h3
          className={`text-xs font-medium  ${
            theme === "dark" ? "text-white-800" : "text-black-600"
          }`}
        >
          {title}
        </h3>
        <h3
          className={`text-xs font-medium  ${
            theme === "dark" ? "text-white-800" : "text-black-600"
          }`}
        >
          Action
        </h3>
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          className={`mx-4  flex justify-between items-center py-2 border-b ${
            theme === "dark" ? " border-transparent-90" : " border-gray-800"
          } `}
        >
          <h3 className={`text-xs ${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}>
            {"09:46AM"}
          </h3>
          <div>
            <h4 className={`text-xs ${i % 2 === 0 ? "text-green-500" : "text-red-500"}`}>Muted</h4>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <div className="w-full overflow-auto h-[300px]">
        <MuteTimeCard title="Audio timestamp" />
      </div>
      <div className="w-full overflow-auto h-[300px]">
        <MuteTimeCard title="Video timestamp" />
      </div>
    </div>
  );
};
