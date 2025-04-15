"use server";
import { User } from "@/models/user-model";
import { revalidatePath } from "next/cache";

// update user info
export async function updateUserInfo(email, updateData) {
  try {
    const filter = { email: email };
    await User.findOneAndUpdate(filter, updateData);
    revalidatePath("/account");
  } catch (error) {
    throw new Error(error);
  }
}
