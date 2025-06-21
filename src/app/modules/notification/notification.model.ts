import { Schema, model } from "mongoose";
import { NotificationType, NotificationStatus } from "./notification.constant";
import { NotificationModel, TNotification } from "./notification.interface";

const relatedEntitySchema = new Schema({
  type: {
    type: String,
    required: [true, "Entity type is required"],
  },
  id: {
    type: Schema.Types.ObjectId,
    required: [true, "Entity ID is required"],
  },
});

const notificationSchema = new Schema<TNotification, NotificationModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title can not be more than 100 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [500, "Message can not be more than 500 characters"],
    },
    type: {
      type: String,
      enum: {
        values: NotificationType,
        message: "{VALUE} is not a valid notification type",
      },
      required: [true, "Type is required"],
    },
    status: {
      type: String,
      enum: {
        values: NotificationStatus,
        message: "{VALUE} is not a valid notification status",
      },
      default: "unread",
    },
    recipient: {
      type: Schema.Types.ObjectId,
      required: [true, "Recipient is required"],
      ref: "User",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    relatedEntity: {
      type: relatedEntitySchema,
    },
    readAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// filter out deleted documents
notificationSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

notificationSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

notificationSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if notification is already exist!
notificationSchema.statics.isNotificationExists = async function (id: string) {
  const existingNotification = await Notification.findOne({ id });
  return existingNotification;
};

export const Notification = model<TNotification, NotificationModel>(
  "Notification",
  notificationSchema
);
