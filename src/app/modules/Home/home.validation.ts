import { z } from "zod";
import { BannerType, ContentStatus } from "./home.constant";

// Banner Validation Schemas
export const createBannerValidationSchema = z.object({
  body: z.object({
    banner: z.object({
      title: z.string().min(1).max(100),
      subtitle: z.string().max(200).optional(),
      description: z.string().max(500).optional(),
      imageUrl: z.string().url(),
      videoUrl: z.string().url().optional(),
      type: z.enum([...BannerType] as [string, ...string[]]),
      status: z.enum([...ContentStatus] as [string, ...string[]]).optional(),
      order: z.number().int().min(0).optional(),
    }),
  }),
});

export const updateBannerValidationSchema = z.object({
  body: z.object({
    banner: z.object({
      title: z.string().min(1).max(100).optional(),
      subtitle: z.string().max(200).optional(),
      description: z.string().max(500).optional(),
      imageUrl: z.string().url().optional(),
      videoUrl: z.string().url().optional(),
      type: z.enum([...BannerType] as [string, ...string[]]).optional(),
      status: z.enum([...ContentStatus] as [string, ...string[]]).optional(),
      order: z.number().int().min(0).optional(),
    }),
  }),
});

// Gallery Validation Schemas
export const createGalleryValidationSchema = z.object({
  body: z.object({
    gallery: z.object({
      title: z.string().min(1).max(100),
      description: z.string().max(500).optional(),
      imageUrl: z.string().url(),
      videoUrl: z.string().url().optional(),
      category: z.string().min(1),
      tags: z.array(z.string()).optional(),
      status: z.enum([...ContentStatus] as [string, ...string[]]).optional(),
    }),
  }),
});

export const updateGalleryValidationSchema = z.object({
  body: z.object({
    gallery: z.object({
      title: z.string().min(1).max(100).optional(),
      description: z.string().max(500).optional(),
      imageUrl: z.string().url().optional(),
      videoUrl: z.string().url().optional(),
      category: z.string().min(1).optional(),
      tags: z.array(z.string()).optional(),
      status: z.enum([...ContentStatus] as [string, ...string[]]).optional(),
    }),
  }),
});

// Contact Validation Schemas
export const createContactValidationSchema = z.object({
  body: z.object({
    contact: z.object({
      address: z.string().min(1),
      phone: z.string().min(1),
      email: z.string().email(),
      website: z.string().url().optional(),
      facebook: z.string().url().optional(),
      twitter: z.string().url().optional(),
      instagram: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      workingHours: z.string().min(1),
    }),
  }),
});

export const updateContactValidationSchema = z.object({
  body: z.object({
    contact: z.object({
      address: z.string().min(1).optional(),
      phone: z.string().min(1).optional(),
      email: z.string().email().optional(),
      website: z.string().url().optional(),
      facebook: z.string().url().optional(),
      twitter: z.string().url().optional(),
      instagram: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      workingHours: z.string().min(1).optional(),
    }),
  }),
});

// About Validation Schemas
export const createAboutValidationSchema = z.object({
  body: z.object({
    about: z.object({
      title: z.string().min(1).max(100),
      content: z.string().min(1),
      imageUrl: z.string().url().optional(),
      mission: z.string().optional(),
      vision: z.string().optional(),
      values: z.array(z.string()).optional(),
      achievements: z.array(z.string()).optional(),
    }),
  }),
});

export const updateAboutValidationSchema = z.object({
  body: z.object({
    about: z.object({
      title: z.string().min(1).max(100).optional(),
      content: z.string().min(1).optional(),
      imageUrl: z.string().url().optional(),
      mission: z.string().optional(),
      vision: z.string().optional(),
      values: z.array(z.string()).optional(),
      achievements: z.array(z.string()).optional(),
    }),
  }),
});

// Navbar Validation Schemas
export const createNavbarValidationSchema = z.object({
  body: z.object({
    navbar: z.object({
      title: z.string().min(1).max(50),
      url: z.string().min(1),
      order: z.number().int().min(0).optional(),
      parentId: z.string().optional(),
      isActive: z.boolean().optional(),
    }),
  }),
});

export const updateNavbarValidationSchema = z.object({
  body: z.object({
    navbar: z.object({
      title: z.string().min(1).max(50).optional(),
      url: z.string().min(1).optional(),
      order: z.number().int().min(0).optional(),
      parentId: z.string().optional(),
      isActive: z.boolean().optional(),
    }),
  }),
});

// Calendar Validation Schemas
export const createCalendarValidationSchema = z.object({
  body: z.object({
    calendar: z.object({
      title: z.string().min(1).max(100),
      description: z.string().max(500).optional(),
      startDate: z.string().min(1),
      endDate: z.string().min(1),
      location: z.string().max(200).optional(),
      allDay: z.boolean().optional(),
    }),
  }),
});

export const updateCalendarValidationSchema = z.object({
  body: z.object({
    calendar: z.object({
      title: z.string().min(1).max(100).optional(),
      description: z.string().max(500).optional(),
      startDate: z.string().min(1).optional(),
      endDate: z.string().min(1).optional(),
      location: z.string().max(200).optional(),
      allDay: z.boolean().optional(),
    }),
  }),
});

export const HomeValidations = {
  createBannerValidationSchema,
  updateBannerValidationSchema,
  createGalleryValidationSchema,
  updateGalleryValidationSchema,
  createContactValidationSchema,
  updateContactValidationSchema,
  createAboutValidationSchema,
  updateAboutValidationSchema,
  createNavbarValidationSchema,
  updateNavbarValidationSchema,
  createCalendarValidationSchema,
  updateCalendarValidationSchema,
};
