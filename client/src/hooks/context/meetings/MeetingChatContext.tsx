import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import {
	ChatStateType,
	addChatAction,
	addSingleMessageAction,
	changeChatTypeAction,
	changeChatLoading,
	changeSingleChatTab,
	chatReducer,
} from "../../reducers/meeting/chats";
import { UserContext } from "../UserContext";
import { socket } from "../../../lib/socket";
import { MeetingRoomContext } from "./MeetingRoomContext";
import { IMessage } from "../../../types/chats.interface";
import { IFetchChatData } from "../types";

export const MeetingChatContext = createContext<any>(null);

export const MeetingChatProvider = ({ children }: { children: React.ReactNode }) => {
	const { user } = useContext(UserContext);
	const { meetingRoomId } = useContext(MeetingRoomContext);
	const [meetingChat, dispatch] = useReducer<React.Reducer<ChatStateType, any>>(chatReducer, {
		_id: "",
		chatType: "group",
		chatTab: "peers",
		loading: true,
		members: [],
		messages: [],
	});

	const fetchMeetingChat = useCallback(
		({ chatType, chatTab, memberId }: IFetchChatData) => {
			if (chatTab === "peers") {
				dispatch(changeChatTypeAction(chatType));
				dispatch(changeSingleChatTab("peers"));
				return;
			}
			const chatData: IFetchChatData = {
				roomId: meetingRoomId,
				chatType: chatType,
			};
			if (chatType === "single") {
				if (!memberId) return;
				chatData.participants = [user!._id, memberId];
				dispatch(changeChatTypeAction(chatType));
				dispatch(changeSingleChatTab("chat"));
			}
			dispatch(changeChatLoading(true));
			socket.emit("join-meeting-chat", chatData);
		},
		[user, meetingRoomId]
	);

	const addChatHandler = useCallback(
		({ chat, messages }: { chat: any; messages: IMessage[] }) => {
			const data: ChatStateType = {
				_id: chat._id,
				chatType: chat.chat_type,
				loading: false,
				members: chat.members,
				messages,
			};
			if (chat.chat_type === "single") data.chatTab = "chat";
			dispatch(addChatAction(data));
		},
		[dispatch]
	);

	const sendMessage = (content: string) => {
		if (!user || !meetingRoomId) return;
		const messageData: IMessage = {
			chat: meetingChat._id,
			sender: user,
			content,
			timestamp: new Date(),
		};
		dispatch(addSingleMessageAction(messageData));
		socket.emit("send-meeting-message", messageData);
	};

	const addMessageHandler = useCallback(
		(message: IMessage) => {
			dispatch(addSingleMessageAction(message));
		},
		[dispatch]
	);

	useEffect(() => {
		if (!user || !meetingRoomId) return;
		fetchMeetingChat({ chatType: "group" });
	}, [user, meetingRoomId]);

	useEffect(() => {
		socket.on("meeting-chat-joined", addChatHandler);
		socket.on("meeting-message-received", addMessageHandler);

		return () => {
			socket.off("meeting-chat-joined", addChatHandler);
			socket.off("meeting-message-received", addMessageHandler);
		};
	}, []);

	const providerValue = useMemo(
		() => ({
			sendMessage,

			meetingChat,
			fetchMeetingChat,
		}),
		[sendMessage, meetingChat, fetchMeetingChat]
	);
	return (
		<MeetingChatContext.Provider value={providerValue}>{children}</MeetingChatContext.Provider>
	);
};
