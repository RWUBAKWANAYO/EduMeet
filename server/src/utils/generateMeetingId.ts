import Meeting from "../models/meeting.model";

const generateUniqueNumber = () => Math.floor(10000000 + Math.random() * 900000000);

export const generateMeetingId = async (id: number | undefined) => {
  let meetingId: number = id || generateUniqueNumber();
  let isUnique = false;
  while (!isUnique) {
    const existingMeeting = await Meeting.findOne({ session_id: meetingId });
    if (!existingMeeting) isUnique = true;
    meetingId = generateUniqueNumber();
  }
  return meetingId;
};
