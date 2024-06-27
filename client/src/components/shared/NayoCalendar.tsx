import React, { useContext } from "react";
import { UIContext } from "../../hooks/context/UIContext";
import { Calendar } from "@nayojs/react-datetime-picker";

export const NayoCalendar: React.FC<{ selectDateHandler: (date: Date) => void }> = ({
  selectDateHandler,
}) => {
  const { theme } = useContext(UIContext);

  return (
    <Calendar
      theme={theme}
      selectDateHandler={selectDateHandler}
      calendarStyles={{
        containerStyles: {
          width: "fit-content",
          height: "100%",
          padding: "0",
          border: "none",
        },
        headerTitleTextStyles: {
          color: theme === "dark" ? "#E2E2E2" : "#646577",
          fontSize: "14px",
          fontWeight: "400",
        },
        selectButtonStyles: { color: theme === "dark" ? "#E2E2E2" : "#646577" },
        datesContainerStyles: { gap: "7px" },
        dateStyles: {
          fontSize: "0.8rem",
          borderRadius: "5px",
          border: `1px solid ${theme === "dark" ? "#ffffff1a" : "#EAECED"}`,
          backgroundColor: theme === "dark" ? "#ffffff08" : "#ffffff",
          color: theme === "dark" ? "#E2E2E2" : "#646577",
        },
        optionPickerStyles: {
          height: "100%",
          backgroundColor: theme === "dark" ? "#222534" : "#ffffff",
          border: `1px solid ${theme === "dark" ? "#ffffff1a" : "#EAECED"}`,
        },
        optionPickerItemStyles: {
          color: theme === "dark" ? "#E2E2E2" : "#646577",
        },
        optionPickerItemActiveStyles: {
          backgroundColor: "#1A71FF",
          color: "white",
        },
        selectedDateStyles: {
          backgroundColor: "#1A71FF",
          color: "white",
        },
        activeDateStyles: {
          backgroundColor: theme === "dark" ? "#1E2757" : "#DFEBFF",
        },
        navigatorsButtonStyles: {
          borderRadius: "5px",
          color: theme === "dark" ? "#E2E2E2" : "#646577",
        },
        activeNavigatorStyles: {
          backgroundColor: "#1A71FF",
          color: "white",
        },
        navigatorsButtonPrevIconStyles: {},
        navigatorsButtonNextIconStyles: {},
      }}
    />
  );
};
