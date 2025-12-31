"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  signIn,
  signOut,
  emailOtp,
  forgetPassword,
  getSession,
} from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { config, getApiUrl, getOAuthCallbackUrl } from "@/lib/config";

// ==================== Zod Schemas ====================

export const emailSchema = z.string().email("请输入有效的邮箱地址");

export const passwordSchema = z.string().min(6, "密码至少需要6个字符");

export const nameSchema = z.string().min(1, "请输入你的姓名");

// GitHub OAuth 登录
export function useGitHubLogin() {
  return useMutation({
    mutationFn: async () => {
      const result = await signIn.social({
        provider: "github",
        callbackURL: getOAuthCallbackUrl(config.callbacks.dashboard),
      });
      if (result.error) {
        throw new Error(result.error.message || "GitHub登录失败");
      }
      return result.data;
    },
    onError: (error: Error) => {
      toast.error(error.message || "GitHub登录失败");
    },
  });
}

// 发送登录OTP验证码（先检查用户是否存在）
export function useSendLoginOTP() {
  return useMutation({
    mutationFn: async (email: string) => {
      // 先检查用户是否存在
      const checkResponse = await fetch(getApiUrl(config.api.auth.checkUser), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      const checkData = await checkResponse.json();

      if (!checkResponse.ok) {
        throw new Error(checkData.error || "检查用户失败");
      }

      if (!checkData.exists) {
        throw new Error("该邮箱尚未注册，请先注册账号");
      }

      // 用户存在，发送验证码
      const result = await emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      });
      if (result.error) {
        throw new Error(result.error.message || "发送验证码失败");
      }
      return result.data;
    },
    onSuccess: () => {
      toast.success("验证码已发送到您的邮箱");
    },
    onError: (error: Error) => {
      toast.error(error.message || "发送验证码失败，请重试");
    },
  });
}

// 使用OTP登录
interface LoginWithOTPData {
  email: string;
  password: string;
  otp: string;
}

export function useLoginWithOTP() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginWithOTPData) => {
      // 使用 signIn.emailOtp 验证 OTP 并登录（因为发送的是 sign-in 类型的 OTP）
      const result = await signIn.emailOtp({
        email: data.email,
        otp: data.otp,
      });
      if (result.error) {
        throw new Error(result.error.message || "验证码错误或登录失败");
      }
      return result.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("登录成功");
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "登录失败，请重试");
    },
  });
}

// ==================== 注册相关 ====================

// 发送注册邮箱验证码
// 注意：对于新用户注册，必须使用 type: "sign-in"，因为 better-auth 对不存在的用户 + email-verification 会跳过发送
export function useSendRegisterOTP() {
  return useMutation({
    mutationFn: async (email: string) => {
      const result = await emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      });
      if (result.error) {
        throw new Error(result.error.message || "发送验证码失败");
      }
      return result.data;
    },
    onSuccess: () => {
      toast.success("验证码已发送到您的邮箱");
    },
    onError: (error: Error) => {
      toast.error(error.message || "发送验证码失败，请重试");
    },
  });
}

// 验证邮箱OTP并完成注册
interface RegisterWithOTPData {
  name: string;
  email: string;
  password: string;
  otp: string;
}

export function useRegisterWithOTP() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterWithOTPData) => {
      // 使用 signIn.emailOtp 验证 OTP 并创建/登录用户
      // better-auth 的 emailOTP 插件会自动处理用户不存在的情况（如果 disableSignUp 为 false）
      const result = await signIn.emailOtp({
        email: data.email,
        otp: data.otp,
      });
      if (result.error) {
        throw new Error(result.error.message || "验证码错误或注册失败");
      }
      return result.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("注册成功");
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "注册失败，请重试");
    },
  });
}

// ==================== 忘记密码相关 ====================

// 发送忘记密码OTP验证码
// 使用 forgetPassword.emailOtp API，它会自动使用 forget-password 类型
export function useSendOTP() {
  return useMutation({
    mutationFn: async (email: string) => {
      const result = await forgetPassword.emailOtp({
        email,
      });
      if (result.error) {
        throw new Error(result.error.message || "发送验证码失败");
      }
      return result.data;
    },
    onSuccess: () => {
      toast.success("验证码已发送到您的邮箱");
    },
    onError: (error: Error) => {
      toast.error(error.message || "发送验证码失败，请重试");
    },
  });
}

// 重置密码
interface ResetPasswordData {
  email: string;
  otp: string;
  newPassword: string;
}

export function useResetPassword() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const result = await emailOtp.resetPassword({
        email: data.email,
        otp: data.otp,
        password: data.newPassword,
      });
      if (result.error) {
        throw new Error(result.error.message || "重置密码失败");
      }
      return result.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("密码重置成功");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "重置密码失败，请重试");
    },
  });
}

// ==================== 登出 ====================

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const result = await signOut();
      if (result.error) {
        throw new Error(result.error.message || "登出失败");
      }
      return result.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("已退出登录");
      router.push("/login");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "登出失败");
    },
  });
}

// ==================== Session ====================

export function useCurrentSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const result = await getSession();
      return result.data;
    },
    staleTime: 10 * 60 * 1000, // 10分钟
  });
}
