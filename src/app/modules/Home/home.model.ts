import { Schema, model } from "mongoose";
import {
  BannerType,
  ContentStatus,
  BannerModel,
  GalleryModel,
  ContactModel,
  AboutModel,
  NavbarModel,
  TBanner,
  TGalleryItem,
  TContactInfo,
  TAboutInfo,
  TNavbarItem,
  TCalendarEvent,
  CalendarModel,
} from "./home.interface";

// Banner Schema
const bannerSchema = new Schema<TBanner, BannerModel>(
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
    subtitle: {
      type: String,
      trim: true,
      maxlength: [200, "Subtitle can not be more than 200 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    videoUrl: {
      type: String,
    },
    type: {
      type: String,
      enum: {
        values: BannerType,
        message: "{VALUE} is not a valid banner type",
      },
      required: [true, "Type is required"],
    },
    status: {
      type: String,
      enum: {
        values: ContentStatus,
        message: "{VALUE} is not a valid status",
      },
      default: "active",
    },
    order: {
      type: Number,
      required: [true, "Order is required"],
      default: 0,
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

// Gallery Schema
const gallerySchema = new Schema<TGalleryItem, GalleryModel>(
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
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    videoUrl: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: {
        values: ContentStatus,
        message: "{VALUE} is not a valid status",
      },
      default: "active",
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

// Contact Schema
const contactSchema = new Schema<TContactInfo, ContactModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    workingHours: {
      type: String,
      required: [true, "Working hours is required"],
      trim: true,
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

// About Schema
const aboutSchema = new Schema<TAboutInfo, AboutModel>(
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
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    mission: {
      type: String,
      trim: true,
    },
    vision: {
      type: String,
      trim: true,
    },
    values: [
      {
        type: String,
        trim: true,
      },
    ],
    achievements: [
      {
        type: String,
        trim: true,
      },
    ],
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

// Navbar Schema
const navbarSchema = new Schema<TNavbarItem, NavbarModel>(
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
      maxlength: [50, "Title can not be more than 50 characters"],
    },
    url: {
      type: String,
      required: [true, "URL is required"],
      trim: true,
    },
    order: {
      type: Number,
      required: [true, "Order is required"],
      default: 0,
    },
    parentId: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
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

// Calendar Schema
const calendarSchema = new Schema<TCalendarEvent, CalendarModel>(
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
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    startDate: {
      type: String,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: String,
      required: [true, "End date is required"],
    },
    location: {
      type: String,
      trim: true,
    },
    allDay: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Filter out deleted documents for all schemas
const filterDeleted = function (next: any) {
  this.find({ isDeleted: { $ne: true } });
  next();
};

const filterDeletedOne = function (next: any) {
  this.find({ isDeleted: { $ne: true } });
  next();
};

const filterDeletedAggregate = function (next: any) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
};

// Apply middleware to all schemas
[
  bannerSchema,
  gallerySchema,
  contactSchema,
  aboutSchema,
  navbarSchema,
  calendarSchema,
].forEach((schema) => {
  schema.pre("find", filterDeleted);
  schema.pre("findOne", filterDeletedOne);
  schema.pre("aggregate", filterDeletedAggregate);
});

// Static methods for all models
bannerSchema.statics.isBannerExists = async function (id: string) {
  return await Banner.findOne({ id });
};

gallerySchema.statics.isGalleryItemExists = async function (id: string) {
  return await Gallery.findOne({ id });
};

contactSchema.statics.isContactExists = async function (id: string) {
  return await Contact.findOne({ id });
};

aboutSchema.statics.isAboutExists = async function (id: string) {
  return await About.findOne({ id });
};

navbarSchema.statics.isNavbarItemExists = async function (id: string) {
  return await Navbar.findOne({ id });
};

calendarSchema.statics.isCalendarEventExists = async function (id: string) {
  return await Calendar.findOne({ id });
};

// Export models
export const Banner = model<TBanner, BannerModel>("Banner", bannerSchema);
export const Gallery = model<TGalleryItem, GalleryModel>(
  "Gallery",
  gallerySchema
);
export const Contact = model<TContactInfo, ContactModel>(
  "Contact",
  contactSchema
);
export const About = model<TAboutInfo, AboutModel>("About", aboutSchema);
export const Navbar = model<TNavbarItem, NavbarModel>("Navbar", navbarSchema);
export const Calendar = model<TCalendarEvent, CalendarModel>(
  "Calendar",
  calendarSchema
);
