import { z } from "zod";
import { SmsType, SmsStatus, SmsPriority } from "./sms.constant";

// SMS Validation Schemas
export const createSmsValidationSchema = z.object({
  body: z.object({
    sms: z.object({
      recipientId: z.string().optional(),
      recipientPhone: z.string().min(1, "Recipient phone is required"),
      type: z.enum([...SmsType] as [string, ...string[]]),
      priority: z.enum([...SmsPriority] as [string, ...string[]]).optional(),
      subject: z
        .string()
        .min(1, "Subject is required")
        .max(100, "Subject cannot exceed 100 characters"),
      message: z
        .string()
        .min(1, "Message is required")
        .max(160, "Message cannot exceed 160 characters"),
      maxRetries: z
        .number()
        .min(1, "Max retries must be at least 1")
        .optional(),
    }),
  }),
});

export const updateSmsValidationSchema = z.object({
  body: z.object({
    sms: z.object({
      recipientId: z.string().optional(),
      recipientPhone: z
        .string()
        .min(1, "Recipient phone is required")
        .optional(),
      type: z.enum([...SmsType] as [string, ...string[]]).optional(),
      priority: z.enum([...SmsPriority] as [string, ...string[]]).optional(),
      subject: z
        .string()
        .min(1, "Subject is required")
        .max(100, "Subject cannot exceed 100 characters")
        .optional(),
      message: z
        .string()
        .min(1, "Message is required")
        .max(160, "Message cannot exceed 160 characters")
        .optional(),
      status: z.enum([...SmsStatus] as [string, ...string[]]).optional(),
      maxRetries: z
        .number()
        .min(1, "Max retries must be at least 1")
        .optional(),
    }),
  }),
});

// SMS Template Validation Schemas
export const createTemplateValidationSchema = z.object({
  body: z.object({
    template: z.object({
      name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name cannot exceed 100 characters"),
      description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
      type: z.enum([...SmsType] as [string, ...string[]]),
      category: z.string().min(1, "Category is required"),
      subject: z
        .string()
        .min(1, "Subject is required")
        .max(100, "Subject cannot exceed 100 characters"),
      content: z
        .string()
        .min(1, "Content is required")
        .max(160, "Content cannot exceed 160 characters"),
      variables: z.array(z.string()).optional(),
      status: z.enum(["active", "inactive", "draft"]).optional(),
    }),
  }),
});

export const updateTemplateValidationSchema = z.object({
  body: z.object({
    template: z.object({
      name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name cannot exceed 100 characters")
        .optional(),
      description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
      type: z.enum([...SmsType] as [string, ...string[]]).optional(),
      category: z.string().min(1, "Category is required").optional(),
      subject: z
        .string()
        .min(1, "Subject is required")
        .max(100, "Subject cannot exceed 100 characters")
        .optional(),
      content: z
        .string()
        .min(1, "Content is required")
        .max(160, "Content cannot exceed 160 characters")
        .optional(),
      variables: z.array(z.string()).optional(),
      status: z.enum(["active", "inactive", "draft"]).optional(),
    }),
  }),
});

// SMS Group Validation Schemas
export const createGroupValidationSchema = z.object({
  body: z.object({
    group: z.object({
      name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name cannot exceed 100 characters"),
      description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
      category: z.string().min(1, "Category is required"),
      members: z.array(z.string()).optional(),
      memberPhones: z.array(z.string()).optional(),
      status: z.enum(["active", "inactive"]).optional(),
    }),
  }),
});

export const updateGroupValidationSchema = z.object({
  body: z.object({
    group: z.object({
      name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name cannot exceed 100 characters")
        .optional(),
      description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
      category: z.string().min(1, "Category is required").optional(),
      members: z.array(z.string()).optional(),
      memberPhones: z.array(z.string()).optional(),
      status: z.enum(["active", "inactive"]).optional(),
    }),
  }),
});

// SMS Schedule Validation Schemas
export const createScheduleValidationSchema = z.object({
  body: z.object({
    schedule: z.object({
      templateId: z.string().min(1, "Template ID is required"),
      groupId: z.string().optional(),
      recipientIds: z.array(z.string()).optional(),
      recipientPhones: z.array(z.string()).optional(),
      scheduledAt: z.string().datetime(),
      frequency: z
        .enum(["once", "daily", "weekly", "monthly", "custom"])
        .optional(),
    }),
  }),
});

export const updateScheduleValidationSchema = z.object({
  body: z.object({
    schedule: z.object({
      templateId: z.string().min(1, "Template ID is required").optional(),
      groupId: z.string().optional(),
      recipientIds: z.array(z.string()).optional(),
      recipientPhones: z.array(z.string()).optional(),
      scheduledAt: z.string().datetime().optional(),
      frequency: z
        .enum(["once", "daily", "weekly", "monthly", "custom"])
        .optional(),
      status: z.enum(["scheduled", "sent", "cancelled", "failed"]).optional(),
    }),
  }),
});

// Bulk SMS Validation Schema
export const sendBulkSmsValidationSchema = z.object({
  body: z.object({
    bulkSms: z.object({
      recipientIds: z.array(z.string()).optional(),
      recipientPhones: z
        .array(z.string())
        .min(1, "At least one recipient phone is required"),
      type: z.enum([...SmsType] as [string, ...string[]]),
      priority: z.enum([...SmsPriority] as [string, ...string[]]).optional(),
      subject: z
        .string()
        .min(1, "Subject is required")
        .max(100, "Subject cannot exceed 100 characters"),
      message: z
        .string()
        .min(1, "Message is required")
        .max(160, "Message cannot exceed 160 characters"),
    }),
  }),
});

// Send SMS to Group Validation Schema
export const sendGroupSmsValidationSchema = z.object({
  body: z.object({
    groupSms: z.object({
      groupId: z.string().min(1, "Group ID is required"),
      type: z.enum([...SmsType] as [string, ...string[]]),
      priority: z.enum([...SmsPriority] as [string, ...string[]]).optional(),
      subject: z
        .string()
        .min(1, "Subject is required")
        .max(100, "Subject cannot exceed 100 characters"),
      message: z
        .string()
        .min(1, "Message is required")
        .max(160, "Message cannot exceed 160 characters"),
    }),
  }),
});

export const SmsValidations = {
  createSmsValidationSchema,
  updateSmsValidationSchema,
  createTemplateValidationSchema,
  updateTemplateValidationSchema,
  createGroupValidationSchema,
  updateGroupValidationSchema,
  createScheduleValidationSchema,
  updateScheduleValidationSchema,
  sendBulkSmsValidationSchema,
  sendGroupSmsValidationSchema,
};
