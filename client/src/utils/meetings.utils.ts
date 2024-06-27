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
