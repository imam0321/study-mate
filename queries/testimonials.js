import { replaceMongoId } from "@/lib/convertData";
import { Testimonial } from "@/models/testimonial-model";

// get testimonials for course Id
export async function getTestimonialForCourse(courseId) {
  const testimonials = await Testimonial.find({ courseId: courseId }).lean();
  return replaceMongoId(testimonials);
}
