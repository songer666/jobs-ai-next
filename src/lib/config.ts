// API 和应用配置

export const config = {
    // 后端 API 地址
    apiUrl: process.env.NEXT_PUBLIC_API_URL,

    // 前端应用地址
    appUrl: process.env.NEXT_PUBLIC_APP_URL,

    // Auth 相关路径
    auth: {
        basePath: "/api/auth",
        checkUserPath: "/api/auth/check-user",
    },

    // API 路径
    api: {
        // 用户相关
        profile: "/api/user/profile",
        dashboard: "/api/user/dashboard",

        // 职位信息
        jobInfo: {
            base: "/api/user/job-info",
            list: "/api/user/job-info",
            detail: (id: string) => `/api/user/job-info/${id}`,
        },

        // 面试相关
        interview: {
            base: "/api/user/interview",
            list: "/api/user/interview",
            detail: (id: string) => `/api/user/interview/${id}`,
            usage: "/api/user/interview/usage",
            timer: {
                start: (id: string) => `/api/user/interview/${id}/timer/start`,
                status: (id: string) => `/api/user/interview/${id}/timer/status`,
                end: (id: string) => `/api/user/interview/${id}/timer/end`,
            },
            ai: {
                generateQuestion: "/api/user/interview/generate-question",
                submitAnswer: "/api/user/interview/submit-answer",
            },
        },

        // 题库相关
        question: {
            base: "/api/user/question",
            list: "/api/user/question",
            detail: (id: string) => `/api/user/question/${id}`,
            usage: "/api/user/question/usage",
            generate: "/api/user/question/generate",
            submit: (id: string) => `/api/user/question/${id}/answer`,
        },

        // 简历生成
        resumeGenerator: {
            base: "/api/user/resume-generator",
            resumes: "/api/user/resume-generator/resumes",
            resumeDetail: (id: string) => `/api/user/resume-generator/resumes/${id}`,
            usage: "/api/user/resume-generator/usage",
            defaultStyle: "/api/user/resume-generator/default-style",
            chat: {
                start: "/api/user/resume-generator/chat/start",
                send: (conversationId: string) => `/api/user/resume-generator/chat/${conversationId}`,
            },
            generate: "/api/user/resume-generator/generate",
        },

        // 简历分析
        resumeAnalyzer: {
            base: "/api/user/resume-analyzer",
            analyses: "/api/user/resume-analyzer/analyses",
            analysisDetail: (id: string) => `/api/user/resume-analyzer/analyses/${id}`,
            usage: "/api/user/resume-analyzer/usage",
            analyze: "/api/user/resume-analyzer/analyze",
        },

        // 简历（旧版，保留兼容）
        resume: {
            base: "/api/user/resume",
            list: "/api/user/resume",
            detail: (id: string) => `/api/user/resume/${id}`,
            templates: "/api/user/resume/templates",
            templateDetail: (id: string) => `/api/user/resume/templates/${id}`,
            chat: {
                start: "/api/user/resume/chat/start",
                send: "/api/user/resume/chat",
            },
            generate: "/api/user/resume/generate",
            analyze: (id: string) => `/api/user/resume/${id}/analyze`,
        },

        // 联系消息
        contact: {
            base: "/api/user/contact",
            send: "/api/user/contact",
        },

        // 认证相关
        auth: {
            checkUser: "/api/auth/check-user",
            sendOTP: "/api/auth/send-otp",
        },
    },

    // 回调 URL
    callbacks: {
        dashboard: "/dashboard",
        login: "/login",
        home: "/",
    },
} as const;

// 获取完整的 API URL
// 通过 Next.js rewrites 代理，始终使用相对路径
export function getApiUrl(path: string = ""): string {
    // 始终使用相对路径，让 Next.js rewrites 处理代理
    return path;
}

// 获取 OAuth 回调 URL
export function getOAuthCallbackUrl(path: string = config.callbacks.dashboard): string {
    return `${config.appUrl}${path}`;
}
