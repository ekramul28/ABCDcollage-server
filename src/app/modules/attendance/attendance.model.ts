import { Schema, model } from "mongoose";
import { AttendanceStatus } from "./attendance.constant";
import { AttendanceModel, TAttendance } from "./attendance.interface";

const attendanceSchema = new Schema<TAttendance, AttendanceModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      required: [true, "Student ID is required"],
      ref: "Student",
    },
    course: {
      type: Schema.Types.ObjectId,
      required: [true, "Course ID is required"],
      ref: "Course",
    },
    teacher: {
      type: Schema.Types.ObjectId,
      required: [true, "Teacher ID is required"],
      ref: "Teacher",
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    status: {
      type: String,
      enum: {
        values: AttendanceStatus,
        message: "{VALUE} is not a valid attendance status",
      },
      required: [true, "Status is required"],
    },
    remarks: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// filter out deleted documents
attendanceSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

attendanceSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

attendanceSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if attendance is already exist!
attendanceSchema.statics.isAttendanceExists = async function (id: string) {
  const existingAttendance = await Attendance.findOne({ id });
  return existingAttendance;
};

export const Attendance = model<TAttendance, AttendanceModel>(
  "Attendance",
  attendanceSchema
);
