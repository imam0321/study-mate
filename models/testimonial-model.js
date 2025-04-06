import mongoose, { Schema } from "mongoose";
import { User } from "./user-model";

const testimonialSchema = new Schema({
  content: {
    required: true,
    type: String,
  },
  user: {
    type: Schema.ObjectId,
    ref: User,
  },
  courseId: {
    required: true,
    type: String,
  },
  rating: {
    required: true,
    type: Number,
  },
});

export const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);
