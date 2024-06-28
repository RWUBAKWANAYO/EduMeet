import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { asyncErrorHandler } from "../utils";
import mongoose from "mongoose";

export const getUsers = asyncErrorHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const users = await User.find().select("-pmi");
    return res.status(200).json({ status: "success", count: users.length, data: users });
  }
);

export const getUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new Error(`User with id ${req.params.id} not found`));
    }
    return res.status(200).json({ status: "success", data: user });
  }
);

export const getUsersWithInvitationStatus = asyncErrorHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { type, typeId } = req.params;
    const senderId = req.user?._id || "";

    const users = await User.aggregate([
      {
        $lookup: {
          from: "invitations",
          let: { email: "$email" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$receiver_email", "$$email"] },
                    { $eq: ["$sender_id", senderId] },
                    { $eq: ["$invitation_type", type] },
                    {
                      $cond: {
                        if: { $eq: ["$invitation_type", "meeting"] },
                        then: { $eq: ["$meeting_id", new mongoose.Types.ObjectId(typeId)] },
                        else: { $eq: ["$chat_id", new mongoose.Types.ObjectId(typeId)] },
                      },
                    },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                status: 1,
              },
            },
          ],
          as: "invitations",
        },
      },
      {
        $addFields: {
          status: {
            $cond: {
              if: { $gt: [{ $size: { $ifNull: ["$invitations", []] } }, 0] },
              then: { $arrayElemAt: ["$invitations.status", 0] },
              else: null,
            },
          },
        },
      },
      {
        $project: {
          full_name: 1,
          email: 1,
          photo: 1,
          status: 1,
        },
      },
    ]);

    return res.status(200).json({
      status: "success",
      count: users.length,
      data: users,
    });
  }
);
