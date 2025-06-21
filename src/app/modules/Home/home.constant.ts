import { TBannerType, TContentStatus } from "./home.interface";

export const BannerType: TBannerType[] = ["main", "secondary", "promotional"];

export const ContentStatus: TContentStatus[] = ["active", "inactive", "draft"];

export const BannerSearchableFields = [
  "id",
  "title",
  "subtitle",
  "description",
  "type",
  "status",
];

export const GallerySearchableFields = [
  "id",
  "title",
  "description",
  "category",
  "tags",
  "status",
];

export const ContactSearchableFields = [
  "id",
  "address",
  "phone",
  "email",
  "website",
];

export const AboutSearchableFields = [
  "id",
  "title",
  "content",
  "mission",
  "vision",
];

export const NavbarSearchableFields = ["id", "title", "url", "parentId"];
