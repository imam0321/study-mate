import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "./models/user-model";
import { dbConnect } from "./service/mongo";


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  providers: [
    // credentials login
    CredentialsProvider({
      async authorize(credentials) {
        await dbConnect();
        if (credentials == null) return null;

        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials?.password,
              user?.password
            );
            if (!isMatch) {
              throw new Error("Password not match");
            }
            return user;
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
});
