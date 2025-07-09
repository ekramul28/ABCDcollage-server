import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { HomeServices } from "./home.service";
import {
  sendVideoToCloudinary,
  sendMultipleImagesToCloudinary,
} from "../../utils/sendImageToCloudinary";

// Banner Controllers
const createBanner = catchAsync(async (req, res) => {
  const result = await HomeServices.createBannerIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Banner is created successfully",
    data: result,
  });
});

const getSingleBanner = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await HomeServices.getSingleBannerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner is retrieved successfully",
    data: result,
  });
});

const getAllBanners = catchAsync(async (req, res) => {
  const result = await HomeServices.getAllBannersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banners are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateBanner = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { banner } = req.body;
  const result = await HomeServices.updateBannerIntoDB(id, banner);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner is updated successfully",
    data: result,
  });
});

const deleteBanner = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await HomeServices.deleteBannerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner is deleted successfully",
    data: result,
  });
});

// Gallery Controllers
const createGallery = catchAsync(async (req, res) => {
  const result = await HomeServices.createGalleryIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Gallery item is created successfully",
    data: result,
  });
});

const getSingleGallery = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await HomeServices.getSingleGalleryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gallery item is retrieved successfully",
    data: result,
  });
});

const getAllGallery = catchAsync(async (req, res) => {
  const result = await HomeServices.getAllGalleryFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gallery items are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateGallery = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { gallery } = req.body;
  const result = await HomeServices.updateGalleryIntoDB(id, gallery);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gallery item is updated successfully",
    data: result,
  });
});

const deleteGallery = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await HomeServices.deleteGalleryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gallery item is deleted successfully",
    data: result,
  });
});

// Contact Controllers
const getContact = catchAsync(async (req, res) => {
  const result = await HomeServices.getContactFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact information is retrieved successfully",
    data: result,
  });
});

const createContact = catchAsync(async (req, res) => {
  const result = await HomeServices.createContactIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Contact information is created successfully",
    data: result,
  });
});

const updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { contact } = req.body;
  const result = await HomeServices.updateContactIntoDB(id, contact);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact information is updated successfully",
    data: result,
  });
});

// About Controllers
const getAbout = catchAsync(async (req, res) => {
  const result = await HomeServices.getAboutFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "About information is retrieved successfully",
    data: result,
  });
});

const createAbout = catchAsync(async (req, res) => {
  const result = await HomeServices.createAboutIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "About information is created successfully",
    data: result,
  });
});

const updateAbout = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { about } = req.body;
  const result = await HomeServices.updateAboutIntoDB(id, about);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "About information is updated successfully",
    data: result,
  });
});

// Navbar Controllers
const createNavbar = catchAsync(async (req, res) => {
  const result = await HomeServices.createNavbarIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Navbar item is created successfully",
    data: result,
  });
});

const getSingleNavbar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await HomeServices.getSingleNavbarFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Navbar item is retrieved successfully",
    data: result,
  });
});

const getAllNavbar = catchAsync(async (req, res) => {
  const result = await HomeServices.getAllNavbarFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Navbar items are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateNavbar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { navbar } = req.body;
  const result = await HomeServices.updateNavbarIntoDB(id, navbar);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Navbar item is updated successfully",
    data: result,
  });
});

const deleteNavbar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await HomeServices.deleteNavbarFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Navbar item is deleted successfully",
    data: result,
  });
});

// Banner Video Upload Controller
const uploadBannerVideo = catchAsync(async (req, res) => {
  let videoUrl = req.body.videoUrl;
  if (req.file) {
    const result = await sendVideoToCloudinary(
      req.file.filename,
      req.file.path
    );
    videoUrl = result.secure_url;
  }
  // Save or update the banner with the videoUrl (assume bannerId in body)
  const { bannerId } = req.body;
  if (!bannerId || !videoUrl) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "bannerId and videoUrl (or file) are required",
      data: null,
    });
    return;
  }
  const updatedBanner = await HomeServices.updateBannerIntoDB(bannerId, {
    videoUrl,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner video uploaded/linked successfully",
    data: updatedBanner,
  });
});

// Gallery Multiple Image Upload Controller
const uploadGalleryImages = catchAsync(async (req, res) => {
  if (!req.files || !(req.files instanceof Array) || req.files.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "No images uploaded",
      data: null,
    });
    return;
  }
  const { title, description, category, tags, status } = req.body;
  const urls = await sendMultipleImagesToCloudinary(req.files);
  // Create a gallery item for each image
  const createdItems = await Promise.all(
    urls.map((url) =>
      HomeServices.createGalleryIntoDB({
        id: `${Date.now()}-${Math.random()}`,
        title: title || "Gallery Image",
        description,
        imageUrl: url,
        category: category || "default",
        tags: tags ? (Array.isArray(tags) ? tags : [tags]) : [],
        status: status || "active",
        isDeleted: false,
      })
    )
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Gallery images uploaded successfully",
    data: createdItems,
  });
});

export const HomeControllers = {
  // Banner controllers
  createBanner,
  getAllBanners,
  getSingleBanner,
  deleteBanner,
  updateBanner,
  uploadBannerVideo,

  // Gallery controllers
  createGallery,
  getAllGallery,
  getSingleGallery,
  deleteGallery,
  updateGallery,
  uploadGalleryImages,

  // Contact controllers
  getContact,
  createContact,
  updateContact,

  // About controllers
  getAbout,
  createAbout,
  updateAbout,

  // Navbar controllers
  createNavbar,
  getAllNavbar,
  getSingleNavbar,
  deleteNavbar,
  updateNavbar,
};
