export const detailStyles = {
  container: "flex flex-col h-full p-4 md:p-6",
  header: "flex items-center justify-between mb-6",
  headerLeft: "flex-1",
  title: "text-2xl font-bold text-white mb-1",
  subtitle: "text-white/60",
  deleteButton: `
        p-2 rounded-lg text-white/40 hover:text-red-400 
        hover:bg-red-500/10 transition-colors
    `,

  content: "flex-1 overflow-auto space-y-4",

  questionCard: "bg-white/5 border border-white/10 rounded-xl p-4 md:p-6",
  questionHeader: "flex items-center justify-between mb-3",
  questionLabel: "text-sm font-medium text-white/60",
  questionBadge: "text-xs px-2 py-1 rounded-full",
  badgeEasy: "bg-green-500/20 text-green-400",
  badgeMedium: "bg-yellow-500/20 text-yellow-400",
  badgeHard: "bg-red-500/20 text-red-400",
  questionText: "prose prose-invert prose-sm max-w-none",

  answerSection: "space-y-3",
  answerLabel: "text-sm font-medium text-white/60",
  textarea: `
        w-full min-h-[150px] p-4 
        bg-white/5 border border-white/10 rounded-xl 
        text-white placeholder:text-white/40 
        focus:outline-none focus:ring-2 focus:ring-primary/50 
        resize-y
    `,
  submitButton: `
        flex items-center justify-center gap-2 
        px-6 py-3 rounded-xl text-white font-medium
        bg-gradient-to-r from-primary to-purple-600
        hover:opacity-90 transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
    `,

  resultGrid: "grid grid-cols-1 lg:grid-cols-2 gap-4",
  answerCard: "bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 md:p-6",
  answerCardLabel: "text-sm font-medium text-blue-400 mb-3",
  answerCardText: "text-white/80 whitespace-pre-wrap text-sm",
  feedbackCard: "bg-white/5 border border-white/10 rounded-xl p-4 md:p-6",
  feedbackHeader: "flex items-center justify-between mb-3",
  feedbackTitle: "text-lg font-semibold text-white",
  scoreWrapper:
    "flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20",
  scoreIcon: "w-4 h-4 text-primary",
  scoreText: "text-primary font-bold text-sm",
  feedbackContent: `
        prose prose-invert prose-sm max-w-none overflow-x-auto 
        [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
        [&_th]:border [&_th]:border-white/20 [&_th]:bg-white/10 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left
        [&_td]:border [&_td]:border-white/20 [&_td]:px-3 [&_td]:py-2
        [&_tr:nth-child(even)]:bg-white/5
    `,

  loading: "flex-1 flex items-center justify-center",
  error: "flex-1 flex flex-col items-center justify-center text-white/60",
  errorIcon: "w-12 h-12 mb-4 opacity-50",
};

export const difficultyStyleMap: Record<string, string> = {
  easy: detailStyles.badgeEasy,
  medium: detailStyles.badgeMedium,
  hard: detailStyles.badgeHard,
};
