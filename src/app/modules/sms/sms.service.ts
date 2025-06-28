/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import {
  SmsSearchableFields,
  SmsTemplateSearchableFields,
  SmsGroupSearchableFields,
  SmsScheduleSearchableFields,
} from "./sms.constant";
import { TSms, TSmsTemplate, TSmsGroup, TSmsSchedule } from "./sms.interface";
import { Sms, SmsTemplate, SmsGroup, SmsSchedule, SmsLog } from "./sms.model";

// SMS Services
const createSmsIntoDB = async (payload: TSms): Promise<TSms> => {
  const result = await Sms.create(payload);
  return result;
};

const getAllSmsFromDB = async (query: Record<string, unknown>) => {
  const smsQuery = new QueryBuilder(Sms.find(), query)
    .search(SmsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await smsQuery.modelQuery
    .populate("senderId")
    .populate("recipientId");

  const meta = await smsQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getSingleSmsFromDB = async (id: string): Promise<TSms | null> => {
  const result = await Sms.findById(id)
    .populate("senderId")
    .populate("recipientId");
  return result;
};

const updateSmsIntoDB = async (
  id: string,
  payload: Partial<TSms>
): Promise<TSms | null> => {
  const result = await Sms.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate("senderId")
    .populate("recipientId");
  return result;
};

const deleteSmsFromDB = async (id: string): Promise<TSms | null> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedSms = await Sms.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedSms) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete SMS");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedSms;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// SMS Template Services
const createTemplateIntoDB = async (
  payload: TSmsTemplate
): Promise<TSmsTemplate> => {
  const result = await SmsTemplate.create(payload);
  return result;
};

const getAllTemplatesFromDB = async (query: Record<string, unknown>) => {
  const templateQuery = new QueryBuilder(SmsTemplate.find(), query)
    .search(SmsTemplateSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await templateQuery.modelQuery.populate("createdBy");

  const meta = await templateQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getSingleTemplateFromDB = async (
  id: string
): Promise<TSmsTemplate | null> => {
  const result = await SmsTemplate.findById(id).populate("createdBy");
  return result;
};

const updateTemplateIntoDB = async (
  id: string,
  payload: Partial<TSmsTemplate>
): Promise<TSmsTemplate | null> => {
  const result = await SmsTemplate.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate("createdBy");
  return result;
};

const deleteTemplateFromDB = async (
  id: string
): Promise<TSmsTemplate | null> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedTemplate = await SmsTemplate.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedTemplate) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete template");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedTemplate;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// SMS Group Services
const createGroupIntoDB = async (payload: TSmsGroup): Promise<TSmsGroup> => {
  const result = await SmsGroup.create(payload);
  return result;
};

const getAllGroupsFromDB = async (query: Record<string, unknown>) => {
  const groupQuery = new QueryBuilder(SmsGroup.find(), query)
    .search(SmsGroupSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await groupQuery.modelQuery
    .populate("members")
    .populate("createdBy");

  const meta = await groupQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getSingleGroupFromDB = async (id: string): Promise<TSmsGroup | null> => {
  const result = await SmsGroup.findById(id)
    .populate("members")
    .populate("createdBy");
  return result;
};

const updateGroupIntoDB = async (
  id: string,
  payload: Partial<TSmsGroup>
): Promise<TSmsGroup | null> => {
  const result = await SmsGroup.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate("members")
    .populate("createdBy");
  return result;
};

const deleteGroupFromDB = async (id: string): Promise<TSmsGroup | null> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedGroup = await SmsGroup.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedGroup) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete group");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedGroup;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// SMS Schedule Services
const createScheduleIntoDB = async (
  payload: TSmsSchedule
): Promise<TSmsSchedule> => {
  const result = await SmsSchedule.create(payload);
  return result;
};

const getAllSchedulesFromDB = async (query: Record<string, unknown>) => {
  const scheduleQuery = new QueryBuilder(SmsSchedule.find(), query)
    .search(SmsScheduleSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await scheduleQuery.modelQuery
    .populate("templateId")
    .populate("groupId")
    .populate("recipientIds")
    .populate("createdBy");

  const meta = await scheduleQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getSingleScheduleFromDB = async (
  id: string
): Promise<TSmsSchedule | null> => {
  const result = await SmsSchedule.findById(id)
    .populate("templateId")
    .populate("groupId")
    .populate("recipientIds")
    .populate("createdBy");
  return result;
};

const updateScheduleIntoDB = async (
  id: string,
  payload: Partial<TSmsSchedule>
): Promise<TSmsSchedule | null> => {
  const result = await SmsSchedule.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate("templateId")
    .populate("groupId")
    .populate("recipientIds")
    .populate("createdBy");
  return result;
};

const deleteScheduleFromDB = async (
  id: string
): Promise<TSmsSchedule | null> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedSchedule = await SmsSchedule.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedSchedule) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete schedule");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedSchedule;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// Bulk SMS Service
const sendBulkSms = async (payload: any): Promise<any> => {
  const { recipientIds, recipientPhones, ...smsData } = payload;

  const smsPromises = [];

  if (recipientIds && recipientIds.length > 0) {
    for (const recipientId of recipientIds) {
      smsPromises.push(
        Sms.create({
          ...smsData,
          recipientId,
          status: "pending",
        })
      );
    }
  }

  if (recipientPhones && recipientPhones.length > 0) {
    for (const phone of recipientPhones) {
      smsPromises.push(
        Sms.create({
          ...smsData,
          recipientPhone: phone,
          status: "pending",
        })
      );
    }
  }

  const results = await Promise.all(smsPromises);
  return results;
};

// Send SMS to Group Service
const sendGroupSms = async (payload: any): Promise<any> => {
  const { groupId, ...smsData } = payload;

  const group = await SmsGroup.findById(groupId);
  if (!group) {
    throw new AppError(httpStatus.NOT_FOUND, "Group not found");
  }

  const smsPromises = [];

  if (group.members && group.members.length > 0) {
    for (const memberId of group.members) {
      smsPromises.push(
        Sms.create({
          ...smsData,
          recipientId: memberId,
          status: "pending",
        })
      );
    }
  }

  if (group.memberPhones && group.memberPhones.length > 0) {
    for (const phone of group.memberPhones) {
      smsPromises.push(
        Sms.create({
          ...smsData,
          recipientPhone: phone,
          status: "pending",
        })
      );
    }
  }

  const results = await Promise.all(smsPromises);
  return results;
};

export const SmsServices = {
  createSmsIntoDB,
  getAllSmsFromDB,
  getSingleSmsFromDB,
  updateSmsIntoDB,
  deleteSmsFromDB,
  createTemplateIntoDB,
  getAllTemplatesFromDB,
  getSingleTemplateFromDB,
  updateTemplateIntoDB,
  deleteTemplateFromDB,
  createGroupIntoDB,
  getAllGroupsFromDB,
  getSingleGroupFromDB,
  updateGroupIntoDB,
  deleteGroupFromDB,
  createScheduleIntoDB,
  getAllSchedulesFromDB,
  getSingleScheduleFromDB,
  updateScheduleIntoDB,
  deleteScheduleFromDB,
  sendBulkSms,
  sendGroupSms,
};
