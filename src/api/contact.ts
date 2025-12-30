"use client"

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getApiUrl, config } from '@/lib/config';

export interface SendContactMessageRequest {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface SendContactMessageResponse {
    success: boolean;
    message: string;
    data?: {
        id: string;
        createdAt: number;
    };
}

/**
 * 发送联系消息
 */
export function useSendContactMessage() {
    return useMutation({
        mutationFn: async (data: SendContactMessageRequest) => {
            const response = await fetch(getApiUrl(config.api.contact.send), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || '发送失败');
            }

            return response.json() as Promise<SendContactMessageResponse>;
        },
        onSuccess: (data) => {
            toast.success(data.message || '消息发送成功');
        },
        onError: (error: Error) => {
            toast.error(error.message || '发送失败，请稍后重试');
        },
    });
}
