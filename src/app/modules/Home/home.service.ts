/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import {
  BannerSearchableFields,
  GallerySearchableFields,
  NavbarSearchableFields,
} from "./home.constant";
import {
  TBanner,
  TGalleryItem,
  TContactInfo,
  TAboutInfo,
  TNavbarItem,
} from "./home.interface";
import {
  Banner,
  Gallery,
  Contact,
  About,
  Navbar,
  Calendar,
} from "./home.model";

// Banner Services
const getAllBannersFromDB = async (query: Record<string, unknown>) => {
  const bannerQuery = new QueryBuilder(Banner.find(), query)
    .search(BannerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bannerQuery.modelQuery;
  const meta = await bannerQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleBannerFromDB = async (id: string) => {
  const result = await Banner.findById(id);
  return result;
};

const createBannerIntoDB = async (payload: TBanner) => {
  const result = await Banner.create(payload);
  return result;
};

const updateBannerIntoDB = async (id: string, payload: Partial<TBanner>) => {
  const result = await Banner.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const BannerVideoIntoDB = async () => {
  const result = await Banner.find({});

  return result;
};

const deleteBannerFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedBanner = await Banner.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedBanner) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete banner");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedBanner;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// Banner Video Service (explicit wrapper)
const updateBannerVideo = async (bannerId: string, videoUrl: string) => {
  return updateBannerIntoDB(bannerId, { videoUrl });
};

// Gallery Multiple Images Service (explicit wrapper)
const createMultipleGalleryItems = async (items: TGalleryItem[]) => {
  return Gallery.insertMany(items);
};

// Gallery Services
const getAllGalleryFromDB = async (query: Record<string, unknown>) => {
  const galleryQuery = new QueryBuilder(Gallery.find(), query)
    .search(GallerySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await galleryQuery.modelQuery;
  const meta = await galleryQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleGalleryFromDB = async (id: string) => {
  const result = await Gallery.findById(id);
  return result;
};

const createGalleryIntoDB = async (payload: TGalleryItem) => {
  const result = await Gallery.create(payload);
  return result;
};

const updateGalleryIntoDB = async (
  id: string,
  payload: Partial<TGalleryItem>
) => {
  const result = await Gallery.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteGalleryFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedGallery = await Gallery.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedGallery) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to delete gallery item"
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedGallery;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// Contact Services
const getContactFromDB = async () => {
  const result = await Contact.findOne();
  return result;
};

const createContactIntoDB = async (payload: TContactInfo) => {
  const result = await Contact.create(payload);
  return result;
};

const updateContactIntoDB = async (
  id: string,
  payload: Partial<TContactInfo>
) => {
  const result = await Contact.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// About Services
const getAboutFromDB = async () => {
  const result = await About.findOne();
  return result;
};

const createAboutIntoDB = async (payload: TAboutInfo) => {
  const result = await About.create(payload);
  return result;
};

const updateAboutIntoDB = async (id: string, payload: Partial<TAboutInfo>) => {
  const result = await About.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// Navbar Services
const getAllNavbarFromDB = async (query: Record<string, unknown>) => {
  const navbarQuery = new QueryBuilder(Navbar.find(), query)
    .search(NavbarSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await navbarQuery.modelQuery;
  const meta = await navbarQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleNavbarFromDB = async (id: string) => {
  const result = await Navbar.findById(id);
  return result;
};

const createNavbarIntoDB = async (payload: TNavbarItem) => {
  const result = await Navbar.create(payload);
  return result;
};

const updateNavbarIntoDB = async (
  id: string,
  payload: Partial<TNavbarItem>
) => {
  const result = await Navbar.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteNavbarFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedNavbar = await Navbar.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedNavbar) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to delete navbar item"
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedNavbar;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// Calendar Services
const getAllCalendarEventsFromDB = async (query: Record<string, unknown>) => {
  const calendarQuery = new QueryBuilder(Calendar.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await calendarQuery.modelQuery;
  const meta = await calendarQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleCalendarEventFromDB = async (id: string) => {
  return await Calendar.findOne({ id });
};

const createCalendarEventIntoDB = async (payload: any) => {
  const created = await Calendar.create({
    ...payload,
    id: `${Date.now()}-${Math.random()}`,
  });
  return created;
};

const updateCalendarEventIntoDB = async (id: string, payload: any) => {
  const updated = await Calendar.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return updated;
};

const deleteCalendarEventFromDB = async (id: string) => {
  const deleted = await Calendar.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true }
  );
  return deleted;
};

export const HomeServices = {
  // Banner services
  getAllBannersFromDB,
  getSingleBannerFromDB,
  createBannerIntoDB,
  updateBannerIntoDB,
  deleteBannerFromDB,
  updateBannerVideo, // explicit video service
  BannerVideoIntoDB,

  // Gallery services
  getAllGalleryFromDB,
  getSingleGalleryFromDB,
  createGalleryIntoDB,
  updateGalleryIntoDB,
  deleteGalleryFromDB,
  createMultipleGalleryItems, // explicit multiple images service

  // Contact services
  getContactFromDB,
  createContactIntoDB,
  updateContactIntoDB,

  // About services
  getAboutFromDB,
  createAboutIntoDB,
  updateAboutIntoDB,

  // Navbar services
  getAllNavbarFromDB,
  getSingleNavbarFromDB,
  createNavbarIntoDB,
  updateNavbarIntoDB,
  deleteNavbarFromDB,

  // Calendar services
  getAllCalendarEventsFromDB,
  getSingleCalendarEventFromDB,
  createCalendarEventIntoDB,
  updateCalendarEventIntoDB,
  deleteCalendarEventFromDB,
};
