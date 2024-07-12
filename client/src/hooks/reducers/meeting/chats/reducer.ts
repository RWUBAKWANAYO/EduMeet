import { ISingleChat } from "../../../../types/context.interface";
import {
  ADD_GROUP_ALL_CHAT,
  ADD_GROUP_SINGLE_CHAT,
  ADD_SINGLE_CHAT,
  ADD_SINGLE_CHAT_MESSAGE,
  ADD_SINGLE_CHAT_PEER,
  CHANGE_CHAT_TYPE,
  CHANGE_SINGLE_CHAT_LOADING,
  CHANGE_SINGLE_CHAT_TAB,
  ChatActionType,
  ChatStateType,
  GroupChatActionType,
  GroupChatStateType,
  SingleChatActionType,
  SingleChatStateType,
} from "./types";

// general chat
export const chatReducer = (state: ChatStateType, action: ChatActionType) => {
  switch (action.type) {
    case CHANGE_CHAT_TYPE:
      return {
        ...state,
        chatType: action.payload,
      };
    default:
      return state;
  }
};
// group chat
export const groupChatReducer = (state: GroupChatStateType[], action: GroupChatActionType) => {
  switch (action.type) {
    case ADD_GROUP_ALL_CHAT:
      return action.payload;
    case ADD_GROUP_SINGLE_CHAT:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const singleChatReducer = (state: SingleChatStateType, action: SingleChatActionType) => {
  switch (action.type) {
    case ADD_SINGLE_CHAT:
      return {
        ...state,
        chat: action.payload,
      };
    case ADD_SINGLE_CHAT_MESSAGE:
      return {
        ...state,
        chat: {
          ...state.chat,
          latestMessage: action.payload,
          messages: [...state.chat.messages, action.payload],
        },
      };
    case CHANGE_SINGLE_CHAT_TAB:
      return {
        ...state,
        chatTab: action.payload,
      };
    case CHANGE_SINGLE_CHAT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_SINGLE_CHAT_PEER:
      return {
        ...state,
        peer: action.payload,
      };
    default:
      return state;
  }
};
