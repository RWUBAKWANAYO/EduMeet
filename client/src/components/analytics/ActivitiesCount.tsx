import { useContext } from "react";
import { ActivityCard } from "../shared/cards/ActivityCard";
import { UIContext } from "../../hooks/context/UIContext";
import { HostIcon } from "../../assets/icons";

export const ActivitiesCount = () => {
  const { theme } = useContext(UIContext);
  return (
    <div
      className={` w-full rounded-lg p-4 border ${
        theme === "dark" ? " bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
      }`}
    >
      {" "}
      <h3
        className={`mb-4 text-xs font-medium   ${
          theme === "dark" ? "text-white-800" : "text-black-600"
        }`}
      >
        Activitites stats
      </h3>
      <div className="w-full grid grid-cols-3  gap-2">
        <ActivityCard icon={HostIcon("size-6")} title="User Joined meeting" count={"5 min late"} />
        <ActivityCard icon={HostIcon("size-6")} title="User Left meeting" count={"5 min early"} />
        <ActivityCard icon={HostIcon("size-6")} title="User Mute audio" count={"5 times"} />
        <ActivityCard icon={HostIcon("size-6")} title="Average audio mute time" count={"10%"} />
        <ActivityCard icon={HostIcon("size-6")} title="User Mute video" count={"8 times"} />
        <ActivityCard icon={HostIcon("size-6")} title="Average video mute time" count={"26%"} />
        <ActivityCard icon={HostIcon("size-6")} title="Message sent in meeting" count={6} />
      </div>
    </div>
  );
};
