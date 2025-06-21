/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { NotificationSearchableFields } from "./notification.constant";
import { TNotification } from "./notification.interface";
import { Notification } from "./notification.model";

const getAllNotificationsFromDB = async (query: Record<string, unknown>) => {
  const notificationQuery = new QueryBuilder(
    Notification.find().populate("recipient sender"),
    query
  )
    .search(NotificationSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await notificationQuery.modelQuery;
  const meta = await notificationQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleNotificationFromDB = async (id: string) => {
  const result = await Notification.findById(id).populate("recipient sender");
  return result;
};

const createNotificationIntoDB = async (payload: TNotification) => {
  const result = await Notification.create(payload);
  return result;
};

const updateNotificationIntoDB = async (
  id: string,
  payload: Partial<TNotification>
) => {
  const result = await Notification.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const markNotificationsAsRead = async (notificationIds: string[]) => {
  const result = await Notification.updateMany(
    { _id: { $in: notificationIds } },
    {
      status: "read",
      readAt: new Date(),
    },
    { new: true }
  );
  return result;
};

const deleteNotificationFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedNotification = await Notification.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedNotification) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to delete notification"
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedNotification;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getUserNotifications = async (
  userId: string,
  query: Record<string, unknown>
) => {
  const notificationQuery = new QueryBuilder(
    Notification.find({ recipient: userId }).populate("sender"),
    query
  )
    .search(NotificationSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await notificationQuery.modelQuery;
  const meta = await notificationQuery.countTotal();
  return {
    result,
    meta,
  };
};

export const NotificationServices = {
  getAllNotificationsFromDB,
  getSingleNotificationFromDB,
  createNotificationIntoDB,
  updateNotificationIntoDB,
  markNotificationsAsRead,
  deleteNotificationFromDB,
  getUserNotifications,
};
