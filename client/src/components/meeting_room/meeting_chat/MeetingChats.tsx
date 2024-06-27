import { useContext } from "react";
import { CommonButton } from "../../shared/buttons";
import { UIContext } from "../../../hooks/context/UIContext";
import { ChevronRightIcon } from "../../../assets/icons";
import { useMeetingChats } from "./useMeetingChats";
import { ChatBubble } from "./ChatBubble";
import { chats } from "../../../mock_data/chats";

export const MeetingChats: React.FC<{
  enlargeChatSize: boolean;
  participantsSizeHandler: () => void;
}> = ({ enlargeChatSize, participantsSizeHandler }) => {
  const { theme } = useContext(UIContext);
  const { expanded, expandHandler } = useMeetingChats(participantsSizeHandler);

  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center justify-between h-[60px] px-4 border-b ${
          theme === "dark" ? "border-transparent-400" : "border-gray-800"
        }`}
      >
        <h3
          className={`text-sm font-semi-bold  ${theme === "dark" ? "text-white-800" : "black-600"}`}
        >
          Chats
        </h3>
        <div
          className={`flex  p-1 rounded-2xl border  ${
            theme === "dark" ? "bg-blue-300 border-transparent-400" : "bg-white-600 border-blue-50"
          }`}
        >
          <CommonButton
            children="Group"
            type="button"
            hasUniqueColor={` text-white-100`}
            extraClass={`border-none h-6 px-4 text-xs rounded-2xl bg-blue-100`}
          />
          <CommonButton
            children="Personal"
            type="button"
            hasUniqueColor={`text-blue-100`}
            extraClass={`border-none h-6 px-4 text-xs`}
          />
        </div>
        <button
          type="button"
          className={`text-blue-100`}
          style={{ transform: expanded ? "rotate(90deg)" : "" }}
          onClick={expandHandler}
        >
          {ChevronRightIcon}
        </button>
      </div>

      {expanded && (
        <div
          className={`w-full  py-4 ${theme === "dark" ? "bg-blue-600" : "bg-white-700"}`}
          style={{ height: enlargeChatSize ? "calc(100vh - 250px)" : "calc(50vh - 125px)" }}
        >
          <div className={`w-full h-full px-4 space-y-2  overflow-auto  `}>
            <ChatBubble chats={chats} />
          </div>
        </div>
      )}
    </div>
  );
};
