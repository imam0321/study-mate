import { replaceMongoId } from "@/lib/convertData";
import { User } from "@/models/user-model";

export async function getUserByEmail(email) {
  const user = await User.findOne({ email: email }).lean();
  return replaceMongoId(user);
}
