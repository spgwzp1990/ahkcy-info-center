import { create } from 'zustand';
import type { FilterState } from '@/types/filters';

type Actions = {
  update: (payload: Partial<FilterState>) => void;
  toggleAutoRefresh: () => void;
  reset: () => void;
};

const initialState: FilterState = {
  timeRange: 'last_24h',
  site: 'all',
  deviceTypes: [],
  tags: [],
  autoRefresh: true,
};

export const useFilters = create<FilterState & Actions>((set) => ({
  ...initialState,
  update: (payload) => set((state) => ({ ...state, ...payload })),
  toggleAutoRefresh: () =>
    set((state) => ({ autoRefresh: !state.autoRefresh })),
  reset: () => set(initialState),
}));
