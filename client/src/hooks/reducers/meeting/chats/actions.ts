import {
  IMeetingRoomMessage,
  IMeetingRoomParticipant,
  ISingleChat,
} from "../../../../types/context.interface";
import {
  ADD_GROUP_SINGLE_CHAT,
  ADD_GROUP_ALL_CHAT,
  CHANGE_CHAT_TYPE,
  ADD_SINGLE_CHAT_MESSAGE,
  ADD_SINGLE_CHAT,
  CHANGE_SINGLE_CHAT_TAB,
  ADD_SINGLE_CHAT_PEER,
} from "./types";

//general chat
export const changeChatTypeAction = (chatType: "group" | "single") => {
  return {
    type: CHANGE_CHAT_TYPE,
    payload: chatType,
  };
};

// group chat
export const addGroupAllChatAction = (messages: IMeetingRoomMessage[]) => ({
  type: ADD_GROUP_ALL_CHAT,
  payload: messages,
});

export const addGroupSingleChatAction = (message: IMeetingRoomMessage) => ({
  type: ADD_GROUP_SINGLE_CHAT,
  payload: message,
});

// single chat

export const addSingleChatAction = (chat: ISingleChat) => ({
  type: ADD_SINGLE_CHAT,
  payload: chat,
});
export const addSingleChatMessageAction = (message: IMeetingRoomMessage) => ({
  type: ADD_SINGLE_CHAT_MESSAGE,
  payload: message,
});

export const changeSingleChatTab = (tab: "chat" | "peers") => ({
  type: CHANGE_SINGLE_CHAT_TAB,
  payload: tab,
});

export const changeSingleChatLoading = (isLoading: boolean) => ({
  type: CHANGE_SINGLE_CHAT_TAB,
  payload: isLoading,
});

export const addSingleChatPeerAction = (peer: IMeetingRoomParticipant) => ({
  type: ADD_SINGLE_CHAT_PEER,
  payload: peer,
});
