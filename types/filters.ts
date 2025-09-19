export type TimeRange = 'last_1h' | 'last_24h' | 'last_7d' | 'custom';

export interface FilterState {
  timeRange: TimeRange;
  site: string;
  deviceTypes: string[];
  tags: string[];
  autoRefresh: boolean;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterBarProps {
  sites: FilterOption[];
  deviceTypes: FilterOption[];
  tags: FilterOption[];
  isLoading?: boolean;
  onExport: (type: 'png' | 'csv' | 'pdf') => void;
  onHelp: () => void;
}
