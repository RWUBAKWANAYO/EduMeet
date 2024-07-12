import {
  IMeetingRoomMessage,
  IMeetingRoomParticipant,
  ISingleChat,
} from "../../../../types/context.interface";

// chat in general
export const CHANGE_CHAT_TYPE = "CHANGE_CHAT_TYPE" as const;

export type ChatStateType = {
  chatType: "group" | "single";
};

export type ChatActionType = {
  type: typeof CHANGE_CHAT_TYPE;
  payload: "group" | "single";
};

// group chat
export const ADD_GROUP_ALL_CHAT = "ADD_GROUP_ALL_CHAT" as const;
export const ADD_GROUP_SINGLE_CHAT = "ADD_GROUP_SINGLE_CHAT" as const;

export type GroupChatStateType = {
  user: IMeetingRoomParticipant;
  content: string;
  timestamp: Date;
};

export type GroupChatActionType =
  | {
      type: typeof ADD_GROUP_ALL_CHAT;
      payload: GroupChatStateType[];
    }
  | {
      type: typeof ADD_GROUP_SINGLE_CHAT;
      payload: GroupChatStateType;
    };

// single chat

export const ADD_SINGLE_CHAT = "ADD_SINGLE_CHAT" as const;
export const ADD_SINGLE_CHAT_MESSAGE = "ADD_SINGLE_CHAT_MESSAGE" as const;
export const CHANGE_SINGLE_CHAT_TAB = "CHANGE_SINGLE_CHAT_TAB" as const;
export const CHANGE_SINGLE_CHAT_LOADING = "CHANGE_SINGLE_CHAT_LOADING" as const;
export const ADD_SINGLE_CHAT_PEER = "ADD_SINGLE_CHAT_PEER" as const;

export type SingleChatStateType = {
  chatTab: "chat" | "peers";
  loading: boolean;
  chat: ISingleChat;
  peer: IMeetingRoomParticipant;
};
export type SingleChatActionType =
  | {
      type: typeof ADD_SINGLE_CHAT;
      payload: ISingleChat;
    }
  | {
      type: typeof ADD_SINGLE_CHAT_MESSAGE;
      payload: IMeetingRoomMessage;
    }
  | {
      type: typeof CHANGE_SINGLE_CHAT_TAB;
      payload: "chat" | "peers";
    }
  | {
      type: typeof CHANGE_SINGLE_CHAT_LOADING;
      payload: boolean;
    }
  | {
      type: typeof ADD_SINGLE_CHAT_PEER;
      payload: IMeetingRoomParticipant;
    };
