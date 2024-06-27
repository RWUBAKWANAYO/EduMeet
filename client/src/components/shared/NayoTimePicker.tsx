import { TimePicker } from "@nayojs/react-datetime-picker";
import React, { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";

export const NayoTimePicker: React.FC<{ selectTimeHandler: (time: Date) => void }> = ({
  selectTimeHandler,
}) => {
  const { theme } = useContext(UIContext);
  return (
    <TimePicker
      theme={theme}
      selectTimeHandler={selectTimeHandler}
      timePickerStyles={{
        containerStyles: {
          width: "100%",
          height: "100%",
          padding: "0",
          border: "none",
        },
        triggerStyles: {
          padding: "9px ",
          border: `1px solid ${theme === "dark" ? "#ffffff1a" : "#EAECED"}`,
          backgroundColor: theme === "dark" ? "#ffffff08" : "#ffffff",
          color: theme === "dark" ? "#E2E2E2" : "#646577",
        },
        triggerInputStyles: { color: theme === "dark" ? "#E2E2E2" : "#646577" },
        triggerIconStyles: { width: "17px", height: "17px" },
        timeStyles: {
          height: "260px",
          backgroundColor: theme === "dark" ? "#222534" : "#ffffff",
          border: `1px solid ${theme === "dark" ? "#ffffff1a" : "#EAECED"}`,
        },
        timeHeaderStyles: {
          backgroundColor: theme === "dark" ? "#222534" : "#ffffff",
          borderBottom: `1px solid ${theme === "dark" ? "#ffffff1a" : "#EAECED"}`,
        },
        timeTitleStyles: { color: theme === "dark" ? "#E2E2E2" : "#646577" },
        timeDigitsStyles: {
          columnGap: "5px",
        },
        timeLineStyles: {
          backgroundColor: theme === "dark" ? "#ffffff1a" : "#EAECED",
        },
        timeHoursStyles: { padding: "0 5px 5px 5px", margin: "5px 0 0 5px" },
        timeMinutesStyles: { padding: "0 5px 5px 5px", margin: "5px 5px 0 0" },
        timeListItemsStyles: {
          width: "40px",
          padding: "6px 0",
          margin: "5px auto",
          color: theme === "dark" ? "#E2E2E2" : "#646577",
          backgroundColor: "transparent",
        },
        timeListItemActiveStyles: { backgroundColor: "#1A71FF", color: "white" },
      }}
    />
  );
};
