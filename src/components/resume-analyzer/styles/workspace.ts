export const analyzerStyles = {
    container: 'flex flex-col h-full w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6',
    header: 'mb-6',
    headerTitle: 'text-2xl font-bold text-white mb-2',
    headerSubtitle: 'text-white/60 text-sm',
    
    // 配置区域（与 questions 风格统一）
    configSection: 'flex-1 flex flex-col items-center justify-center w-full mb-4 sm:mb-6',
    configCard: 'w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5',
    configTitle: 'text-base sm:text-lg font-semibold text-white text-center mb-3 sm:mb-4',
    label: 'block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2',
    select: 'w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#fd409a]/50',
    option: 'bg-[#2a2a2a] text-white',
    optionGroup: 'flex gap-2',
    optionButton: 'flex-1 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded-lg border font-medium transition-all',
    optionActive: 'border-[#fd409a] bg-[#fd409a]/20 text-[#fd409a]',
    optionInactive: 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10',
    
    // 上传区域
    uploadCard: 'bg-[#1a1528] rounded-xl border border-white/10 p-4 sm:p-6',
    uploadTitle: 'text-base sm:text-lg font-semibold text-white mb-2',
    uploadDesc: 'text-white/60 text-xs sm:text-sm mb-4 sm:mb-6',
    
    uploadZone: 'border-2 border-dashed border-white/20 rounded-lg sm:rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-[#fd409a]/50 hover:bg-white/5 transition-all',
    uploadZoneActive: 'border-2 border-dashed border-[#fd409a] rounded-lg sm:rounded-xl p-6 sm:p-8 text-center bg-[#fd409a]/10',
    uploadIcon: 'w-10 h-10 sm:w-12 sm:h-12 text-white/30 mx-auto mb-2 sm:mb-3',
    uploadText: 'text-sm sm:text-base text-white/60 mb-1',
    uploadHint: 'text-xs sm:text-sm text-white/40',
    
    // 已选文件
    filePreview: 'flex items-center gap-4 p-4 bg-[#0d0a14] rounded-xl border border-white/10',
    fileIcon: 'w-10 h-10 text-[#fd409a]',
    fileInfo: 'flex-1 min-w-0',
    fileName: 'text-white font-medium truncate',
    fileSize: 'text-white/40 text-sm',
    fileRemove: 'p-2 text-white/40 hover:text-red-400 transition-colors',
    
    // 职位描述
    jobDescSection: 'mt-4 sm:mt-6',
    jobDescLabel: 'text-sm sm:text-base text-white font-medium mb-1.5 sm:mb-2 block',
    jobDescTextarea: 'w-full bg-[#0d0a14] border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#fd409a]/50 min-h-[100px] sm:min-h-[120px] resize-none',
    
    // 分析按钮（橙红色渐变配色）
    analyzeButton: 'mt-6 w-full bg-gradient-to-r from-[#fd409a] to-[#f5a867] text-white font-semibold rounded-full px-6 py-3 hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[#fd409a]/25',
    
    // 结果区域
    resultCard: 'bg-[#1a1528] rounded-xl border border-white/10 p-6 mt-6',
    resultHeader: 'flex items-center justify-between mb-4',
    resultTitle: 'text-lg font-semibold text-white',
    resultContent: 'prose prose-invert prose-sm max-w-none',
    resultText: 'bg-[#0d0a14] rounded-lg p-4 text-white/80 whitespace-pre-wrap max-h-[500px] overflow-auto',
    
    // 状态
    loadingSpinner: 'flex items-center justify-center py-8',
    
    // 按钮（橙红色渐变配色）
    primaryButton: 'bg-gradient-to-r from-[#fd409a] to-[#f5a867] text-white font-semibold rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-[#fd409a]/25',
    secondaryButton: 'bg-white/10 border border-white/10 text-white font-semibold rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base hover:bg-white/20 transition-all',
};
