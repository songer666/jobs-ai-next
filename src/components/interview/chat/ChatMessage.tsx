"use client";

import { useState, useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, Volume2, VolumeX, Square } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
  language?: string;
}

const styles = {
  messageWrapper: "flex w-full",
  messageWrapperAi: "justify-start",
  messageWrapperUser: "justify-end",
  message: "max-w-[80%] p-4 rounded-2xl",
  aiMessage:
    "bg-gradient-to-r from-[#fd409a]/20 to-[#f5a867]/20 border border-white/10 text-white",
  userMessage: "bg-gradient-to-r from-[#f5a867] to-[#fd409a] text-white",
  messageHeader: "flex items-center justify-between mb-1",
  messageRole: "text-xs text-white/50",
  messageRoleUser: "text-xs text-white/70",
  playButton:
    "p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer",
  playButtonActive:
    "p-1 rounded-full bg-white/20 transition-colors cursor-pointer",
  playIcon: "w-4 h-4",
  messageContent: "prose prose-invert prose-sm max-w-none",
};

export function ChatMessage({
  role,
  content,
  isStreaming,
  language = "zh-CN",
}: ChatMessageProps) {
  const isUser = role === "user";
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(
      typeof window !== "undefined" && "speechSynthesis" in window,
    );
  }, []);

  const handleSpeak = useCallback(() => {
    if (!isSupported || !content.trim()) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = language;
    utterance.rate = 1.1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [isSupported, content, language, isSpeaking]);

  // 组件卸载时停止播放
  useEffect(() => {
    return () => {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSpeaking]);

  return (
    <div
      className={`${styles.messageWrapper} ${isUser ? styles.messageWrapperUser : styles.messageWrapperAi}`}
    >
      <div
        className={`${styles.message} ${isUser ? styles.userMessage : styles.aiMessage}`}
      >
        <div className={styles.messageHeader}>
          {isUser ? (
            <>
              {isSupported && content && (
                <button
                  onClick={handleSpeak}
                  className={
                    isSpeaking ? styles.playButtonActive : styles.playButton
                  }
                  title={isSpeaking ? "停止播放" : "播放语音"}
                >
                  {isSpeaking ? (
                    <Square className={styles.playIcon} />
                  ) : (
                    <Volume2 className={styles.playIcon} />
                  )}
                </button>
              )}
              <span className={styles.messageRoleUser}>你</span>
            </>
          ) : (
            <>
              <span className={styles.messageRole}>AI 面试官</span>
              {isSupported && content && (
                <button
                  onClick={handleSpeak}
                  className={
                    isSpeaking ? styles.playButtonActive : styles.playButton
                  }
                  title={isSpeaking ? "停止播放" : "播放语音"}
                >
                  {isSpeaking ? (
                    <Square className={styles.playIcon} />
                  ) : (
                    <Volume2 className={styles.playIcon} />
                  )}
                </button>
              )}
            </>
          )}
        </div>
        <div className={styles.messageContent}>
          {content ? (
            <ReactMarkdown>{content}</ReactMarkdown>
          ) : isStreaming ? (
            <Loader2 className="w-5 h-5 animate-spin text-white/50" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
