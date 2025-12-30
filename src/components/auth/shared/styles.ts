export const authStyles = {
  form: 'flex flex-col gap-5',
  divider: {
    wrapper: 'flex items-center gap-4 my-6',
    line: 'flex-1 h-px bg-white/10',
    text: 'text-sm text-white/40',
  },
  github: {
    btn: 'w-full flex items-center justify-center gap-3 h-12 rounded-xl bg-[#24292e] hover:bg-[#2f363d] border border-white/10 text-white font-medium transition-colors disabled:opacity-50',
    icon: 'w-5 h-5',
  },
  footer: {
    wrapper: 'text-center mt-6',
    text: 'text-white/60 text-sm',
    link: 'text-primary hover:underline ml-1',
  },
  checkbox: {
    wrapper: 'flex items-center justify-between',
    link: 'text-sm text-primary hover:underline',
  },
  steps: {
    wrapper: 'flex items-center justify-center gap-2 mb-6',
    step: 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
    active: 'bg-primary text-white',
    inactive: 'bg-white/10 text-white/40',
    completed: 'bg-green-500 text-white',
    line: 'w-8 h-0.5 bg-white/10',
    lineActive: 'w-8 h-0.5 bg-primary',
  },
  resend: {
    wrapper: 'text-center mt-4',
    btn: 'text-primary hover:underline text-sm disabled:text-white/40 disabled:no-underline',
  },
};
