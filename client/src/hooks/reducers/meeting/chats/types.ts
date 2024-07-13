import { IMessage } from "../../../../types/chats.interface";
import { IUser } from "../../../../types/users.interface";

export const CHANGE_CHAT_TYPE = "CHANGE_CHAT_TYPE" as const;
export const CHANGE_SINGLE_CHAT_TAB = "CHANGE_SINGLE_CHAT_TAB" as const;
export const CHANGE_CHAT_LOADING = "CHANGE_CHAT_LOADING" as const;
export const ADD_CHAT = "ADD_CHAT" as const;
export const ADD_ALL_MESSAGE = "ADD_ALL_MESSAGE" as const;
export const ADD_SINGLE_MESSAGE = "ADD_SINGLE_MESSAGE" as const;

export type ChatStateType = {
  _id: string;
  chatType: "group" | "single";
  chatTab?: "chat" | "peers";
  members?: IUser[];
  loading?: boolean;
  latest_message?: IMessage;
  messages: IMessage[];
};

export type ChatActionType =
  | {
      type: typeof CHANGE_CHAT_TYPE;
      payload: "group" | "single";
    }
  | {
      type: typeof CHANGE_SINGLE_CHAT_TAB;
      payload: "chat" | "peers";
    }
  | {
      type: typeof CHANGE_CHAT_LOADING;
      payload: boolean;
    }
  | {
      type: typeof ADD_CHAT;
      payload: ChatStateType;
    }
  | {
      type: typeof ADD_SINGLE_MESSAGE;
      payload: IMessage;
    }
  | {
      type: typeof ADD_ALL_MESSAGE;
      payload: IMessage[];
    };

// // group chat
// export const ADD_GROUP_ALL_CHAT = "ADD_GROUP_ALL_CHAT" as const;
// export const ADD_GROUP_SINGLE_CHAT = "ADD_GROUP_SINGLE_CHAT" as const;

// export type GroupChatStateType = {
//   user: IUser;
//   content: string;
//   timestamp: Date;
// };

// export type GroupChatActionType =
//   | {
//       type: typeof ADD_GROUP_ALL_CHAT;
//       payload: GroupChatStateType[];
//     }
//   | {
//       type: typeof ADD_GROUP_SINGLE_CHAT;
//       payload: GroupChatStateType;
//     };

// // single chat

// export const ADD_SINGLE_CHAT = "ADD_SINGLE_CHAT" as const;
// export const ADD_SINGLE_CHAT_MESSAGE = "ADD_SINGLE_CHAT_MESSAGE" as const;
// export const CHANGE_CHAT_LOADING = "CHANGE_CHAT_LOADING" as const;

// export type SingleChatStateType = {
//   chatTab: "chat" | "peers";
//   loading: boolean;
//   chat: ISingleChat;
//   peer: IUser;
// };
// export type SingleChatActionType =
//   | {
//       type: typeof ADD_SINGLE_CHAT;
//       payload: ISingleChat;
//     }
//   | {
//       type: typeof ADD_SINGLE_CHAT_MESSAGE;
//       payload: IMeetingRoomMessage;
//     }
//   | {
//       type: typeof CHANGE_SINGLE_CHAT_TAB;
//       payload: "chat" | "peers";
//     }
//   | {
//       type: typeof CHANGE_CHAT_LOADING;
//       payload: boolean;
//     }
//   | {
//       type: typeof ADD_SINGLE_CHAT_PEER;
//       payload: IUser;
//     };
