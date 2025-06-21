/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AttendanceSearchableFields } from "./attendance.constant";
import { TAttendance } from "./attendance.interface";
import { Attendance } from "./attendance.model";

const getAllAttendancesFromDB = async (query: Record<string, unknown>) => {
  const attendanceQuery = new QueryBuilder(Attendance.find(), query)
    .search(AttendanceSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await attendanceQuery.modelQuery;
  const meta = await attendanceQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleAttendanceFromDB = async (id: string) => {
  const result = await Attendance.findById(id);
  return result;
};

const createAttendanceIntoDB = async (payload: TAttendance) => {
  const result = await Attendance.create(payload);
  return result;
};

const updateAttendanceIntoDB = async (
  id: string,
  payload: Partial<TAttendance>
) => {
  const result = await Attendance.findByIdAndUpdate({ id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAttendanceFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAttendance = await Attendance.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedAttendance) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete attendance");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAttendance;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const AttendanceServices = {
  getAllAttendancesFromDB,
  getSingleAttendanceFromDB,
  createAttendanceIntoDB,
  updateAttendanceIntoDB,
  deleteAttendanceFromDB,
};
