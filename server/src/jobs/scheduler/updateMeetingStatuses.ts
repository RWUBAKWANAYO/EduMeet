import cron from "node-cron";
import Meeting from "../../models/meeting.model";

const updateMeetingStatuses = async () => {
  const now = new Date();

  try {
    const ongoingUpdateResult = await Meeting.updateMany(
      { start_time: { $lte: now }, end_time: { $gt: now }, status: "upcoming" },
      { status: "ongoing" }
    );

    const endedUpdateResult = await Meeting.updateMany(
      { end_time: { $lte: now }, status: { $in: ["upcoming", "ongoing"] } },
      { status: "ended" }
    );

    console.log("Meeting statuses updated", {
      ongoingUpdated: ongoingUpdateResult.modifiedCount,
      endedUpdated: endedUpdateResult.modifiedCount,
    });
  } catch (error) {
    console.error("Error updating meeting statuses:", error);
  }
};

cron.schedule("* * * * *", updateMeetingStatuses);

export default updateMeetingStatuses;
