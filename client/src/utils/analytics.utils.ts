import moment from "moment";
import { capitalizeText } from "./capitalizeText";

export const joinTimeHandler = (joinTime?: Date | string, startTime?: Date | string): string => {
	if (!joinTime || !startTime) return "N/A";
	const joinTimeMoment = moment(joinTime);
	const startTimeMoment = moment(startTime);
	const differenceInMillis = joinTimeMoment.diff(startTimeMoment);
	const duration = moment.duration(differenceInMillis);
	let formattedDuration = "";

	if (differenceInMillis > 0) {
		formattedDuration = `${duration.humanize()} Late`;
	} else if (differenceInMillis < 0) {
		formattedDuration = `${duration.humanize()} Early`;
	} else {
		formattedDuration = "On time";
	}
	return capitalizeText(formattedDuration);
};

export const leftTimeHandler = (leftTime?: Date | string, endTime?: Date | string): string => {
	if (!leftTime || !endTime) return "N/A";
	const leftTimeMoment = moment(leftTime);
	const endTimeMoment = moment(endTime);
	const differenceInMillis = leftTimeMoment.diff(endTimeMoment);
	const duration = moment.duration(differenceInMillis);
	let formattedDuration = "";

	if (differenceInMillis > 0) {
		formattedDuration = `${duration.humanize()} Late`;
	} else if (differenceInMillis < 0) {
		formattedDuration = `${duration.humanize()} Early`;
	} else {
		formattedDuration = "On time";
	}
	return capitalizeText(formattedDuration);
};
