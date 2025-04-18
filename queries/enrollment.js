import { replaceMongoId } from "@/lib/convertData";
import { Course } from "@/models/course-model";
import { Enrollment } from "@/models/enrollment-model";
import { model } from "mongoose";

// get enrollments for course Id
export async function getEnrollmentsForCourse(courseId) {
  const enrollments = await Enrollment.find({ course: courseId }).lean();
  return replaceMongoId(enrollments);
}

// check the enrollment courses by user
export async function hasEnrollmentsForCourse(courseId, studentId) {
  const enrollment = await Enrollment.findOne({
    course: courseId,
    student: studentId,
  })
    .populate({
      path: "course",
      model: Course,
    })
    .lean();

  if (!enrollment) {
    return false;
  } else {
    return true;
  }
}

// get enrollments for user
export async function getEnrollmentsForUser(userId) {
  try {
    const enrollments = await Enrollment.find({ student: userId })
      .populate({
        path: "course",
        model: Course,
      })
      .lean();
    return replaceMongoId(enrollments);
  } catch (error) {
    throw new Error(error);
  }
}

// enrollment course
export async function enrollForCourse(courseId, userId, paymentMethod) {
  const newEnrollment = {
    course: courseId,
    student: userId,
    method: paymentMethod,
    enrollment_date: Date.now(),
    status: "not-started",
  };

  try {
    const response = await Enrollment.create(newEnrollment);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
