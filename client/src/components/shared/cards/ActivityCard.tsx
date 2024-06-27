import { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";

export const ActivityCard = ({
  title,
  count,
  icon,
}: {
  icon: React.ReactNode;
  title: string;
  count: number | string;
}) => {
  const { theme } = useContext(UIContext);
  return (
    <div
      className={` flex space-x-3 items-center p-3 border rounded-md ${
        theme === "dark"
          ? "bg-transparent-400 border-transparent-90"
          : "bg-white-100 border-gray-800"
      }`}
    >
      <div className={`${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}>
        {icon}
      </div>

      <div>
        <h3 className={`text-xs ${theme === "dark" ? "text-transparent-300" : "text-black-400"}`}>
          {title}
        </h3>
        <h4
          className={`text-md font-semibold ${
            theme === "dark" ? "text-white-800" : "text-black-600"
          }`}
        >
          {count}
        </h4>
      </div>
    </div>
  );
};
