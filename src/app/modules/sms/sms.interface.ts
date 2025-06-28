import { Model, Types } from "mongoose";

export type TSmsType =
  | "notification"
  | "alert"
  | "reminder"
  | "announcement"
  | "personal";
export type TSmsStatus =
  | "pending"
  | "sent"
  | "delivered"
  | "failed"
  | "cancelled";
export type TSmsPriority = "low" | "normal" | "high" | "urgent";
export type TSmsFrequency = "once" | "daily" | "weekly" | "monthly" | "custom";

export type TSms = {
  id: string;
  senderId: Types.ObjectId;
  recipientId?: Types.ObjectId;
  recipientPhone: string;
  type: TSmsType;
  priority: TSmsPriority;
  subject: string;
  message: string;
  status: TSmsStatus;
  sentAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  retryCount: number;
  maxRetries: number;
  cost?: number;
  isDeleted: boolean;
};

export type TSmsTemplate = {
  id: string;
  name: string;
  description?: string;
  type: TSmsType;
  category: string;
  subject: string;
  content: string;
  variables: string[];
  status: "active" | "inactive" | "draft";
  createdBy: Types.ObjectId;
  isDeleted: boolean;
};

export type TSmsGroup = {
  id: string;
  name: string;
  description?: string;
  category: string;
  members: Types.ObjectId[];
  memberPhones: string[];
  status: "active" | "inactive";
  createdBy: Types.ObjectId;
  isDeleted: boolean;
};

export type TSmsSchedule = {
  id: string;
  templateId: Types.ObjectId;
  groupId?: Types.ObjectId;
  recipientIds?: Types.ObjectId[];
  recipientPhones?: string[];
  scheduledAt: Date;
  frequency: TSmsFrequency;
  status: "scheduled" | "sent" | "cancelled" | "failed";
  lastSentAt?: Date;
  nextSendAt?: Date;
  createdBy: Types.ObjectId;
  isDeleted: boolean;
};

export type TSmsLog = {
  id: string;
  smsId: Types.ObjectId;
  action: "sent" | "delivered" | "failed" | "retry";
  timestamp: Date;
  details?: string;
  isDeleted: boolean;
};

export interface SmsModel extends Model<TSms> {
  // eslint-disable-next-line no-unused-vars
  isSmsExists(id: string): Promise<TSms | null>;
}

export interface SmsTemplateModel extends Model<TSmsTemplate> {
  // eslint-disable-next-line no-unused-vars
  isTemplateExists(id: string): Promise<TSmsTemplate | null>;
}

export interface SmsGroupModel extends Model<TSmsGroup> {
  // eslint-disable-next-line no-unused-vars
  isGroupExists(id: string): Promise<TSmsGroup | null>;
}

export interface SmsScheduleModel extends Model<TSmsSchedule> {
  // eslint-disable-next-line no-unused-vars
  isScheduleExists(id: string): Promise<TSmsSchedule | null>;
}

export interface SmsLogModel extends Model<TSmsLog> {
  // eslint-disable-next-line no-unused-vars
  isLogExists(id: string): Promise<TSmsLog | null>;
}
