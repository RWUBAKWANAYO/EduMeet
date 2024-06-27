import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ClockIcon,
  DarkIcon,
  DateIcon,
  HomeIcon,
  LightIcon,
  SettingIcon,
} from "../../assets/icons";
import logo from "../../assets/images/logo.png";
import { UIContext } from "../../hooks/context/UIContext";

export const Sidebar = () => {
  const { theme, toggleTheme } = useContext(UIContext);
  const links = [
    {
      title: "Home",
      path: "/",
      icon: HomeIcon,
    },
    {
      title: "Meetings",
      path: "/meetings",
      icon: ClockIcon,
    },
    {
      title: "Schedules",
      path: "/meetings/new",
      icon: DateIcon,
    },
  ];

  const otherLinks = [
    {
      title: theme === "dark" ? "Light" : "Dark",
      path: "#",
      icon: theme === "dark" ? LightIcon : DarkIcon,
      onclick: () => toggleTheme(),
    },
    {
      title: "Settings",
      path: "/settings",
      icon: SettingIcon,
    },
  ];

  return (
    <div className="h-full flex flex-col items-center w-full">
      <div className="mb-10 w-full h-[60px] flex justify-center items-center   ">
        <Link to="/">
          <img src={logo} alt="logo" className="w-8" />
        </Link>
      </div>
      <ul className="w-full px-4">
        {links.map((link) => (
          <li key={link.title} className="mb-4">
            <NavLink
              to={link.path}
              title={link.title}
              className={({ isActive }) =>
                `flex items-center p-1.5 rounded-md gap-x-2 ${
                  theme === "dark"
                    ? `${
                        isActive
                          ? "bg-blue-100 text-white-100"
                          : "text-white-500 border border-transparent-0 hover:bg-gray-900  hover:border-blue-400 hover:text-white-300 "
                      }`
                    : `${
                        isActive
                          ? "bg-blue-100 text-white-100"
                          : "text-black-400 border border-transparent-0 hover:bg-white-700 hover:border-gray-800 hover:text-blue-700"
                      }`
                }`
              }
            >
              {link.icon}
              <p className="text-xs hidden lg:flex font-semibold">{link.title}</p>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-auto mb-4  w-full px-4 flex flex-col justify-center space-y-4">
        {otherLinks.map((link) => (
          <NavLink
            key={link.title}
            to={link.path}
            title={link.title}
            className={` flex items-center p-1.5 rounded-md gap-x-2  ${
              theme === "dark"
                ? "text-white-800 bg-gray-900 border border-blue-400 hover:text-white-100 "
                : "text-black-400 bg-white-700 border border-gray-800 hover:text-blue-700 "
            }`}
            onClick={link.onclick && link.onclick}
          >
            {link.icon}
            <p className="text-xs hidden lg:flex font-semibold">{link.title}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
