import { replaceMongoId } from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { Course } from "@/models/course-model";
import { Module } from "@/models/module.model";
import { Testimonial } from "@/models/testimonial-model";
import { User } from "@/models/user-model";
import { getEnrollmentsForCourse } from "./enrollment";

// Courses List
export async function getCourseList() {
  const courses = await Course.find({})
    .select([
      "title",
      "subTitle",
      "thumbnail",
      "modules",
      "price",
      "category",
      "instructor",
    ])
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();
  return replaceMongoId(courses);
}

// Course Details
export async function getCourseDetails(id) {
  const course = await Course.findById(id)
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "user",
        model: User,
      },
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();
  return replaceMongoId(course);
}

// Course Details by Instructor and instructor details
export async function getCourseDetailsByInstructor(InstructorId) {
  const courses = await Course.find({ Instructor: InstructorId }).lean();

  // enrollments details
  const enrollments = await Promise.all(
    courses.map(async (course) => {
      const enrollment = await getEnrollmentsForCourse(course.id);
      return enrollment;
    })
  );
  const totalEnrollments = enrollments.reduce(
    (item, currentValue) => item.length + currentValue.length
  );

  return {
    courses: courses.length,
    enrollments: totalEnrollments,
  };
}
