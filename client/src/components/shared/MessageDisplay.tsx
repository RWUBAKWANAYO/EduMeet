import { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";

export const MessageDisplay = ({ message }: { message: any }) => {
  const { theme } = useContext(UIContext);
  return (
    <div className={`w-full h-full flex items-center justify-center `}>
      <span
        className={`text-xs w-fit text-center ${
          theme === "dark" ? "text-white-800" : "text-black-600"
        }`}
      >
        {message}
      </span>
    </div>
  );
};
