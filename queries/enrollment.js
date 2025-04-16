import { replaceMongoId } from "@/lib/convertData";
import { Course } from "@/models/course-model";
import { Enrollment } from "@/models/enrollment-model";

// get enrollments for course Id
export async function getEnrollmentsForCourse(courseId) {
  const enrollments = await Enrollment.find({ course: courseId }).lean();
  return replaceMongoId(enrollments);
}

// get enrollments for user
export async function getEnrollmentsForUser(userId) {
  try {
    const enrollments = await Enrollment.find({ student: userId })
      .populate({
        path: "course",
        module: Course,
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
