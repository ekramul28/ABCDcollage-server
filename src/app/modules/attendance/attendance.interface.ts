import { Model, Types } from "mongoose";

export type TAttendanceStatus = "present" | "absent" | "late" | "excused";

export type TAttendance = {
  id: string;
  student: Types.ObjectId;
  course: Types.ObjectId;
  teacher: Types.ObjectId;
  date: Date;
  status: TAttendanceStatus;
  remarks?: string;
  isDeleted: boolean;
};

export interface AttendanceModel extends Model<TAttendance> {
  // eslint-disable-next-line no-unused-vars
  isAttendanceExists(id: string): Promise<TAttendance | null>;
}
