import { z } from "zod";
import { NotificationType, NotificationStatus } from "./notification.constant";

export const createNotificationValidationSchema = z.object({
  body: z.object({
    notification: z.object({
      title: z.string().min(1).max(100),
      message: z.string().min(1).max(500),
      type: z.enum([...NotificationType] as [string, ...string[]]),
      recipient: z.string().min(1, "Recipient ID is required"),
      sender: z.string().optional(),
      relatedEntity: z
        .object({
          type: z.string(),
          id: z.string(),
        })
        .optional(),
    }),
  }),
});

export const updateNotificationValidationSchema = z.object({
  body: z.object({
    notification: z.object({
      title: z.string().min(1).max(100).optional(),
      message: z.string().min(1).max(500).optional(),
      type: z.enum([...NotificationType] as [string, ...string[]]).optional(),
      status: z
        .enum([...NotificationStatus] as [string, ...string[]])
        .optional(),
      readAt: z.string().optional(),
    }),
  }),
});

export const markAsReadValidationSchema = z.object({
  body: z.object({
    notificationIds: z.array(z.string()),
  }),
});

export const NotificationValidations = {
  createNotificationValidationSchema,
  updateNotificationValidationSchema,
  markAsReadValidationSchema,
};
