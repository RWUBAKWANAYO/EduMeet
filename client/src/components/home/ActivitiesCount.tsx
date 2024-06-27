import React, { useContext } from "react";
import { BiChatBubble, HostIcon, InviteClose, InviteIcon } from "../../assets/icons";
import { UIContext } from "../../hooks/context/UIContext";
import { ActivityCard } from "../shared/cards/ActivityCard";

export const ActivitiesCount: React.FC = () => {
  const { theme } = useContext(UIContext);

  return (
    <div
      className={`p-4 w-full rounded-lg border ${
        theme === "dark" ? "bg-blue-800 border-transparent-90" : "bg-white-100 border-gray-800"
      }`}
    >
      {" "}
      <h3
        className={`mb-4 text-xs font-medium ${
          theme === "dark" ? "text-transparent-300" : "text-black-400"
        }`}
      >
        Activitites stats
      </h3>
      <div className="w-full grid grid-cols-2  gap-2">
        <ActivityCard icon={InviteIcon("size-6")} title="Total invitations Received" count={115} />
        <ActivityCard icon={InviteClose("size-6")} title="Total invitations Sent" count={115} />
        <ActivityCard icon={HostIcon("size-6")} title="Total Hosted Meeting" count={68} />
        <ActivityCard icon={BiChatBubble("size-6")} title="Total Message send" count={223} />
      </div>
    </div>
  );
};
