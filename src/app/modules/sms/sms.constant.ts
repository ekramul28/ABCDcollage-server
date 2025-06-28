import { TSmsType, TSmsStatus, TSmsPriority } from "./sms.interface";

export const SmsType: TSmsType[] = [
  "notification",
  "alert",
  "reminder",
  "announcement",
  "personal",
];

export const SmsStatus: TSmsStatus[] = [
  "pending",
  "sent",
  "delivered",
  "failed",
  "cancelled",
];

export const SmsPriority: TSmsPriority[] = ["low", "normal", "high", "urgent"];

export const SmsSearchableFields = [
  "id",
  "senderId",
  "recipientId",
  "recipientPhone",
  "type",
  "status",
  "priority",
  "subject",
  "message",
];

export const SmsTemplateSearchableFields = [
  "id",
  "name",
  "type",
  "category",
  "status",
  "subject",
  "content",
];

export const SmsGroupSearchableFields = [
  "id",
  "name",
  "description",
  "category",
  "status",
  "createdBy",
];

export const SmsScheduleSearchableFields = [
  "id",
  "templateId",
  "groupId",
  "scheduledAt",
  "status",
  "frequency",
];
