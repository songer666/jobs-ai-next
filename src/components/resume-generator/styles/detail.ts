export const detailStyles = {
    container: 'flex flex-col h-full max-w-5xl mx-auto p-4 md:p-6',
    header: 'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6',
    headerLeft: 'flex items-center gap-3',
    backButton: `
        flex items-center gap-2 px-4 py-2 rounded-xl
        text-white/70 hover:text-white
        bg-white/5 hover:bg-white/10
        border border-white/10 hover:border-white/20
        transition-all duration-200
    `,
    title: 'text-2xl font-bold text-white',
    
    actions: 'flex items-center gap-3 flex-wrap',
    actionButton: `
        flex items-center gap-2 px-4 py-2 rounded-xl
        text-white/80 hover:text-white
        bg-white/5 hover:bg-white/10
        border border-white/10 hover:border-white/20
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
    `,
    downloadButton: `
        flex items-center gap-2 px-6 py-2.5 rounded-xl
        bg-gradient-to-r from-[#fd409a] to-[#f5a867]
        text-white font-medium
        hover:opacity-90
        transition-opacity duration-200
        shadow-lg shadow-[#fd409a]/20
    `,
    
    content: 'flex-1 overflow-auto space-y-4',
    
    metaCard: 'bg-white/5 border border-white/10 rounded-xl p-4',
    metaGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
    metaItem: 'flex items-center gap-2',
    metaIcon: 'w-5 h-5 text-[#fd409a]',
    metaLabel: 'text-white/60 text-sm',
    metaValue: 'text-white font-medium',
    
    statusBadge: 'px-3 py-1 rounded-full text-xs font-medium',
    statusDraft: 'bg-gray-500/20 text-gray-400',
    statusGenerated: 'bg-green-500/20 text-green-400',
    statusOptimized: 'bg-blue-500/20 text-blue-400',
    
    regeneratePanel: `
        bg-gradient-to-r from-[#fd409a]/10 to-[#f5a867]/10
        border border-[#fd409a]/20
        rounded-xl p-4 space-y-3
    `,
    regenerateTitle: 'text-white font-medium flex items-center gap-2',
    textarea: `
        w-full min-h-[100px] p-3
        bg-white/5 border border-white/10 rounded-lg
        text-white placeholder:text-white/40
        focus:outline-none focus:ring-2 focus:ring-[#fd409a]/50
        resize-y
    `,
    regenerateActions: 'flex items-center gap-3',
    primaryButton: `
        flex items-center gap-2 px-6 py-2 rounded-lg
        bg-gradient-to-r from-[#fd409a] to-[#f5a867]
        text-white font-medium
        hover:opacity-90 transition-opacity
        disabled:opacity-50 disabled:cursor-not-allowed
    `,
    secondaryButton: `
        px-6 py-2 rounded-lg
        text-white/70 hover:text-white
        bg-white/5 hover:bg-white/10
        border border-white/10
        transition-all
    `,
    
    card: 'bg-white/5 border border-white/10 rounded-xl p-6 mb-6',
    cardTitle: 'text-xl font-bold text-white mb-4',
    meta: 'flex flex-wrap gap-6 mb-4',
    
    previewCard: 'bg-white/5 border border-white/10 rounded-xl p-6',
    previewHeader: 'flex items-center justify-between mb-4',
    previewTitle: 'text-lg font-semibold text-white',
    previewContent: `
        bg-white rounded-lg overflow-auto
        max-h-[70vh]
        shadow-2xl
    `,
    resumePreview: 'bg-white rounded-lg overflow-auto max-h-[70vh] shadow-2xl',
    
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
};
