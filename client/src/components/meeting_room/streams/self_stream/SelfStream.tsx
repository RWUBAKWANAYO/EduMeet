import React, { useContext } from "react";
import { CommonButton } from "../../../shared/buttons";
import { ExpandScreenIcon, RecordIcon, SoundWaveIcon } from "../../../../assets/icons";
import { UIContext } from "../../../../hooks/context/UIContext";
import { VideoPlayer } from "../video_player/VideoPlayer";
import { users } from "../../../../mock_data/users";

export const SelfStream: React.FC = () => {
  const { theme } = useContext(UIContext);

  return (
    <div
      className={`border w-full h-3/4 grow rounded-lg overflow-hidden relative ${
        theme === "dark" ? "bg-blue-800 border-transparent-400" : "bg-white-100 border-gray-800"
      }`}
    >
      <VideoPlayer user={users[0]} avatarSize="w-20 h-20" />
      <div className={`h-full absolute top-0 left-2 py-2 z-10 flex flex-col ${"justify-between"}`}>
        <CommonButton
          type="button"
          children={
            <div className={`flex items-center space-x-2`}>
              {RecordIcon}
              <h4 className="text-xs">20:45</h4>
            </div>
          }
          hasUniqueColor={` text-white-100 `}
          extraClass="w-fit font-semi-bold px-3 py-1.5 text-xs rounded-3xl border-none bg-gray-500 "
        />

        <CommonButton
          type="button"
          children={<h4 className="text-xs">Bob Marley</h4>}
          hasUniqueColor={` text-white-100 `}
          extraClass="w-fit font-semi-bold px-4 py-1.5 text-xs rounded-3xl border-none bg-gray-500 "
        />
      </div>
      <div className={`h-full absolute top-0 right-2 py-2 z-10 flex flex-col ${"justify-between"}`}>
        <CommonButton
          type="button"
          children={ExpandScreenIcon}
          hasUniqueColor={` text-white-100 `}
          extraClass="font-semi-bold w-9 h-9 text-xs rounded-full border-none bg-gray-500 "
        />

        <CommonButton
          type="button"
          children={SoundWaveIcon}
          hasUniqueColor={` text-white-100 `}
          extraClass="font-semi-bold w-9 h-9 text-xs rounded-full border-none bg-gray-500 "
        />
      </div>
    </div>
  );
};
