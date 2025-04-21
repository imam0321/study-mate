import { replaceMongoId } from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { Course } from "@/models/course-model";
import { Module } from "@/models/module.model";
import { Testimonial } from "@/models/testimonial-model";
import { User } from "@/models/user-model";
import { getEnrollmentsForCourse } from "./enrollment";
import { getTestimonialForCourse } from "./testimonials";

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
export async function getCourseDetailsByInstructor(instructorId) {
  const courses = await Course.find({ instructor: instructorId }).lean();

  // enrollments counts
  const enrollments = await Promise.all(
    courses.map(async (course) => {
      const enrollment = await getEnrollmentsForCourse(course._id.toString());
      return enrollment;
    })
  );
  const totalEnrollments = enrollments.reduce((acc, obj) => {
    return acc + obj.length;
  }, 0);

  // grouped By Courses
  const groupedByCourses = enrollments.flat().reduce((acc, item) => {
    const key = item.course;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  // Total revenue
  const totalRevenue = courses.reduce((acc, course) => {
    return acc + groupedByCourses[course?._id].length * course.price;
  }, 0);

  // testimonials counts
  const testimonials = await Promise.all(
    courses.map(async (course) => {
      const testimonial = await getTestimonialForCourse(course._id.toString());
      return testimonial;
    })
  );
  // Multiple nested array to convert one array using flat
  const totalTestimonials = testimonials.flat();

  // Average Rating
  const avgRating =
    totalTestimonials.reduce((acc, obj) => {
      return acc + obj.rating;
    }, 0) / totalTestimonials.length;

  return {
    courses: courses.length,
    enrollments: totalEnrollments,
    reviews: totalTestimonials.length,
    ratings: avgRating.toPrecision(2),
    revenue: totalRevenue,
  };
}
