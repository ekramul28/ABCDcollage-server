import { Model, Types } from "mongoose";

export type TBannerType = "main" | "secondary" | "promotional";
export type TContentStatus = "active" | "inactive" | "draft";

export type TBanner = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  videoUrl?: string;
  type: TBannerType;
  status: TContentStatus;
  order: number;
  isDeleted: boolean;
};

export type TGalleryItem = {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  videoUrl?: string;
  category: string;
  tags: string[];
  status: TContentStatus;
  isDeleted: boolean;
};

export type TContactInfo = {
  id: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  workingHours: string;
  isDeleted: boolean;
};

export type TAboutInfo = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  mission?: string;
  vision?: string;
  values?: string[];
  achievements?: string[];
  isDeleted: boolean;
};

export type TNavbarItem = {
  id: string;
  title: string;
  url: string;
  order: number;
  parentId?: string;
  isActive: boolean;
  isDeleted: boolean;
};

export type TCalendarEvent = {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  location?: string;
  allDay?: boolean;
  isDeleted: boolean;
};

export interface BannerModel extends Model<TBanner> {
  // eslint-disable-next-line no-unused-vars
  isBannerExists(id: string): Promise<TBanner | null>;
}

export interface GalleryModel extends Model<TGalleryItem> {
  // eslint-disable-next-line no-unused-vars
  isGalleryItemExists(id: string): Promise<TGalleryItem | null>;
}

export interface ContactModel extends Model<TContactInfo> {
  // eslint-disable-next-line no-unused-vars
  isContactExists(id: string): Promise<TContactInfo | null>;
}

export interface AboutModel extends Model<TAboutInfo> {
  // eslint-disable-next-line no-unused-vars
  isAboutExists(id: string): Promise<TAboutInfo | null>;
}

export interface NavbarModel extends Model<TNavbarItem> {
  // eslint-disable-next-line no-unused-vars
  isNavbarItemExists(id: string): Promise<TNavbarItem | null>;
}

export interface CalendarModel extends Model<TCalendarEvent> {
  isCalendarEventExists(id: string): Promise<TCalendarEvent | null>;
}
