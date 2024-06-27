import React from "react";
import background from "../../assets/images/background.png";
import { useCurrentTime } from "../../hooks/custom/useCurrentTime";

export const TimeDisplay: React.FC = () => {
  return (
    <div className="relative w-full ">
      <img src={background} alt="background" className="w-full h-36 relative" />
      <div
        className="w-full h-full absolute top-0 left-0 flex flex-col justify-center pl-10"
        style={{ background: "rgba(26, 113, 255, 0)" }}
      >
        <h1 className="text-2xl text-white-100 font-normal text-5xl">
          {useCurrentTime().format(" h:mm A")}
        </h1>
        <p className="text-sm font-semi-bold pl-2 pt-2 text-white-100 ">
          {useCurrentTime().format("dddd, Do MMMM YYYY")}
        </p>
      </div>
    </div>
  );
};
