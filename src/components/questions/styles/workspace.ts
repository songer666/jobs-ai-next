export const workspaceStyles = {
    container: 'flex flex-col h-full p-4 md:p-6',
    header: 'mb-6',
    title: 'text-2xl font-bold text-white mb-1',
    subtitle: 'text-white/60',
    
    // 配置区域
    configSection: 'flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full',
    configCard: 'w-full bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5',
    configTitle: 'text-lg font-semibold text-white text-center mb-4',
    
    label: 'block text-sm font-medium text-white/80 mb-2',
    select: 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50',
    option: 'bg-[#2a2a2a] text-white',
    
    difficultyGroup: 'flex gap-2',
    difficultyButton: 'flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-all',
    difficultyActive: 'border-primary bg-primary/20 text-primary',
    difficultyInactive: 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10',
    
    startButton: `
        w-full mt-6 flex items-center justify-center gap-2 
        px-6 py-4 rounded-xl text-white font-semibold
        bg-gradient-to-r from-primary to-purple-600
        hover:opacity-90 transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
    `,
    
    // 问答区域
    qaSection: 'flex-1 flex flex-col overflow-hidden',
    questionCard: 'bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 mb-4',
    questionHeader: 'flex items-center justify-between mb-3',
    questionLabel: 'text-sm font-medium text-white/60',
    questionBadge: 'text-xs px-2 py-1 rounded-full',
    badgeEasy: 'bg-green-500/20 text-green-400',
    badgeMedium: 'bg-yellow-500/20 text-yellow-400',
    badgeHard: 'bg-red-500/20 text-red-400',
    questionText: 'prose prose-invert prose-sm max-w-none',
    
    answerSection: 'flex-1 flex flex-col min-h-0',
    answerLabel: 'text-sm font-medium text-white/60 mb-2',
    textarea: `
        flex-1 w-full min-h-[150px] p-4 
        bg-white/5 border border-white/10 rounded-xl 
        text-white placeholder:text-white/40 
        focus:outline-none focus:ring-2 focus:ring-primary/50 
        resize-none
    `,
    submitButton: `
        mt-4 flex items-center justify-center gap-2 
        px-6 py-3 rounded-xl text-white font-medium
        bg-gradient-to-r from-primary to-purple-600
        hover:opacity-90 transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
    `,
    
    // 结果区域
    resultSection: 'flex-1 overflow-auto',
    resultGrid: 'grid grid-cols-1 lg:grid-cols-2 gap-4',
    answerCard: 'bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 md:p-6',
    answerCardLabel: 'text-sm font-medium text-blue-400 mb-3',
    answerCardText: 'text-white/80 whitespace-pre-wrap text-sm',
    feedbackCard: 'bg-white/5 border border-white/10 rounded-xl p-4 md:p-6',
    feedbackHeader: 'flex items-center justify-between mb-3',
    feedbackTitle: 'text-lg font-semibold text-white',
    scoreWrapper: 'flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20',
    scoreIcon: 'w-4 h-4 text-primary',
    scoreText: 'text-primary font-bold text-sm',
    feedbackContent: `
        prose prose-invert prose-sm max-w-none overflow-x-auto 
        [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
        [&_th]:border [&_th]:border-white/20 [&_th]:bg-white/10 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left
        [&_td]:border [&_td]:border-white/20 [&_td]:px-3 [&_td]:py-2
        [&_tr:nth-child(even)]:bg-white/5
    `,
    
    newQuestionButton: `
        mt-4 flex items-center justify-center gap-2 
        px-6 py-3 rounded-xl text-white/80 font-medium
        bg-white/10 hover:bg-white/15 transition-all
    `,
    
    // 生成中状态
    generatingWrapper: 'flex-1 flex flex-col items-center justify-center',
    generatingIcon: 'w-12 h-12 text-primary animate-spin mb-4',
    generatingText: 'text-white/60',
    streamingContent: 'mt-6 w-full max-w-2xl bg-white/5 border border-white/10 rounded-xl p-4 prose prose-invert prose-sm max-w-none',
};

export const difficultyStyleMap: Record<string, string> = {
    easy: workspaceStyles.badgeEasy,
    medium: workspaceStyles.badgeMedium,
    hard: workspaceStyles.badgeHard,
};
