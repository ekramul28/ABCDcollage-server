import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NotificationServices } from "./notification.service";

const createNotification = catchAsync(async (req, res) => {
  const result = await NotificationServices.createNotificationIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Notification is created successfully",
    data: result,
  });
});

const getSingleNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NotificationServices.getSingleNotificationFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notification is retrieved successfully",
    data: result,
  });
});

const getAllNotifications = catchAsync(async (req, res) => {
  const result = await NotificationServices.getAllNotificationsFromDB(
    req.query
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notifications are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { notification } = req.body;
  const result = await NotificationServices.updateNotificationIntoDB(
    id,
    notification
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notification is updated successfully",
    data: result,
  });
});

const deleteNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NotificationServices.deleteNotificationFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notification is deleted successfully",
    data: result,
  });
});

const markNotificationsAsRead = catchAsync(async (req, res) => {
  const { notificationIds } = req.body;
  const result = await NotificationServices.markNotificationsAsRead(
    notificationIds
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notifications marked as read successfully",
    data: result,
  });
});

const getUserNotifications = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await NotificationServices.getUserNotifications(
    userId,
    req.query
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User notifications are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

export const NotificationControllers = {
  createNotification,
  getAllNotifications,
  getSingleNotification,
  deleteNotification,
  updateNotification,
  markNotificationsAsRead,
  getUserNotifications,
};
