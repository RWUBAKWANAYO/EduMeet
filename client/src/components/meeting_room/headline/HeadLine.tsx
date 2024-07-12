import React, { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";
import { textSlice } from "../../../utils";
import { CommonButton } from "../../shared/buttons";
import { LinkIcon } from "../../../assets/icons";
import { useCustomClipboard } from "../../../hooks/custom/useCustomClipboard";
import { useHeadLine } from "./useHeadLine";
import moment from "moment";
import { RenderAvatar } from "../../../utils/RenderAvatar";

export const HeadLine: React.FC = () => {
  const { theme } = useContext(UIContext);
  const { clipboard, copyToast, onHoverHandler, onCopyHandler } = useCustomClipboard();
  const { meetingLink, meetingData } = useHeadLine();

  return (
    <div className="flex grow items-center justify-between">
      {meetingData && (
        <>
          <div>
            <p
              className={` w-fit text-base pb-0.5 font-bold  ${
                theme === "dark" ? "text-white-800" : "text-black-600 "
              }`}
            >
              {textSlice(meetingData.title || "", 40)}
            </p>
            <p
              className={` w-fit text-xs   ${
                theme === "dark" ? "text-transparent-300" : " text-black-400"
              }`}
            >
              {meetingData.start_time &&
                moment(meetingData.start_time).format("MMM Do, YYYY | hh:mm A")}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-36 relative h-10 flex">
              {meetingData.participants.list.map((participant, index: number) => (
                <RenderAvatar
                  photo={participant.photo || ""}
                  fullName={participant.full_name}
                  hasExtraClass={`w-10 h-10 rounded-full absolute top-0`}
                  hasExtraStyle={{ left: `${index * 30}px` }}
                />
              ))}
              {meetingData.participants.other > 0 && (
                <button
                  className={`w-10 h-10 text-xs font-bold  rounded-full absolute top-0 left-[90px] shadow ${
                    theme === "dark"
                      ? "border-transparent-200 bg-blue-300 text-transparent-300"
                      : `bg-white-600 text-blue-200 `
                  }`}
                >
                  {meetingData.participants.other}
                </button>
              )}
            </div>
            <CommonButton
              type="button"
              children={
                <div>
                  <div className={` w-full flex items-center space-x-2`}>
                    {LinkIcon}
                    <input
                      ref={clipboard.target}
                      className="text-xs text bg-transparent-0 pl-2 border-l border-blue-100"
                      type="text"
                      readOnly
                      value={meetingLink}
                    />
                  </div>
                  <div
                    className="w-full h-full absolute top-0 left-0 z-10"
                    onMouseOver={() => onHoverHandler(true)}
                    onMouseLeave={() => onHoverHandler(false)}
                    onClick={onCopyHandler}
                  >
                    {copyToast.visible && (
                      <label
                        className={`absolute top-10 p-2 right-0 rounded shadow ${
                          theme === "dark"
                            ? "bg-blue-800 text-white-800 shadow-transparent-50"
                            : "bg-white-100 text-black-600 "
                        }`}
                      >
                        {copyToast.copied ? "Link Copied" : "Copy the link"}
                      </label>
                    )}
                  </div>
                </div>
              }
              hasUniqueColor={`font-semi-bold text-blue-100 ${
                theme === "dark"
                  ? " bg-blue-300  border-transparent-400"
                  : " bg-white-600 border-blue-50"
              }`}
              extraClass="relative h-9 px-4 text-xs rounded-3xl "
            />
          </div>
        </>
      )}
    </div>
  );
};
