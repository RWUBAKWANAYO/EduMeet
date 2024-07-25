export type IMeetingRoomData = {
	sessionId: number;
	passcode?: string | undefined;
	meetingType: "instant" | "scheduled";
	userId: string | null | undefined;
};
