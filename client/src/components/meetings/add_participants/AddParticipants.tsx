import { useContext } from "react";
import { RenderAvatar } from "../../../utils/RenderAvatar";
import { UIContext } from "../../../hooks/context/UIContext";
import { CommonButton } from "../../shared/buttons";
import { XMark } from "../../../assets/icons";
import { CheckBox } from "./CheckBox";
import { MessageDisplay } from "../../shared/MessageDisplay";
import { UserContext } from "../../../hooks/context/UserContext";
import { useAddParticipants } from "./useAddParticipants";
import { IUser } from "../../../types/users.interface";

interface IParticipantsToInvite extends IUser {
  status?: string;
}
const AddParticipants = ({
  data,
  error,
  isLoading,
  onSubmitHandler,
}: {
  data: any;
  error: Error | null;
  isLoading: boolean;
  onSubmitHandler: (receivers: IUser[]) => void;
}) => {
  const { user: self } = useContext(UserContext);
  const { theme } = useContext(UIContext);
  const { closeModal } = useContext(UIContext);
  const { users, onFilterHandler, onClickHandler, receivers } = useAddParticipants(data);
  return (
    <div className={`relative py-8 ${theme === "dark" ? "bg-blue-700" : "bg-white-100"}`}>
      <CommonButton
        children={XMark()}
        type="button"
        extraClass={`w-8 h-8 text-xs absolute top-0 right-0 rounded-none border-none`}
        onClickHandler={closeModal}
      />
      {isLoading ? (
        <MessageDisplay message="Loading...." />
      ) : error ? (
        <MessageDisplay message="Loading...." />
      ) : (
        users && (
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
                onChange={(e) => onFilterHandler(e.target.value)}
              />
              <CommonButton
                hasUniqueColor="bg-blue-100 border-transparent-0 text-white-100"
                children="Invite"
                type="submit"
                extraClass=" shadow-sm py-2 px-4 text-xs font-semibold "
                onClickHandler={() => onSubmitHandler(receivers)}
              />
            </div>
            <div className="w-[450px] h-[400px] overflow-auto px-6">
              {users.map(
                (user: IParticipantsToInvite) =>
                  user._id !== self?._id &&
                  !user.status && (
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
                        <h4
                          className={`text-xs ${
                            theme === "dark" ? "text-white-800" : "text-black-600"
                          }`}
                        >
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

                      <CheckBox user={user} onClickHandler={onClickHandler} />
                    </div>
                  )
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default AddParticipants;
