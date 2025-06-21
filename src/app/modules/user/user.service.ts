/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { UserSearchableFields } from "./user.constant";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import config from "../../config";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { generateAdminId, generateTeacherId } from "./user.utils";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { Teacher } from "../teacher/teacher.model";
import { TTeacher } from "../teacher/teacher.interface";

const createTeacherIntoDB = async (
  file: any,
  password: string,
  payload: TTeacher
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set teacher role
  userData.role = "teacher";
  //set teacher email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateTeacherId();

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a teacher
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a teacher (transaction-2)

    const newTeacher = await Teacher.create([payload], { session });

    if (!newTeacher.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create teacher");
    }

    await session.commitTransaction();
    await session.endSession();

    return newTeacher;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "admin";
  //set admin email
  userData.email = payload.email;
  const session = await mongoose.startSession();
  console.log("dat", userData);
  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: number, role: string) => {
  let result = null;

  if (role === "admin") {
    result = await Admin.findOne({ id: userId }).populate("user");
  }

  if (role === "teacher") {
    result = await Teacher.findOne({ id: userId }).populate("user");
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createTeacherIntoDB,

  createAdminIntoDB,
  getMe,
  changeStatus,
};
