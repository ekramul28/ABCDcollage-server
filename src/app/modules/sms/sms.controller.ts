import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SmsServices } from "./sms.service";

// SMS Controllers
const createSms = catchAsync(async (req, res) => {
  const result = await SmsServices.createSmsIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "SMS is created successfully",
    data: result,
  });
});

const getSingleSms = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SmsServices.getSingleSmsFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS is retrieved successfully",
    data: result,
  });
});

const getAllSms = catchAsync(async (req, res) => {
  const result = await SmsServices.getAllSmsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS messages are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateSms = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { sms } = req.body;
  const updatedSms = await SmsServices.updateSmsIntoDB(id, sms);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS is updated successfully",
    data: updatedSms,
  });
});

const deleteSms = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SmsServices.deleteSmsFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS is deleted successfully",
    data: result,
  });
});

// SMS Template Controllers
const createTemplate = catchAsync(async (req, res) => {
  const result = await SmsServices.createTemplateIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "SMS template is created successfully",
    data: result,
  });
});

const getSingleTemplate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SmsServices.getSingleTemplateFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS template is retrieved successfully",
    data: result,
  });
});

const getAllTemplates = catchAsync(async (req, res) => {
  const result = await SmsServices.getAllTemplatesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS templates are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateTemplate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { template } = req.body;
  const updatedTemplate = await SmsServices.updateTemplateIntoDB(id, template);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS template is updated successfully",
    data: updatedTemplate,
  });
});

const deleteTemplate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SmsServices.deleteTemplateFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS template is deleted successfully",
    data: result,
  });
});

// SMS Group Controllers
const createGroup = catchAsync(async (req, res) => {
  const result = await SmsServices.createGroupIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "SMS group is created successfully",
    data: result,
  });
});

const getSingleGroup = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SmsServices.getSingleGroupFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS group is retrieved successfully",
    data: result,
  });
});

const getAllGroups = catchAsync(async (req, res) => {
  const result = await SmsServices.getAllGroupsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS groups are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateGroup = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { group } = req.body;
  const updatedGroup = await SmsServices.updateGroupIntoDB(id, group);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS group is updated successfully",
    data: updatedGroup,
  });
});

const deleteGroup = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SmsServices.deleteGroupFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS group is deleted successfully",
    data: result,
  });
});

// SMS Schedule Controllers
const createSchedule = catchAsync(async (req, res) => {
  const result = await SmsServices.createScheduleIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "SMS schedule is created successfully",
    data: result,
  });
});

const getSingleSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SmsServices.getSingleScheduleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS schedule is retrieved successfully",
    data: result,
  });
});

const getAllSchedules = catchAsync(async (req, res) => {
  const result = await SmsServices.getAllSchedulesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS schedules are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { schedule } = req.body;
  const updatedSchedule = await SmsServices.updateScheduleIntoDB(id, schedule);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS schedule is updated successfully",
    data: updatedSchedule,
  });
});

const deleteSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SmsServices.deleteScheduleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SMS schedule is deleted successfully",
    data: result,
  });
});

// Bulk SMS Controllers
const sendBulkSms = catchAsync(async (req, res) => {
  const result = await SmsServices.sendBulkSms(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Bulk SMS is sent successfully",
    data: result,
  });
});

// Group SMS Controllers
const sendGroupSms = catchAsync(async (req, res) => {
  const result = await SmsServices.sendGroupSms(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Group SMS is sent successfully",
    data: result,
  });
});

export const SmsControllers = {
  createSms,
  getSingleSms,
  getAllSms,
  updateSms,
  deleteSms,
  createTemplate,
  getSingleTemplate,
  getAllTemplates,
  updateTemplate,
  deleteTemplate,
  createGroup,
  getSingleGroup,
  getAllGroups,
  updateGroup,
  deleteGroup,
  createSchedule,
  getSingleSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule,
  sendBulkSms,
  sendGroupSms,
};
