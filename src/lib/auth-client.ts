import { createAuthClient } from "better-auth/react";
import { emailOTPClient, usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "",
  basePath: "/api/auth",
  plugins: [emailOTPClient(), usernameClient()],
  fetchOptions: {
    cache: "no-store",
    credentials: "include", // 确保跨域请求携带 cookie
  },
});

export const {
  signIn,
  signUp,
  signOut,
  getSession,
  useSession,
  emailOtp,
  forgetPassword,
  changePassword,
} = authClient;
