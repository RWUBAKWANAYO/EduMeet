import { useContext } from "react";
import { UIContext } from "../hooks/context/UIContext";
import { DateIcon } from "../assets/icons";
import { CheckboxButton, CommonButton } from "../components/shared/buttons";
import { DateSelector, PreferencesSelector, TimeSelector } from "../components/new_meeting";
import { useNewMeeting } from "../components/new_meeting/useNewMeeting";
import { useCustomClipboard } from "../hooks/custom";

export const NewMeeting = () => {
  const { theme } = useContext(UIContext);
  const {
    titleRef,
    descRef,
    submitHandler,
    selectedDate,
    selectDateHandler,
    selectTimeToHandler,
    selectTimeFromHandler,
    isWatingRoom,
    waitingRoomHandler,
    passcodeRequired,
    passcodeHandler,
    requireConfirm,
    requireConfirmHandler,
    hostVideo,
    hostVideoHandler,
    participantVideo,
    participantVideoHandler,
  } = useNewMeeting();
  const { clipboard, copyToast, onHoverHandler, onCopyHandler } = useCustomClipboard();

  return (
    <div className="w-full flex justify-center items-center">
      <form className={`w-fit mb-8 p-8 `} onSubmit={submitHandler}>
        <div
          className={`w-full flex justify-between items-center border-b pb-4 ${
            theme === "dark" ? " border-transparent-400" : "border-gray-800 "
          }`}
        >
          <div
            className={`flex items-center space-x-2 text-md font-semi-bold ${
              theme === "dark" ? "text-white-800" : "text-black-600"
            }`}
          >
            {DateIcon}
            <h3>Schedule Meeting</h3>
          </div>
          <CommonButton
            hasUniqueColor="bg-blue-100 border-transparent-0 text-white-100"
            children="Create Meeting"
            type="submit"
            extraClass=" h-9 px-4 text-xs font-medium "
          />
        </div>
        <div
          className={`w-full flex justify-between items-center border-b ${
            theme === "dark" ? " border-transparent-400" : "border-gray-800 "
          }`}
        >
          <input
            type="text"
            placeholder="Write Meeting Title here..."
            required
            ref={titleRef}
            className={`w-full border-none outline-none bg-transparent-0 text-xs py-4 ${
              theme === "dark" ? "text-white-800" : "text-black-600"
            }`}
          />
        </div>
        <div
          className={`w-full flex border-b ${
            theme === "dark" ? " border-transparent-400" : "border-gray-800 "
          }`}
        >
          <DateSelector selectedDate={selectedDate} selectDateHandler={selectDateHandler} />
          <div className="w-fit pl-8 pb-4">
            <div
              className={`w-full flex justify-between items-center border-b pt-4 ${
                theme === "dark" ? " border-transparent-400" : "border-gray-800 "
              }`}
            >
              <input
                type="text"
                placeholder="Write Meeting Description here..."
                required
                ref={descRef}
                className={`w-full border-none outline-none bg-transparent-0 text-xs  py-4 px-1 ${
                  theme === "dark" ? "text-white-800" : "text-black-600"
                }`}
              />
            </div>
            <TimeSelector
              selectTimeToHandler={selectTimeToHandler}
              selectTimeFromHandler={selectTimeFromHandler}
            />
            <div
              className={`w-full pb-4 flex flex-col border-b ${
                theme === "dark" ? " border-transparent-400" : "border-gray-800 "
              }`}
            >
              {passcodeRequired.status && (
                <>
                  <label
                    className={`text-xs font-light my-4 ${
                      theme === "dark" ? "text-transparent-300" : "text-black-400"
                    }`}
                  >
                    Security passcode
                  </label>
                  <div className="flex items-center gap-x-4 w-full">
                    <input
                      type="text"
                      readOnly
                      ref={clipboard.target}
                      value={passcodeRequired.value}
                      placeholder="Select meeting date below"
                      className={`grow h-9 px-3 rounded-md  border outline-none text-xs  ${
                        theme === "dark"
                          ? "bg-transparent-400 text-white-800 border-transparent-100"
                          : "border-gray-800"
                      }`}
                    />
                    <div className="relative cursor-pointer">
                      <CommonButton
                        children="Copy"
                        type="button"
                        hasUniqueColor={`font-semi-bold bg-orange-100 border-transparent-0 text-white-100`}
                        extraClass=" h-9 px-4 py-0 text-xs "
                        onClickHandler={onCopyHandler}
                      />
                      <div
                        className="w-full h-full absolute top-0 left-0 z-10"
                        onMouseOver={() => onHoverHandler(true)}
                        onMouseLeave={() => onHoverHandler(false)}
                        onClick={onCopyHandler}
                      >
                        {copyToast.visible && (
                          <label
                            className={`absolute top-10 w-28 p-2 right-0 rounded shadow text-xs text-center ${
                              theme === "dark"
                                ? "bg-blue-800 text-white-800 shadow-transparent-50"
                                : "bg-white-100 text-black-600 "
                            }`}
                          >
                            {copyToast.copied ? `Passcode Copied` : `Copy Passcode`}
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="w-full flex justify-between mt-4">
                <CheckboxButton
                  isChecked={passcodeRequired.status}
                  onClickHandler={passcodeHandler}
                  children="Require Passcode to join"
                />
                {!requireConfirm && (
                  <CheckboxButton
                    isChecked={isWatingRoom}
                    onClickHandler={waitingRoomHandler}
                    children="Enable waiting room"
                  />
                )}
              </div>
            </div>
            <PreferencesSelector
              requireConfirm={requireConfirm}
              requireConfirmHandler={requireConfirmHandler}
              hostVideo={hostVideo}
              hostVideoHandler={hostVideoHandler}
              participantVideo={participantVideo}
              participantVideoHandler={participantVideoHandler}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
