import mongoose, { Document } from "mongoose";

export interface IMeeting extends Document {
	_id?: mongoose.Schema.Types.ObjectId | string;
	title: string;
	description: string;
	session_id: string | number;
	status: string;
	start_time: Date;
	end_time: Date;
	isInstant: boolean;
	host: mongoose.Schema.Types.ObjectId | string;
	passcode_required: boolean;
	waiting_room: boolean;
	require_confirm: boolean;
	passcode: string;
	participants: mongoose.Schema.Types.ObjectId[];
	video: {
		host: string;
		participants: string;
	};
}
export interface IMeetingRoom extends Document {
	meeting_type: "instant" | "scheduled";
	session_id: number | string;
	attendees: mongoose.Schema.Types.ObjectId[];
	meeting?: mongoose.Schema.Types.ObjectId;
}

export interface IMeetingChat extends Document {
	room_id: mongoose.Schema.Types.ObjectId | string;
	chat_type: "group" | "single";
	members?: mongoose.Schema.Types.ObjectId[];
	latestMessage: {
		sender: mongoose.Schema.Types.ObjectId;
		content: string;
	};
}

export interface IMeetingMessage {
	chat: mongoose.Schema.Types.ObjectId;
	sender: mongoose.Schema.Types.ObjectId;
	content: string;
	timestamp: Date;
}

export interface IMeetingStats {
	room: mongoose.Types.ObjectId;
	meeting: mongoose.Types.ObjectId;
	user: mongoose.Types.ObjectId;
	presence: boolean;
	attendances: {
		start_time?: Date;
		end_time?: Date;
	}[];
	recordings: {
		start_time?: Date;
		end_time?: Date;
	}[];
	audio_muted: {
		start_time?: Date;
		end_time?: Date;
	}[];
	video_muted: {
		start_time?: Date;
		end_time?: Date;
	}[];
	screen_sharing: {
		start_time?: Date;
		end_time?: Date;
	}[];
}
