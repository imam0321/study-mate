import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { User } from "./models/user-model";
import { authConfig } from "./auth.config";

// async function refreshAccessToken(token) {
//   try {
//     const url =
//       "https://oauth2.googleapis.com/token?" +
//       new URLSearchParams({
//         client_id: process.env.GOOGLE_CLIENT_ID,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET,
//         grant_type: "refresh_token",
//         refresh_token: token?.refreshToken,
//       });

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       }      
//     });

//     const refreshTokens = await response.json();

//     if (!response.ok) {
//       throw refreshAccessToken;
//     }

//     return {
//       ...token,
//       accessToken: refreshTokens?.access_token,
//       accessTokenExpires: Date.now() + refreshTokens?.expires_in * 1000,
//       refreshToken: refreshTokens?.refresh_token,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
  ...authConfig,
  providers: [
    // credentials login
    CredentialsProvider({
      async authorize(credentials) {
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
    // google base login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     if (account && user) {
  //       return {
  //         accessToken: account?.access_token,
  //         accessTokenExpires: Date.now() + account?.expires_in * 1000,
  //         refreshToken: account?.refresh_token,
  //         user,
  //       };
  //     }

  //     if (Date.now() < token?.accessToken) {
  //       return token;
  //     }

  //     return refreshAccessToken(token);
  //   },
  //   async session({ session, token }) {
  //     session.user = token?.user;
  //     session.accessToken = token?.access_token;
  //     session.error = token?.error;

  //     return session;
  //   },
  // },
});
