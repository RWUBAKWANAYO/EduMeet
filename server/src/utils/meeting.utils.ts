import moment from "moment";

export const getMeetingStatus = (startTime: Date, endTime: Date): string => {
  const now = moment();
  const startMoment = moment(startTime);
  const endMoment = moment(endTime);

  if (now.isBefore(startMoment)) {
    return "upcoming";
  } else if (now.isBetween(startMoment, endMoment)) {
    return "ongoing";
  } else {
    return "ended";
  }
};
