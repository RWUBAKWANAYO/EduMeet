import React, { useContext } from "react";
import { RenderAvatar } from "../../../utils";
import { UIContext } from "../../../hooks/context/UIContext";
import { CommonButton } from "../../shared/buttons";
import { users } from "../../../mock_data/users";
import { IUser } from "../../../types/users.interface";
import { CheckBox } from "./CheckBox";

export const AddParticipants: React.FC = () => {
  const { theme } = useContext(UIContext);
  return (
    <>
      <div className={`px-6 w-full flex items-center space-x-6 my-6`}>
        <input
          type="search"
          placeholder="Search"
          className={`flex-1 h-8 px-4 rounded-md  border outline-none text-xs  ${
            theme === "dark"
              ? "bg-blue-600 text-white-800 border-transparent-100"
              : "border-gray-800"
          }`}
        />
        <CommonButton
          hasUniqueColor="bg-blue-100 border-transparent-0 text-white-100"
          children="Invite"
          type="submit"
          extraClass=" shadow-sm py-2 px-4 text-xs font-semibold "
        />
      </div>
      <div className="w-[450px] h-[400px] overflow-auto px-6">
        {users.map((user: IUser) => (
          <div
            key={user._id}
            className={`mb-2 p-4 flex items-center space-x-2 shadow   ${
              theme === "dark" ? "bg-blue-600" : "bg-white-100 border-gray-800 "
            }`}
          >
            <RenderAvatar
              photo={user.photo}
              fullName={user.full_name}
              hasExtraClass="w-8 h-8 rounded-md "
            />
            <div className="flex-1">
              <h4 className={`text-xs ${theme === "dark" ? "text-white-800" : "text-black-600"}`}>
                {user.full_name}
              </h4>
              <p
                className={`text-xs font-light ${
                  theme === "dark" ? "text-transparent-300" : "text-black-400"
                }`}
              >
                {user.email}
              </p>
            </div>

            <CheckBox user={user} onClickHandler={() => {}} />
          </div>
        ))}
      </div>
    </>
  );
};
