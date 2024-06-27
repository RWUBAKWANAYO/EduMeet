import React, { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";
import { ExclamationTriangle } from "../../../assets/icons";

export interface IMessageCard {
  cancelButtonHandler?: () => void;
  actionButtonHandler?: () => void;
  title: string;
  message: string;
  icon?: React.ReactNode;
  iconColor?: string;
  iconBg?: string;
  cancelButtonName?: string;
  actionButtonName?: string;
  cancelButtonStyle?: string;
  actionButtonStyle?: string;
}

export const MessageCard: React.FC<IMessageCard> = ({
  cancelButtonHandler = () => {},
  actionButtonHandler = () => {},
  title,
  message,
  icon = ExclamationTriangle,
  iconColor,
  iconBg,
  cancelButtonStyle,
  actionButtonStyle,
  cancelButtonName,
  actionButtonName,
}) => {
  const { theme } = useContext(UIContext);
  return (
    <div className={`w-[400px] ${theme === "dark" ? "bg-blue-700" : "bg-white-100"} shadow`}>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div
            className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full  sm:mx-0 sm:h-10 sm:w-10 ${
              iconBg ? iconBg : "bg-red-100"
            }`}
          >
            <div className={`${iconColor ? iconColor : "text-red-600"}`}>{icon}</div>
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3
              className={`text-base font-semibold leading-6 ${
                theme === "dark" ? "text-white-800" : "text-black-600"
              }`}
            >
              {title}
            </h3>
            <div className="mt-2">
              <p
                className={`text-xs leading-5 ${
                  theme === "dark" ? "text-transparent-300" : "text-black-400"
                }`}
              >
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 ${
          theme === "dark" ? "bg-blue-600" : "bg-slate-100"
        }`}
      >
        <button
          type="button"
          className={`inline-flex w-full justify-center rounded-md  px-3 py-2 text-xs font-semibold shadow-sm sm:ml-3 sm:w-auto ${
            actionButtonStyle ? actionButtonStyle : "bg-red-500 text-white-100"
          }`}
          onClick={() => actionButtonHandler()}
        >
          {actionButtonName ? actionButtonName : "Delete"}
        </button>
        <button
          type="button"
          className={`mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-xs border font-semibold shadow-sm sm:mt-0 sm:w-auto ${
            cancelButtonStyle
              ? cancelButtonStyle
              : theme === "dark"
              ? "bg-transparent-400 text-transparent-300 border-transparent-100"
              : "border-gray-800"
          }`}
          onClick={() => cancelButtonHandler()}
          data-autofocus
        >
          {cancelButtonName ? cancelButtonName : "Cancel"}
        </button>
      </div>
    </div>
  );
};
