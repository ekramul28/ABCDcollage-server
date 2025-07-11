import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createTeacher = catchAsync(async (req, res) => {
  const { password, teacher: teacherData } = req.body;

  const result = await UserServices.createTeacherIntoDB(
    req.file,
    password,
    teacherData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher is created successfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { email, role } = req.user;
  console.log("hmm", req.user);
  const result = await UserServices.getMe(email, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Status is updated successfully",
    data: result,
  });
});
export const UserControllers = {
  createTeacher,
  createAdmin,
  getMe,
  changeStatus,
};
