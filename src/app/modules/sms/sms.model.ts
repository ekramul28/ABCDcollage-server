import { Schema, model } from "mongoose";
import {
  SmsType,
  SmsStatus,
  SmsPriority,
  SmsModel,
  SmsTemplateModel,
  SmsGroupModel,
  SmsScheduleModel,
  SmsLogModel,
  TSms,
  TSmsTemplate,
  TSmsGroup,
  TSmsSchedule,
  TSmsLog,
} from "./sms.interface";

// SMS Schema
const smsSchema = new Schema<TSms, SmsModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender ID is required"],
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    recipientPhone: {
      type: String,
      required: [true, "Recipient phone is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: {
        values: SmsType,
        message: "{VALUE} is not a valid SMS type",
      },
      required: [true, "Type is required"],
    },
    priority: {
      type: String,
      enum: {
        values: SmsPriority,
        message: "{VALUE} is not a valid priority",
      },
      default: "normal",
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [100, "Subject can not be more than 100 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [160, "Message can not be more than 160 characters"],
    },
    status: {
      type: String,
      enum: {
        values: SmsStatus,
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },
    sentAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
    failedAt: {
      type: Date,
    },
    failureReason: {
      type: String,
      trim: true,
      maxlength: [500, "Failure reason can not be more than 500 characters"],
    },
    retryCount: {
      type: Number,
      default: 0,
      min: [0, "Retry count cannot be negative"],
    },
    maxRetries: {
      type: Number,
      default: 3,
      min: [1, "Max retries must be at least 1"],
    },
    cost: {
      type: Number,
      min: [0, "Cost cannot be negative"],
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

// SMS Template Schema
const smsTemplateSchema = new Schema<TSmsTemplate, SmsTemplateModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    type: {
      type: String,
      enum: {
        values: SmsType,
        message: "{VALUE} is not a valid template type",
      },
      required: [true, "Type is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [100, "Subject can not be more than 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      maxlength: [160, "Content can not be more than 160 characters"],
    },
    variables: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: {
        values: ["active", "inactive", "draft"],
        message: "{VALUE} is not a valid status",
      },
      default: "draft",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by is required"],
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

// SMS Group Schema
const smsGroupSchema = new Schema<TSmsGroup, SmsGroupModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    memberPhones: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "{VALUE} is not a valid status",
      },
      default: "active",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by is required"],
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

// SMS Schedule Schema
const smsScheduleSchema = new Schema<TSmsSchedule, SmsScheduleModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    templateId: {
      type: Schema.Types.ObjectId,
      ref: "SmsTemplate",
      required: [true, "Template ID is required"],
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "SmsGroup",
    },
    recipientIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    recipientPhones: [
      {
        type: String,
        trim: true,
      },
    ],
    scheduledAt: {
      type: Date,
      required: [true, "Scheduled at is required"],
    },
    frequency: {
      type: String,
      enum: {
        values: ["once", "daily", "weekly", "monthly", "custom"],
        message: "{VALUE} is not a valid frequency",
      },
      default: "once",
    },
    status: {
      type: String,
      enum: {
        values: ["scheduled", "sent", "cancelled", "failed"],
        message: "{VALUE} is not a valid status",
      },
      default: "scheduled",
    },
    lastSentAt: {
      type: Date,
    },
    nextSendAt: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by is required"],
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

// SMS Log Schema
const smsLogSchema = new Schema<TSmsLog, SmsLogModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    smsId: {
      type: Schema.Types.ObjectId,
      ref: "Sms",
      required: [true, "SMS ID is required"],
    },
    action: {
      type: String,
      enum: {
        values: ["sent", "delivered", "failed", "retry"],
        message: "{VALUE} is not a valid action",
      },
      required: [true, "Action is required"],
    },
    timestamp: {
      type: Date,
      required: [true, "Timestamp is required"],
      default: Date.now,
    },
    details: {
      type: String,
      trim: true,
      maxlength: [1000, "Details can not be more than 1000 characters"],
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

// Static methods
smsSchema.statics.isSmsExists = async function (id: string) {
  const existingSms = await Sms.findOne({ id, isDeleted: false });
  return existingSms;
};

smsTemplateSchema.statics.isTemplateExists = async function (id: string) {
  const existingTemplate = await SmsTemplate.findOne({ id, isDeleted: false });
  return existingTemplate;
};

smsGroupSchema.statics.isGroupExists = async function (id: string) {
  const existingGroup = await SmsGroup.findOne({ id, isDeleted: false });
  return existingGroup;
};

smsScheduleSchema.statics.isScheduleExists = async function (id: string) {
  const existingSchedule = await SmsSchedule.findOne({ id, isDeleted: false });
  return existingSchedule;
};

smsLogSchema.statics.isLogExists = async function (id: string) {
  const existingLog = await SmsLog.findOne({ id, isDeleted: false });
  return existingLog;
};

// Filter deleted documents
const filterDeleted = function (next: any) {
  this.find({ isDeleted: false });
  next();
};

const filterDeletedOne = function (next: any) {
  this.findOne({ isDeleted: false });
  next();
};

const filterDeletedAggregate = function (next: any) {
  this.pipeline().unshift({ $match: { isDeleted: false } });
  next();
};

// Apply filters to all queries
smsSchema.pre("find", filterDeleted);
smsSchema.pre("findOne", filterDeletedOne);
smsSchema.pre("aggregate", filterDeletedAggregate);

smsTemplateSchema.pre("find", filterDeleted);
smsTemplateSchema.pre("findOne", filterDeletedOne);
smsTemplateSchema.pre("aggregate", filterDeletedAggregate);

smsGroupSchema.pre("find", filterDeleted);
smsGroupSchema.pre("findOne", filterDeletedOne);
smsGroupSchema.pre("aggregate", filterDeletedAggregate);

smsScheduleSchema.pre("find", filterDeleted);
smsScheduleSchema.pre("findOne", filterDeletedOne);
smsScheduleSchema.pre("aggregate", filterDeletedAggregate);

smsLogSchema.pre("find", filterDeleted);
smsLogSchema.pre("findOne", filterDeletedOne);
smsLogSchema.pre("aggregate", filterDeletedAggregate);

export const Sms = model<TSms, SmsModel>("Sms", smsSchema);
export const SmsTemplate = model<TSmsTemplate, SmsTemplateModel>(
  "SmsTemplate",
  smsTemplateSchema
);
export const SmsGroup = model<TSmsGroup, SmsGroupModel>(
  "SmsGroup",
  smsGroupSchema
);
export const SmsSchedule = model<TSmsSchedule, SmsScheduleModel>(
  "SmsSchedule",
  smsScheduleSchema
);
export const SmsLog = model<TSmsLog, SmsLogModel>("SmsLog", smsLogSchema);
