export const workspaceStyles = {
  container:
    "flex flex-col h-full w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6",
  header: "mb-6",
  headerTitle: "text-2xl font-bold text-white mb-2",
  headerSubtitle: "text-white/60 text-sm",

  // 配置面板（与 questions 风格统一）
  configSection: "mb-4 sm:mb-6",
  configCard:
    "w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5",
  configPanel:
    "w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5",
  configTitle:
    "text-base sm:text-lg font-semibold text-white text-center mb-3 sm:mb-4",
  configGrid: "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4",
  label: "block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2",
  select:
    "w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#fd409a]/50",
  option: "bg-[#2a2a2a] text-white",
  optionGroup: "flex gap-2",
  optionButton:
    "flex-1 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded-lg border font-medium transition-all",
  optionActive: "border-[#fd409a] bg-[#fd409a]/20 text-[#fd409a]",
  optionInactive: "border-white/10 bg-white/5 text-white/60 hover:bg-white/10",
  switchRow:
    "flex items-center justify-between py-3 px-4 bg-white/5 border border-white/10 rounded-lg",
  switchLabel: "text-white/80 text-sm font-medium",
  switchDesc: "text-white/40 text-xs mt-1",

  // 对话区域
  chatContainer:
    "flex-1 flex flex-col bg-[#1a1528] rounded-xl border border-white/10 overflow-hidden",
  chatMessages: "flex-1 overflow-auto p-4 space-y-4",
  chatInputWrapper: "border-t border-white/10 p-3 sm:p-4",
  chatInputRow: "flex gap-2",
  chatInput:
    "flex-1 bg-[#0d0a14] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#fd409a]/50",

  // 消息气泡
  messageBubble: "max-w-[80%] p-3 rounded-lg",
  messageUser:
    "bg-gradient-to-r from-[#fd409a] to-[#f5a867] text-white ml-auto",
  messageAssistant: "bg-[#0d0a14] border border-white/10 text-white/90",

  // 模板选择
  templateGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
  templateCard:
    "bg-[#0d0a14] border border-white/10 rounded-xl p-4 cursor-pointer transition-all hover:border-[#fd409a]/50",
  templateCardSelected:
    "bg-[#0d0a14] border-2 border-[#fd409a] rounded-xl p-4 cursor-pointer",
  templateName: "text-white font-medium mb-1",
  templateCategory: "text-white/60 text-sm mb-2",
  templateDesc: "text-white/40 text-sm",

  // 生成结果
  resultContainer: "bg-[#1a1528] rounded-xl border border-white/10 p-6",
  resultHeader: "flex items-center justify-between mb-4",
  resultTitle: "text-lg font-semibold text-white",
  resultContent:
    "bg-[#0d0a14] rounded-lg p-4 font-mono text-sm text-white/80 whitespace-pre-wrap max-h-[400px] overflow-auto",

  // 按钮（使用主页渐变色 gradient-btn）
  primaryButton:
    "bg-gradient-to-r from-[#fd409a] to-[#f5a867] text-white font-semibold rounded-lg sm:rounded-xl px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-lg shadow-[#fd409a]/20",
  secondaryButton:
    "bg-white/10 border border-white/10 text-white font-semibold rounded-lg sm:rounded-xl px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base hover:bg-white/20 transition-all cursor-pointer",
  ghostButton:
    "text-white/60 hover:text-white transition-colors cursor-pointer",

  // 状态
  loadingSpinner: "flex items-center justify-center py-8",
  emptyState: "flex flex-col items-center justify-center py-12 text-center",
  emptyIcon: "w-16 h-16 text-white/20 mb-4",
  emptyTitle: "text-white/60 text-lg mb-2",
  emptyDesc: "text-white/40 text-sm",

  // 简历列表
  resumeList: "space-y-4",
  resumeCard:
    "bg-[#0d0a14] border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors",
  resumeCardHeader: "flex items-start justify-between mb-2",
  resumeCardTitle: "text-white font-medium",
  resumeCardDate: "text-white/40 text-sm",
  resumeCardMeta: "flex items-center gap-4 text-sm text-white/60",
  resumeCardActions: "flex gap-2 mt-3",

  // 状态标签
  statusBadge: "px-2 py-1 rounded-full text-xs font-medium",
  statusDraft: "bg-white/10 text-white/60",
  statusGenerated: "bg-[#fd409a]/20 text-[#fd409a]",
  statusOptimized: "bg-[#f5a867]/20 text-[#f5a867]",
};
