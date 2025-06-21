import { Model, Types } from "mongoose";

export type TNotificationType = "info" | "warning" | "error" | "success";
export type TNotificationStatus = "read" | "unread" | "archived";

export type TNotification = {
  id: string;
  title: string;
  message: string;
  type: TNotificationType;
  status: TNotificationStatus;
  recipient: Types.ObjectId;
  sender?: Types.ObjectId;
  relatedEntity?: {
    type: string;
    id: Types.ObjectId;
  };
  readAt?: Date;
  isDeleted: boolean;
};

export interface NotificationModel extends Model<TNotification> {
  // eslint-disable-next-line no-unused-vars
  isNotificationExists(id: string): Promise<TNotification | null>;
}
