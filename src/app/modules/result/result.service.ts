/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { ResultSearchableFields } from "./result.constant";
import { TResult } from "./result.interface";
import { Result } from "./result.model";

const createResultIntoDB = async (payload: TResult): Promise<TResult> => {
  const result = await Result.create(payload);
  return result;
};

const getAllResultsFromDB = async (query: Record<string, unknown>) => {
  const resultQuery = new QueryBuilder(Result.find(), query)
    .search(ResultSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await resultQuery.modelQuery
    .populate("studentId")
    .populate("courseId")
    .populate("examId")
    .populate("gradedBy");

  const meta = await resultQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getSingleResultFromDB = async (id: string): Promise<TResult | null> => {
  const result = await Result.findById(id)
    .populate("studentId")
    .populate("courseId")
    .populate("examId")
    .populate("gradedBy");
  return result;
};

const updateResultIntoDB = async (
  id: string,
  payload: Partial<TResult>
): Promise<TResult | null> => {
  const result = await Result.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate("studentId")
    .populate("courseId")
    .populate("examId")
    .populate("gradedBy");
  return result;
};

const deleteResultFromDB = async (id: string): Promise<TResult | null> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedResult = await Result.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedResult) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete result");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedResult;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getResultsByStudent = async (
  studentId: string,
  query: Record<string, unknown>
) => {
  const resultQuery = new QueryBuilder(Result.find({ studentId }), query)
    .search(ResultSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await resultQuery.modelQuery
    .populate("courseId")
    .populate("examId")
    .populate("gradedBy");

  const meta = await resultQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getResultsByCourse = async (
  courseId: string,
  query: Record<string, unknown>
) => {
  const resultQuery = new QueryBuilder(Result.find({ courseId }), query)
    .search(ResultSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await resultQuery.modelQuery
    .populate("studentId")
    .populate("examId")
    .populate("gradedBy");

  const meta = await resultQuery.countTotal();

  return {
    result,
    meta,
  };
};

export const ResultServices = {
  createResultIntoDB,
  getAllResultsFromDB,
  getSingleResultFromDB,
  updateResultIntoDB,
  deleteResultFromDB,
  getResultsByStudent,
  getResultsByCourse,
};
