"use server";
import { User } from "@/models/user-model";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { validatePassword } from "@/queries/users";

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

// password change
export async function passwordChange(email, oldPassword, newPassword) {
  const isMatch = await validatePassword(email, oldPassword);

  if (!isMatch) throw new Error("Please enter a valid Password");
  const filter = { email: email };

  try {
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const dataToUpdate = {
      password: hashPassword,
    };

    await User.findOneAndUpdate(filter, dataToUpdate);
    revalidatePath("/account");
  } catch (error) {
    throw new Error(error);
  }
}
