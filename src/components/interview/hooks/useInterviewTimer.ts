'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getInterviewTimer, startInterviewTimer } from '@/api/interview';

const MAX_DURATION = 1 * 60 * 60; // 1小时（秒）

export function useInterviewTimer(interviewId?: string, autoStart = false) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [exceeded, setExceeded] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number | null>(null);

    // 从后端获取计时（基于后端存储的开始时间戳计算）
    const fetchTimer = useCallback(async () => {
        if (!interviewId) return;
        try {
            const data = await getInterviewTimer(interviewId);
            if (data.success) {
                setElapsedTime(data.elapsedTime);
                if (data.exceeded) {
                    setExceeded(true);
                    setIsRunning(false);
                }
            }
        } catch (error) {
            console.error('获取计时失败:', error);
        }
    }, [interviewId]);

    // 初始加载
    useEffect(() => {
        if (interviewId && !isLoaded) {
            fetchTimer().then(() => {
                setIsLoaded(true);
            });
        } else if (!interviewId) {
            setIsLoaded(true);
        }
    }, [interviewId, isLoaded, fetchTimer]);

    // 本地计时器（基于本地时间递增，不依赖后端）
    useEffect(() => {
        if (isRunning && !timerRef.current && isLoaded) {
            startTimeRef.current = Date.now() - elapsedTime * 1000;
            
            timerRef.current = setInterval(() => {
                if (startTimeRef.current) {
                    const newTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
                    
                    if (newTime >= MAX_DURATION) {
                        setExceeded(true);
                        setIsRunning(false);
                        setElapsedTime(MAX_DURATION);
                    } else {
                        setElapsedTime(newTime);
                    }
                }
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [isRunning, isLoaded, elapsedTime]);

    const start = useCallback(async () => {
        if (exceeded || !interviewId) return;
        
        // 调用后端开始计时（记录开始时间戳）
        try {
            const data = await startInterviewTimer(interviewId);
            if (data.success) {
                setElapsedTime(data.elapsedTime);
                setIsRunning(true);
            }
        } catch (error) {
            console.error('开始计时失败:', error);
            // 即使后端失败也开始本地计时
            setIsRunning(true);
        }
    }, [exceeded, interviewId]);

    const stop = useCallback(() => {
        setIsRunning(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const reset = useCallback(() => {
        setElapsedTime(0);
        setExceeded(false);
        startTimeRef.current = null;
    }, []);

    const formatTime = useCallback((seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, []);

    return {
        elapsedTime,
        isRunning,
        isLoaded,
        exceeded,
        maxDuration: MAX_DURATION,
        formattedTime: formatTime(elapsedTime),
        start,
        stop,
        reset,
        formatTime,
    };
}
