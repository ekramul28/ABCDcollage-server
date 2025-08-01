import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
// import { UserRole } from "../auth/auth.types";
import { HomeControllers } from "./home.controller";
import {
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
} from "./home.validation";
import { upload } from "../../utils/sendImageToCloudinary";
import { UserRole } from "../auth/auth.types";

const router = express.Router();

// Banner Routes
router.post(
  "/banner",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(createBannerValidationSchema),
  HomeControllers.createBanner
);

router.get("/banner", HomeControllers.getAllBanners);

router.get("/banner/:id", HomeControllers.getSingleBanner);

router.patch(
  "/banner/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(updateBannerValidationSchema),
  HomeControllers.updateBanner
);

router.delete(
  "/banner/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  HomeControllers.deleteBanner
);

// Banner Video Upload Route
router.post(
  "/banner/video",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  upload.single("file"),

  HomeControllers.uploadBannerVideo
);
router.get(
  "/banner/video",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  HomeControllers.getBannerVideo
);

// Gallery Routes
router.post(
  "/gallery",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(createGalleryValidationSchema),
  HomeControllers.createGallery
);

router.get("/gallery", HomeControllers.getAllGallery);

router.get("/gallery/:id", HomeControllers.getSingleGallery);

router.patch(
  "/gallery/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(updateGalleryValidationSchema),
  HomeControllers.updateGallery
);

router.delete(
  "/gallery/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  HomeControllers.deleteGallery
);

// Gallery Multiple Image Upload Route
router.post(
  "/gallery/images",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  upload.array("files", 10), // up to 10 images at once
  HomeControllers.uploadGalleryImages
);

// Contact Routes
router.get("/contact", HomeControllers.getContact);

router.post(
  "/contact",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(createContactValidationSchema),
  HomeControllers.createContact
);

router.patch(
  "/contact/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(updateContactValidationSchema),
  HomeControllers.updateContact
);

// About Routes
router.get("/about", HomeControllers.getAbout);

router.post(
  "/about",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(createAboutValidationSchema),
  HomeControllers.createAbout
);

router.patch(
  "/about/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(updateAboutValidationSchema),
  HomeControllers.updateAbout
);

// Navbar Routes
router.post(
  "/navbar",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(createNavbarValidationSchema),
  HomeControllers.createNavbar
);

router.get("/navbar", HomeControllers.getAllNavbar);

router.get("/navbar/:id", HomeControllers.getSingleNavbar);

router.patch(
  "/navbar/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(updateNavbarValidationSchema),
  HomeControllers.updateNavbar
);

router.delete(
  "/navbar/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  HomeControllers.deleteNavbar
);

// Calendar Routes
router.post(
  "/calendar",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(createCalendarValidationSchema),
  HomeControllers.createCalendarEvent
);

router.get("/calendar", HomeControllers.getAllCalendarEvents);

router.get("/calendar/:id", HomeControllers.getSingleCalendarEvent);

router.patch(
  "/calendar/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(updateCalendarValidationSchema),
  HomeControllers.updateCalendarEvent
);

router.delete(
  "/calendar/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  HomeControllers.deleteCalendarEvent
);

export const HomeRoutes = router;
