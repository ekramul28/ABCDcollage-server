import { Schema, model } from "mongoose";
import {
  ResultModel,
  GradeModel,
  ExamModel,
  TResult,
  TGradeRecord,
  TExam,
} from "./result.interface";
import { ResultStatus, ResultType } from "./result.constant";

// Result Schema
const resultSchema = new Schema<TResult, ResultModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course ID is required"],
    },
    examId: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
    },
    type: {
      type: String,
      enum: {
        values: ResultType,
        message: "{VALUE} is not a valid result type",
      },
      required: [true, "Type is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title can not be more than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    score: {
      type: Number,
      required: [true, "Score is required"],
      min: [0, "Score cannot be negative"],
    },
    totalMarks: {
      type: Number,
      required: [true, "Total marks is required"],
      min: [1, "Total marks must be at least 1"],
    },
    percentage: {
      type: Number,
      required: [true, "Percentage is required"],
      min: [0, "Percentage cannot be negative"],
      max: [100, "Percentage cannot exceed 100"],
    },
    grade: {
      type: String,
      enum: {
        values: [
          "A+",
          "A",
          "A-",
          "B+",
          "B",
          "B-",
          "C+",
          "C",
          "C-",
          "D+",
          "D",
          "F",
        ],
        message: "{VALUE} is not a valid grade",
      },
      required: [true, "Grade is required"],
    },
    status: {
      type: String,
      enum: {
        values: ResultStatus,
        message: "{VALUE} is not a valid status",
      },
      default: "draft",
    },
    submittedAt: {
      type: Date,
      required: [true, "Submission date is required"],
    },
    gradedAt: {
      type: Date,
    },
    gradedBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
    feedback: {
      type: String,
      trim: true,
      maxlength: [1000, "Feedback can not be more than 1000 characters"],
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

// Grade Schema
const gradeSchema = new Schema<TGradeRecord, GradeModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course ID is required"],
    },
    semester: {
      type: String,
      required: [true, "Semester is required"],
      trim: true,
    },
    academicYear: {
      type: String,
      required: [true, "Academic year is required"],
      trim: true,
    },
    grade: {
      type: String,
      enum: {
        values: [
          "A+",
          "A",
          "A-",
          "B+",
          "B",
          "B-",
          "C+",
          "C",
          "C-",
          "D+",
          "D",
          "F",
        ],
        message: "{VALUE} is not a valid grade",
      },
      required: [true, "Grade is required"],
    },
    gpa: {
      type: Number,
      required: [true, "GPA is required"],
      min: [0, "GPA cannot be negative"],
      max: [4, "GPA cannot exceed 4"],
    },
    totalCredits: {
      type: Number,
      required: [true, "Total credits is required"],
      min: [0, "Total credits cannot be negative"],
    },
    earnedCredits: {
      type: Number,
      required: [true, "Earned credits is required"],
      min: [0, "Earned credits cannot be negative"],
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

// Exam Schema
const examSchema = new Schema<TExam, ExamModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title can not be more than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course ID is required"],
    },
    type: {
      type: String,
      enum: {
        values: ResultType,
        message: "{VALUE} is not a valid exam type",
      },
      required: [true, "Type is required"],
    },
    date: {
      type: Date,
      required: [true, "Exam date is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 minute"],
    },
    totalMarks: {
      type: Number,
      required: [true, "Total marks is required"],
      min: [1, "Total marks must be at least 1"],
    },
    passingMarks: {
      type: Number,
      required: [true, "Passing marks is required"],
      min: [0, "Passing marks cannot be negative"],
    },
    instructions: {
      type: String,
      trim: true,
      maxlength: [1000, "Instructions can not be more than 1000 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ResultStatus,
        message: "{VALUE} is not a valid status",
      },
      default: "draft",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Created by is required"],
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

// Pre-save middleware to calculate percentage
resultSchema.pre("save", function (next) {
  if (this.isModified("score") || this.isModified("totalMarks")) {
    this.percentage = (this.score / this.totalMarks) * 100;
  }
  next();
});

// Static method to check if result exists
resultSchema.statics.isResultExists = async function (id: string) {
  const existingResult = await Result.findOne({ id, isDeleted: false });
  return existingResult;
};

// Static method to check if grade exists
gradeSchema.statics.isGradeExists = async function (id: string) {
  const existingGrade = await Grade.findOne({ id, isDeleted: false });
  return existingGrade;
};

// Static method to check if exam exists
examSchema.statics.isExamExists = async function (id: string) {
  const existingExam = await Exam.findOne({ id, isDeleted: false });
  return existingExam;
};

// Filter deleted documents
const filterDeleted = function (this: any, next: any) {
  this.find({ isDeleted: false });
  next();
};

const filterDeletedOne = function (this: any, next: any) {
  this.findOne({ isDeleted: false });
  next();
};

const filterDeletedAggregate = function (this: any, next: any) {
  this.pipeline().unshift({ $match: { isDeleted: false } });
  next();
};

// Apply filters to all queries
resultSchema.pre("find", filterDeleted);
resultSchema.pre("findOne", filterDeletedOne);
resultSchema.pre("aggregate", filterDeletedAggregate);

gradeSchema.pre("find", filterDeleted);
gradeSchema.pre("findOne", filterDeletedOne);
gradeSchema.pre("aggregate", filterDeletedAggregate);

examSchema.pre("find", filterDeleted);
examSchema.pre("findOne", filterDeletedOne);
examSchema.pre("aggregate", filterDeletedAggregate);

export const Result = model<TResult, ResultModel>("Result", resultSchema);
export const Grade = model<TGradeRecord, GradeModel>("Grade", gradeSchema);
export const Exam = model<TExam, ExamModel>("Exam", examSchema);
