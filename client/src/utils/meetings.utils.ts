import moment from "moment";

export const meetingDurationUntilStart = (time: Date) => {
  return moment.duration(moment(time).diff(moment())).humanize();
};
export const meetingDisplayTime = (
  startTime: Date = new Date(),
  endTime: Date = new Date(),
  status: string
) => {
  const formattedStartTime = moment(startTime).format("HH:mm");
  const formattedEndTime = moment(endTime).format("HH:mm");

  let timeInfo;
  if (status === "upcoming") {
    const durationUntilStart = meetingDurationUntilStart(startTime);
    timeInfo = `start in ${durationUntilStart}`;
  } else if (status === "ended") {
    timeInfo = "Meeting has ended";
  } else {
    timeInfo = "Meeting in progress";
  }
  return `${formattedStartTime} - ${formattedEndTime} | ${timeInfo}`;
};

export const generateCode = () => {
  return Math.floor(1000000 + Math.random() * 9000000);
};

export const timeFormatter = (selectedDate: Date, selectedTimeFrom: Date, selectedTimeTo: Date) => {
  const start_time = moment(selectedDate)
    .hour(moment(selectedTimeFrom).hour())
    .minute(moment(selectedTimeFrom).minute())
    .format();

  const end_time = moment(selectedDate)
    .hour(moment(selectedTimeTo).hour())
    .minute(moment(selectedTimeTo).minute())
    .format();

  return { start_time, end_time };
};

export const timeValidator = (startTime: string, endTime: string) => {
  if (moment(startTime).isAfter(moment(endTime))) {
    return "Meeting Start time cannot be after end time";
  }
  if (moment(startTime).isSame(moment(endTime))) {
    return "Meeting Start time cannot be the same as end time";
  }
  if (moment(startTime).isBefore(moment())) {
    return "Meeting date cannot be in the past";
  }
  return "";
};
