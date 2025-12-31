"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { config, getApiUrl } from "@/lib/config";
import { useRouter } from "@/i18n/navigation";

// ==================== Types ====================

export type ExperienceLevel = "junior" | "mid-level" | "senior";

export interface GoalPosition {
  id: string;
  userId: string | null;
  isPublic: boolean;
  name: string;
  title: string | null;
  description: string;
  experienceLevel: ExperienceLevel;
  createdAt: string | number;
  updatedAt: string | number;
  isOwner?: boolean;
}

export interface CreateGoalPositionData {
  name: string;
  title?: string;
  description: string;
  experienceLevel: ExperienceLevel;
  isPublic?: boolean;
}

export interface UpdateGoalPositionData {
  name?: string;
  title?: string;
  description?: string;
  experienceLevel?: ExperienceLevel;
  isPublic?: boolean;
}

interface GoalPositionListResponse {
  success: boolean;
  jobInfos: GoalPosition[];
}

interface GoalPositionResponse {
  success: boolean;
  jobInfo: GoalPosition;
}

// ==================== 获取职位列表 ====================

export function useGoalPositions(includePublic = false) {
  return useQuery({
    queryKey: ["goalPositions", includePublic],
    queryFn: async () => {
      const url = includePublic
        ? `${getApiUrl(config.api.jobInfo.list)}?includePublic=true`
        : getApiUrl(config.api.jobInfo.list);

      const response = await fetch(url, {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("未登录");
        }
        throw new Error("获取目标职位失败");
      }

      const data: GoalPositionListResponse = await response.json();
      return data.jobInfos || [];
    },
    staleTime: 0, // 立即过期，每次都重新获取
    gcTime: 5 * 60 * 1000, // 5分钟后清除缓存
  });
}

// ==================== 获取单个职位 ====================

export function useGoalPosition(id: string | undefined) {
  return useQuery({
    queryKey: ["goalPosition", id],
    queryFn: async () => {
      if (!id) throw new Error("职位 ID 不能为空");
      const response = await fetch(getApiUrl(config.api.jobInfo.detail(id)), {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("未登录");
        }
        if (response.status === 404) {
          throw new Error("职位不存在");
        }
        throw new Error("获取职位详情失败");
      }

      const data: GoalPositionResponse = await response.json();
      return data.jobInfo;
    },
    enabled: !!id,
    staleTime: Infinity, // 永不过期，只有手动 invalidate 才会重新请求
  });
}

// ==================== 创建职位 ====================

export function useCreateGoalPosition() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateGoalPositionData) => {
      const response = await fetch(getApiUrl(config.api.jobInfo.base), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("未登录");
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "创建职位失败");
      }

      const result: GoalPositionResponse = await response.json();
      return result.jobInfo;
    },
    onSuccess: async () => {
      // 先显示成功提示
      toast.success("创建成功");
      // 重新获取数据并等待完成
      await queryClient.refetchQueries({ queryKey: ["goalPositions"] });
      // 数据刷新完成后再导航
      router.push("/dashboard/goal-position");
    },
    onError: (error: Error) => {
      toast.error(error.message || "创建失败，请重试");
    },
  });
}

// ==================== 更新职位 ====================

export function useUpdateGoalPosition() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateGoalPositionData;
    }) => {
      const response = await fetch(getApiUrl(config.api.jobInfo.detail(id)), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("未登录");
        }
        if (response.status === 403) {
          throw new Error("无权限修改此职位");
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "更新职位失败");
      }

      const result: GoalPositionResponse = await response.json();
      return result.jobInfo;
    },
    onSuccess: async (_, variables) => {
      // 先显示成功提示
      toast.success("更新成功");
      // 重新获取数据并等待完成
      await queryClient.refetchQueries({ queryKey: ["goalPositions"] });
      await queryClient.refetchQueries({
        queryKey: ["goalPosition", variables.id],
      });
      // 数据刷新完成后再导航
      router.push("/dashboard/goal-position");
    },
    onError: (error: Error) => {
      toast.error(error.message || "更新失败，请重试");
    },
  });
}

// ==================== 删除职位 ====================

export function useDeleteGoalPosition() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(getApiUrl(config.api.jobInfo.detail(id)), {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("未登录");
        }
        if (response.status === 403) {
          throw new Error("无权限删除此职位");
        }
        throw new Error("删除职位失败");
      }
    },
    onSuccess: async (_) => {
      // 先显示成功提示
      toast.success("删除成功");
      // 重新获取数据并等待完成
      await queryClient.refetchQueries({ queryKey: ["goalPositions"] });
      // 数据刷新完成后再导航
      router.push("/dashboard/goal-position");
    },
    onError: (error: Error) => {
      toast.error(error.message || "删除失败，请重试");
    },
  });
}
