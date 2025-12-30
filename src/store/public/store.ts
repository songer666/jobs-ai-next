import { create } from 'zustand'
import type { PublicTemplateState } from './type'

export const usePublicTemplateStore = create<PublicTemplateState>((set) => ({
    includePublic: false,
    setIncludePublic: (value) => set({ includePublic: value }),
    toggleIncludePublic: () => set((state) => ({ includePublic: !state.includePublic })),
}))
