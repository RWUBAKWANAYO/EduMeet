import { IMessage } from "../../../../types/chats.interface";
import {
	CHANGE_SINGLE_CHAT_TAB,
	CHANGE_CHAT_TYPE,
	ADD_ALL_MESSAGE,
	ChatStateType,
	ADD_SINGLE_MESSAGE,
	ADD_CHAT,
	CHANGE_CHAT_LOADING,
} from "./types";

export const changeChatTypeAction = (chatType: "group" | "single") => {
	return {
		type: CHANGE_CHAT_TYPE,
		payload: chatType,
	};
};

export const changeSingleChatTab = (tab: "chat" | "peers") => ({
	type: CHANGE_SINGLE_CHAT_TAB,
	payload: tab,
});

export const changeChatLoading = (isLoading: boolean) => ({
	type: CHANGE_CHAT_LOADING,
	payload: isLoading,
});

export const addChatAction = (chat: ChatStateType) => ({
	type: ADD_CHAT,
	payload: chat,
});
export const addSingleMessageAction = (message: IMessage) => ({
	type: ADD_SINGLE_MESSAGE,
	payload: message,
});
export const addAllMessageAction = (messages: IMessage[]) => ({
	type: ADD_ALL_MESSAGE,
	payload: messages,
});
