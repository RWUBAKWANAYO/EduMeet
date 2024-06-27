import { ReactNode, createContext, useEffect, useState } from "react";
import { ITheme } from "./types";
import { useLocation } from "react-router-dom";
import { capitalizeText } from "../../utils";

export const UIContext = createContext<ITheme>({} as ITheme);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme related logic
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  // Active page related logic
  const [activePage, setActivePage] = useState("Home");
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    console.log(path.includes("meetings/new"));
    if (path.includes("meetings/new")) return setActivePage("Schedule");
    let title = path.split("/")[1];
    title = title ? capitalizeText(title) : capitalizeText("Home");
    setActivePage(title);
  }, [location.pathname]);

  return (
    <UIContext.Provider
      value={{
        theme,
        toggleTheme,
        activePage,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
