import {
  TNotificationType,
  TNotificationStatus,
} from "./notification.interface";

export const NotificationType: TNotificationType[] = [
  "info",
  "warning",
  "error",
  "success",
];

export const NotificationStatus: TNotificationStatus[] = [
  "read",
  "unread",
  "archived",
];

export const NotificationSearchableFields = [
  "id",
  "title",
  "message",
  "type",
  "status",
  "recipient",
  "sender",
];
