export const sidebarStyles = {
  wrapper: `
        fixed lg:relative right-0 top-0 h-full z-40
        flex
        transition-transform duration-300 ease-in-out
    `,
  wrapperOpen: "translate-x-0",
  wrapperClosed: "translate-x-full lg:translate-x-0",
  toggleButton: `
        self-center -ml-7
        w-7 h-20 
        bg-gradient-to-r from-[#1e1e2e]/80 to-[#181825]/90
        backdrop-blur-xl
        border border-white/10 border-r-0 
        rounded-l-2xl
        shadow-lg shadow-black/20
        flex items-center justify-center 
        transition-all duration-200
        text-white/50 hover:text-white/80
        hover:w-8
        lg:hidden
    `,
  sidebar: `
        w-80 h-full
        bg-gradient-to-b from-[#1e1e2e]/90 to-[#181825]/95
        backdrop-blur-xl
        border-l border-white/5
        rounded-l-3xl
        shadow-2xl shadow-black/20
        flex flex-col
    `,
  header: "p-5 border-b border-white/5",
  headerTop: "flex items-center justify-between mb-3",
  title: "text-lg font-semibold text-white/90",
  newButton: `
        p-2 rounded-xl 
        bg-gradient-to-r from-[#fd409a]/20 to-[#f5a867]/20
        hover:from-[#fd409a]/30 hover:to-[#f5a867]/30
        border border-[#fd409a]/30
        text-[#fd409a]
        transition-all duration-200
        hover:scale-105
    `,
  usage: "flex items-center gap-2 text-sm text-white/50",
  usageIcon: "w-4 h-4 text-[#fd409a]/80",
  usageCount: "text-[#fd409a]/90 font-medium",
  list: "flex-1 overflow-y-auto p-3 space-y-2",
  item: `
        block p-4 rounded-2xl
        bg-white/[0.02]
        border border-white/5
        transition-all duration-200
        hover:bg-white/[0.05] hover:border-white/10
        hover:shadow-lg hover:shadow-black/10
    `,
  itemActive:
    "bg-[#fd409a]/10 border-[#fd409a]/20 shadow-lg shadow-[#fd409a]/5",
  itemNew: "animate-pulse bg-emerald-500/10 border-emerald-500/20",
  itemHeader: "flex items-center justify-between mb-2",
  itemBadge:
    "text-xs px-2.5 py-1 rounded-full font-medium bg-white/10 text-white/70 truncate max-w-[120px]",
  itemTime: "flex items-center gap-1 text-xs text-white/30 shrink-0",
  itemText: "text-sm text-white/70 line-clamp-2 leading-relaxed",
  itemScore: "mt-2 text-xs text-[#fd409a]/80 font-medium",
  empty:
    "flex flex-col items-center justify-center h-full text-white/30 p-6 text-center",
  emptyIcon: "w-14 h-14 mb-4 opacity-40",
  loading: "flex items-center justify-center h-full",
  overlay: "fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden",
};
