import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ResultServices } from "./result.service";

// Result Controllers
const createResult = catchAsync(async (req, res) => {
  const result = await ResultServices.createResultIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Result is created successfully",
    data: result,
  });
});

const getSingleResult = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ResultServices.getSingleResultFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Result is retrieved successfully",
    data: result,
  });
});

const getAllResults = catchAsync(async (req, res) => {
  const result = await ResultServices.getAllResultsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Results are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateResult = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { result } = req.body;
  const updatedResult = await ResultServices.updateResultIntoDB(id, result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Result is updated successfully",
    data: updatedResult,
  });
});

const deleteResult = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ResultServices.deleteResultFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Result is deleted successfully",
    data: result,
  });
});

// Student-specific result controllers
const getResultsByStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await ResultServices.getResultsByStudent(studentId, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student results are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

// Course-specific result controllers
const getResultsByCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await ResultServices.getResultsByCourse(courseId, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course results are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

export const ResultControllers = {
  createResult,
  getSingleResult,
  getAllResults,
  updateResult,
  deleteResult,
  getResultsByStudent,
  getResultsByCourse,
};
