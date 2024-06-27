import React, { useContext } from "react";
import { UIContext } from "../../../../hooks/context/UIContext";
import { CommonButton } from "../../../shared/buttons";
import { MicOffIcon } from "../../../../assets/icons";
import { VideoPlayer } from "../video_player/VideoPlayer";
import { textSlice } from "../../../../utils";
import { users } from "../../../../mock_data/users";

export const PeersStream = React.memo(() => {
  const { theme } = useContext(UIContext);

  return (
    <div
      className=" w-full h-1/4 flex space-x-4 overflow-scroll [&>div]:flex-shrink-0"
      style={{ width: "calc(100vw - 320px)" }}
    >
      {users.map((user) => {
        return (
          <div key={user._id} className={`h-full  w-1/4 pb-3 `}>
            <div
              className={`border h-full w-full rounded-lg overflow-hidden relative ${
                theme === "dark"
                  ? "bg-blue-800 border-transparent-400"
                  : "bg-white-100 border-gray-800"
              }`}
            >
              <VideoPlayer user={user} avatarSize="w-12 h-12" />
              <CommonButton
                type="button"
                children={<h4 className="text-xs">{textSlice(user.full_name, 4)}</h4>}
                hasUniqueColor={` text-white-100 `}
                extraClass="font-semi-bold px-4 py-1.5 text-xs rounded-3xl absolute bottom-2 left-2 z-10 border-none bg-gray-500 "
              />

              <CommonButton
                type="button"
                children={MicOffIcon}
                hasUniqueColor={` text-white-100 `}
                extraClass={`font-semi-bold w-7 h-7 text-xs rounded-full absolute bottom-4 right-4 z-10 border-none  "bg-blue-100"
                `}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
});
