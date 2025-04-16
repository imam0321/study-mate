export const LOGIN = "/auth/login";
export const ROOT = process.env.NEXT_PUBLIC_API_URL || "/";

export const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/register/student",
  "/auth/register/instructor",
  "/courses",
  "/api/auth/callback/google",
];
