import {
  ADD_ALL_MESSAGE,
  ADD_CHAT,
  ADD_SINGLE_MESSAGE,
  CHANGE_CHAT_TYPE,
  CHANGE_CHAT_LOADING,
  CHANGE_SINGLE_CHAT_TAB,
  ChatActionType,
  ChatStateType,
} from "./types";

export const chatReducer = (state: ChatStateType, action: ChatActionType) => {
  switch (action.type) {
    case CHANGE_CHAT_TYPE:
      return {
        ...state,
        chatType: action.payload,
      };
    case CHANGE_SINGLE_CHAT_TAB:
      return {
        ...state,
        chatTab: action.payload,
      };
    case CHANGE_CHAT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_CHAT:
      return action.payload;
    case ADD_ALL_MESSAGE:
      return {
        ...state,
        messages: action.payload,
      };
    case ADD_SINGLE_MESSAGE:
      return {
        ...state,
        latestMessage: action.payload,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

// // group chat
// export const groupChatReducer = (state: GroupChatStateType[], action: GroupChatActionType) => {
//   switch (action.type) {
//     case ADD_GROUP_ALL_CHAT:
//       return action.payload;
//     case ADD_GROUP_SINGLE_CHAT:
//       return [...state, action.payload];
//     default:
//       return state;
//   }
// };

// export const singleChatReducer = (state: SingleChatStateType, action: SingleChatActionType) => {
//   switch (action.type) {
//     case ADD_SINGLE_CHAT:
//       return {
//         ...state,
//         chat: action.payload,
//       };
//     case ADD_SINGLE_CHAT_MESSAGE:
//       return {
//         ...state,
//         chat: {
//           ...state.chat,
//           latestMessage: action.payload,
//           messages: [...state.chat.messages, action.payload],
//         },
//       };
//     case CHANGE_SINGLE_CHAT_TAB:
//       return {
//         ...state,
//         chatTab: action.payload,
//       };
//     case CHANGE_CHAT_LOADING:
//       return {
//         ...state,
//         loading: action.payload,
//       };
//     case ADD_SINGLE_CHAT_PEER:
//       return {
//         ...state,
//         peer: action.payload,
//       };
//     default:
//       return state;
//   }
// };
