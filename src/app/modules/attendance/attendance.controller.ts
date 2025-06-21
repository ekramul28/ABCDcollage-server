import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AttendanceServices } from "./attendance.service";

const createAttendance = catchAsync(async (req, res) => {
  const result = await AttendanceServices.createAttendanceIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Attendance is created successfully",
    data: result,
  });
});

const getSingleAttendance = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AttendanceServices.getSingleAttendanceFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendance is retrieved successfully",
    data: result,
  });
});

const getAllAttendances = catchAsync(async (req, res) => {
  const result = await AttendanceServices.getAllAttendancesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendances are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateAttendance = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AttendanceServices.updateAttendanceIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendance is updated successfully",
    data: result,
  });
});

const deleteAttendance = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AttendanceServices.deleteAttendanceFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Attendance is deleted successfully",
    data: result,
  });
});

export const AttendanceControllers = {
  createAttendance,
  getAllAttendances,
  getSingleAttendance,
  deleteAttendance,
  updateAttendance,
};
