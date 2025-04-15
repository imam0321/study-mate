import { replaceMongoId } from "@/lib/convertData";
import { User } from "@/models/user-model";
import bcrypt from "bcryptjs";

// find user from email
export async function getUserByEmail(email) {
  const user = await User.findOne({ email: email }).lean();
  return replaceMongoId(user);
}

// password validation check
export async function validatePassword(email, password) {
  const user = await getUserByEmail(email);
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
}
