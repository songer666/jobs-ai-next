'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseSpeechRecognitionOptions {
    language?: string;
    onResult?: (transcript: string) => void;
}

export function useSpeechRecognition({ language = 'zh-CN', onResult }: UseSpeechRecognitionOptions = {}) {
    const [isRecording, setIsRecording] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        setIsSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language;

        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                }
            }
            if (finalTranscript && onResult) {
                onResult(finalTranscript);
            }
        };

        recognition.onerror = (event) => {
            console.error('语音识别错误:', event.error);
            setIsRecording(false);
        };

        recognition.onend = () => {
            // 如果还在录音状态，自动重启
            if (recognitionRef.current && isRecording) {
                try {
                    recognitionRef.current.start();
                } catch {
                    // 忽略错误
                }
            }
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [language]);

    const startRecording = useCallback(() => {
        if (!recognitionRef.current) return;
        try {
            recognitionRef.current.start();
            setIsRecording(true);
        } catch {
            // 忽略错误
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (!recognitionRef.current) return;
        recognitionRef.current.stop();
        setIsRecording(false);
    }, []);

    const toggleRecording = useCallback(() => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    }, [isRecording, startRecording, stopRecording]);

    return {
        isRecording,
        isSupported,
        startRecording,
        stopRecording,
        toggleRecording,
    };
}
