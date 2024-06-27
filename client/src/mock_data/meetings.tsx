import { IMeetingData } from "../types/meetings.interface";
import { users } from "./users";

export const meetings: IMeetingData[] = [
  {
    _id: "meeting1",
    title: "Daily standup meeting with development team",
    description: "Discuss the progress of the project and the tasks for the day",
    session_id: 1234567,
    status: "active",
    start_time: new Date(),
    end_time: new Date(),
    isInstant: true,
    host: users[0]._id,
    passcode_required: true,
    passcode: "1234",
    waiting_room: false,
    require_confirm: false,
    participants: users,
    video: {
      host: "on",
      participants: "on",
    },
  },
  {
    _id: "meeting2",
    title: "Weekly sprint planning meeting",
    description: "Plan the tasks for the next sprint",
    session_id: 2345678,
    status: "active",
    start_time: new Date(),
    end_time: new Date(),
    isInstant: false,
    host: users[1]._id,
    passcode_required: true,
    passcode: "2345",
    waiting_room: false,
    require_confirm: false,
    participants: users,
    video: {
      host: "on",
      participants: "on",
    },
  },
  {
    _id: "meeting3",
    title: "Monthly review meeting",
    description: "Review the progress of the project and discuss the issues",
    session_id: 3456789,
    status: "active",
    start_time: new Date(),
    end_time: new Date(),
    isInstant: false,
    host: users[2]._id,
    passcode_required: true,
    passcode: "3456",
    waiting_room: false,
    require_confirm: false,
    participants: users,
    video: {
      host: "on",
      participants: "on",
    },
  },
  {
    _id: "meeting4",
    title: "Quarterly planning meeting",
    description: "Plan the tasks for the next quarter",
    session_id: 4567890,
    status: "active",
    start_time: new Date(),
    end_time: new Date(),
    isInstant: false,
    host: users[3]._id,
    passcode_required: true,
    passcode: "4567",
    waiting_room: false,
    require_confirm: false,
    participants: users,
    video: {
      host: "on",
      participants: "on",
    },
  },
  {
    _id: "meeting5",
    title: "Yearly review meeting",
    description: "Review the progress of the project and discuss the issues",
    session_id: 5678901,
    status: "active",
    start_time: new Date(),
    end_time: new Date(),
    isInstant: false,
    host: users[4]._id,
    passcode_required: true,
    passcode: "5678",
    waiting_room: false,
    require_confirm: false,
    participants: users,
    video: {
      host: "on",
      participants: "on",
    },
  },
];