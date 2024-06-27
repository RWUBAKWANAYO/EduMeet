import { useContext } from "react";
import { UIContext } from "../../../hooks/context/UIContext";
import { SendIcon, TypeIcon } from "../../../assets/icons";
import { CommonButton } from "../../shared/buttons";
import { useMessageComposer } from "./useMessageComposer";

export const MessageComposer = () => {
  const { theme } = useContext(UIContext);
  const { messageRef, handleSubmit } = useMessageComposer();
  return (
    <form
      className={`w-full px-4 flex items-center h-[70px] mt-auto border-t ${
        theme === "dark" ? "bg-blue-800 border-transparent-400" : "bg-white-100 border-gray-800"
      }`}
      onSubmit={handleSubmit}
    >
      <div
        className={`w-full flex border items-center  py-1 px-1.5 rounded-3xl ${
          theme === "dark"
            ? "text-white-500 bg-blue-700 border-transparent-400"
            : "text-black-400 bg-white-700 border-gray-800"
        }`}
      >
        {TypeIcon}
        <textarea
          className={` grow h-7 p-1 align-middle resize-none rounded-md  outline-none text-xs align-middle bg-transparent-0  ${
            theme === "dark" ? "text-white-800 " : "text-black-600"
          }`}
          required
          placeholder="Type your message here..."
          ref={messageRef}
        ></textarea>
        <CommonButton
          hasUniqueColor="bg-blue-100 border-transparent-0 text-white-100"
          children={SendIcon}
          type="submit"
          extraClass=" h-8 w-8 p-0 rounded-full  text-xs font-semi-bold "
        />
      </div>
    </form>
  );
};
