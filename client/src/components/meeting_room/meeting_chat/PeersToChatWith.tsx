import React, { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";
import { textSlice } from "../../../utils";
import { CommonButton } from "../../shared/buttons";
import { RenderAvatar } from "../../../utils/RenderAvatar";
import { MeetingChatContext } from "../../../hooks/context/meetings/MeetingChatContext";
import { IPeer } from "../../../hooks/context/types";

export const PeersToChatWith: React.FC<{
  peersList: IPeer[];
}> = ({ peersList }) => {
  const { fetchMeetingChat } = useContext(MeetingChatContext);
  const { theme } = useContext(UIContext);
  return (
    <div
      className={`px-2  rounded-md border ${
        theme === "dark" ? " border-transparent-400" : " border-gray-800"
      }`}
    >
      {peersList.map((peer: IPeer, index: number) => (
        <div
          key={peer.user._id}
          className={`py-2 flex items-center space-x-2 ${
            index === 0 ? "border-none" : "border-t"
          } ${theme === "dark" ? " border-transparent-400" : "border-gray-800"}`}
        >
          <RenderAvatar
            photo={peer.user.photo}
            fullName={peer.user.full_name}
            hasExtraClass="w-8 h-8 rounded-md "
          />
          <p
            className={`flex-1  w-full text-xs font-light px-2 ${
              theme === "dark" ? "text-white-800" : " text-black-600"
            }`}
          >
            {textSlice(peer.user.full_name, 10)}
          </p>

          <CommonButton
            children="Chat"
            type="button"
            extraClass={`h-8 px-4 text-xs ${
              theme === "dark"
                ? "border-transparent-400 bg-transparent-400 "
                : "bg-white-100 border-gray-800"
            }`}
            hasUniqueColor={`
                ${theme === "dark" ? " text-white-800" : "text-black-600 "} `}
            onClickHandler={() => fetchMeetingChat({ chatType: "single", memberId: peer.user._id })}
          />
        </div>
      ))}
    </div>
  );
};
