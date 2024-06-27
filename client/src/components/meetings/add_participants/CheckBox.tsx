import React, { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";
import { CheckIcon } from "../../../assets/icons";
import { IUser } from "../../../types/users.interface";

interface ICheckBox {
  user: IUser;
  onClickHandler: (user: IUser, isChecked: boolean) => void;
}
export const CheckBox: React.FC<ICheckBox> = ({ user, onClickHandler }) => {
  const { theme } = useContext(UIContext);
  const [isChecked, setIsChecked] = React.useState(false);
  const onCheckHandler = () => {
    onClickHandler(user, !isChecked);
    setIsChecked(!isChecked);
  };
  return (
    <div
      className={`w-5 h-5 flex justify-center items-center border cursor-pointer rounded-sm ${
        isChecked
          ? " border-blue-100 bg-blue-100 text-white-100"
          : theme === "dark"
          ? "bg-transparent-400 border-transparent-100 text-transparent-0"
          : "bg-white-100 border-gray-800 text-transparent-0"
      }`}
      onClick={onCheckHandler}
    >
      {CheckIcon()}
    </div>
  );
};
