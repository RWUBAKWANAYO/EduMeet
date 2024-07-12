import { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";
import { RenderAvatar } from "../../../utils/RenderAvatar";
import { RoomIcon } from "../../../assets/icons";
import { CommonButton } from "../../shared/buttons";
import { MeetingsContext } from "../../../hooks/context/meetings/MeetingsContext";
import { IMeetingInvite } from "../../../hooks/context/types";
import { textSlice } from "../../../utils";

export const MeetingCallCards = () => {
  const {
    requestToJoinData,
    userAcceptHostInvitation,
    userRejectHostInvitation,
    hostAcceptUserJoinRequest,
    hostRejecttUserJoinRequest,
  } = useContext(MeetingsContext);
  const { theme } = useContext(UIContext);
  return (
    <>
      {requestToJoinData.length > 0 && (
        <div
          className={` absolute top-4 right-4 overflow-auto space-y-6 w-[350px] p-4 `}
          style={{ maxHeight: "calc(100vh - 70px)", zIndex: 70 }}
        >
          {requestToJoinData.map((item: IMeetingInvite) => (
            <div
              className={`rounded-lg overflow-hidden pb-8 shadow border ${
                theme === "dark"
                  ? "bg-blue-700 text-transparent-300 border-transparent-400"
                  : "bg-white-100  text-black-400  border-gray-800"
              }`}
            >
              <div
                className={`flex justify-between px-6 pt-6 pb-4 text-sm border-b-[1.5px] ${
                  theme === "dark" ? "border-transparent-400" : "border-gray-800"
                }`}
              >
                <h3
                  className={`flex items-center font-medium ${
                    theme === "dark" ? "text-white-800" : "text-black-600"
                  }`}
                >
                  {RoomIcon} &nbsp; Meeting: {textSlice(item.meetingRoomId, 5)}
                </h3>
                <p className="font-medium">{item.title}</p>
              </div>
              <div className="p-6 flex  space-x-3">
                <RenderAvatar
                  photo={item?.user?.photo || ""}
                  fullName={item?.user?.full_name}
                  hasExtraClass="w-12 h-12 rounded-full"
                />
                <div className="flex-1 items-center space-y-1">
                  <h3
                    className={` text-sm  font-semibold ${
                      theme === "dark" ? "text-white-800" : "text-black-600"
                    }`}
                  >
                    {item?.user?.full_name}
                  </h3>
                  <p className="font-light text-xs ">{item.message}</p>
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-x-4 px-6">
                <>{console.log(item.meetingRoomId, "item---")}</>
                <CommonButton
                  type="button"
                  children="Accept"
                  hasUniqueColor="text-white-100"
                  extraClass="text-xs font-medium bg-green-600 px-4 py-2 border-transparent-0 rounded-md shadow:sm"
                  onClickHandler={() =>
                    item.sender === "host"
                      ? userAcceptHostInvitation(item)
                      : hostAcceptUserJoinRequest(item.user, item.meetingRoomId)
                  }
                />
                <CommonButton
                  type="button"
                  children="Reject"
                  hasUniqueColor="text-white-100"
                  extraClass="text-xs font-medium bg-red-500 px-4 py-2 border-transparent-0 rounded-md shadow:sm"
                  onClickHandler={() =>
                    item.sender === "host"
                      ? userRejectHostInvitation(item)
                      : hostRejecttUserJoinRequest(item.user)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
