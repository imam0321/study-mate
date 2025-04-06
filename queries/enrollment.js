import { replaceMongoId } from "@/lib/convertData";
import { Enrollment } from "@/models/enrollment-model";

// get enrollments by course Id 
export async function getEnrollmentsForCourse(courseId) {
  const enrollments = await Enrollment.find({ course: courseId }).lean();
  return replaceMongoId(enrollments);
}
