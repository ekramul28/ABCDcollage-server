/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TeacherSearchableFields } from "./teacher.constant";
import { TTeacher } from "./teacher.interface";
import { Teacher } from "./teacher.model";

const getAllTeachersFromDB = async (query: Record<string, unknown>) => {
  const teacherQuery = new QueryBuilder(
    Teacher.find().populate("academicDepartment academicFaculty"),
    query
  )
    .search(TeacherSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await teacherQuery.modelQuery;
  const meta = await teacherQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getSingleTeacherFromDB = async (id: string) => {
  const result = await Teacher.findById(id).populate("academicDepartment");

  return result;
};

const updateTeacherIntoDB = async (id: string, payload: Partial<TTeacher>) => {
  const { name, ...remainingTeacherData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingTeacherData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Teacher.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteTeacherFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedTeacher) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete teacher");
    }

    // get user _id from deletedFaculty
    const userId = deletedTeacher.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedTeacher;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const TeacherServices = {
  getAllTeachersFromDB,
  getSingleTeacherFromDB,
  updateTeacherIntoDB,
  deleteTeacherFromDB,
};
