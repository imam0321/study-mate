import { Category } from "@/models/category-model";
import { Course } from "@/models/course-model";

export async function getCourses() {
  const courses = await Course.find().populate({
    path: "category",
    model: Category,
  });
  return courses;
}
