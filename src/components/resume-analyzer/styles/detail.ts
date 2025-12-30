export const detailStyles = {
    container: 'flex flex-col h-full max-w-5xl mx-auto p-4 md:p-6',
    header: 'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6',
    headerLeft: 'flex-1',
    backButton: `
        flex items-center gap-2 px-4 py-2 rounded-xl
        text-white/70 hover:text-white
        bg-white/5 hover:bg-white/10
        border border-white/10 hover:border-white/20
        transition-all duration-200
        mb-3
    `,
    title: 'text-2xl font-bold text-white mb-1',
    subtitle: 'text-white/60',
    
    actions: 'flex items-center gap-3 flex-wrap',
    actionButton: `
        flex items-center gap-2 px-4 py-2 rounded-xl
        text-white/80 hover:text-white
        bg-white/5 hover:bg-white/10
        border border-white/10 hover:border-white/20
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
    `,
    deleteButton: `
        flex items-center gap-2 px-4 py-2 rounded-xl
        text-red-400 hover:text-red-300
        bg-red-500/10 hover:bg-red-500/20
        border border-red-500/20 hover:border-red-500/30
        transition-all duration-200
    `,
    
    content: 'flex-1 overflow-auto space-y-4',
    
    metaCard: 'bg-white/5 border border-white/10 rounded-xl p-4',
    metaGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
    metaItem: 'space-y-1',
    metaLabel: 'text-white/60 text-sm',
    metaValue: 'text-white font-medium',
    
    scoreCard: `
        bg-gradient-to-r from-[#fd409a]/10 to-[#f5a867]/10
        border border-[#fd409a]/20
        rounded-xl p-6
        text-center
    `,
    scoreLabel: 'text-white/60 text-sm mb-2',
    scoreValue: 'text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fd409a] to-[#f5a867]',
    scoreMax: 'text-white/40 text-lg ml-2',
    
    feedbackCard: 'bg-white/5 border border-white/10 rounded-xl p-6',
    feedbackHeader: 'flex items-center justify-between mb-4',
    feedbackTitle: 'text-lg font-semibold text-white',
    feedbackContent: `
        prose prose-invert prose-sm max-w-none
        [&_h1]:text-white [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-3
        [&_h2]:text-white [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-2 [&_h2]:mt-4
        [&_h3]:text-white/90 [&_h3]:text-base [&_h3]:font-medium [&_h3]:mb-2
        [&_p]:text-white/80 [&_p]:leading-relaxed [&_p]:mb-3
        [&_ul]:text-white/80 [&_ul]:space-y-1
        [&_ol]:text-white/80 [&_ol]:space-y-1
        [&_li]:text-white/80
        [&_strong]:text-white [&_strong]:font-semibold
        [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[#fd409a]
        [&_pre]:bg-white/5 [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-lg [&_pre]:p-4
        [&_blockquote]:border-l-4 [&_blockquote]:border-[#fd409a]/50 [&_blockquote]:pl-4 [&_blockquote]:text-white/70
    `,
    
    streamingIndicator: `
        flex items-center gap-2 px-4 py-2 rounded-lg
        bg-[#fd409a]/10 border border-[#fd409a]/20
        text-[#fd409a] text-sm
    `,
    
    loading: 'flex-1 flex items-center justify-center',
    loadingContainer: 'flex items-center justify-center min-h-[400px]',
    emptyState: 'flex-1 flex flex-col items-center justify-center text-center py-12',
    emptyIcon: 'w-16 h-16 text-white/20 mb-4',
    emptyTitle: 'text-white/60 text-lg mb-2',
    emptyDesc: 'text-white/40 text-sm',
    
    card: 'bg-white/5 border border-white/10 rounded-xl p-6 mb-6',
    cardTitle: 'text-xl font-bold text-white mb-4',
    meta: 'flex flex-wrap gap-6 mb-4',
    scoreContainer: 'flex items-center gap-3 mb-6',
    scoreBadge: 'flex items-center gap-2 px-4 py-2 rounded-full text-lg font-bold',
};
