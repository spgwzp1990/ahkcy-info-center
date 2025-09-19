import { useQuery } from '@tanstack/react-query';
import { apiClient } from './api-client';
import type { Alarm, Billing, Strategy, Ticket } from '@/types/models';
import type { TrendPoint } from '@/types/charts';

export function useRtmKpi() {
  return useQuery({
    queryKey: ['rtm-kpi'],
    queryFn: () => apiClient<Record<string, number>>('/api/rtm/kpi'),
  });
}

export function useRtmTrend(params?: Record<string, string>) {
  return useQuery({
    queryKey: ['rtm-trend', params],
    queryFn: () =>
      apiClient<TrendPoint[]>(`/api/rtm/trend${params ? `?${new URLSearchParams(params)}` : ''}`),
  });
}

export function useTickets() {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: () => apiClient<Ticket[]>('/api/om/tickets'),
  });
}

export function useEaSummary() {
  return useQuery({
    queryKey: ['ea-summary'],
    queryFn: () => apiClient<Record<string, unknown>>('/api/ea/summary'),
  });
}

export function useEcReport() {
  return useQuery({
    queryKey: ['ec-report'],
    queryFn: () => apiClient<Record<string, unknown>>('/api/ec/report'),
  });
}

export function useBillingList() {
  return useQuery({
    queryKey: ['bills'],
    queryFn: () => apiClient<Billing[]>('/api/bill/bills'),
  });
}

export function useStrategies() {
  return useQuery({
    queryKey: ['strategies'],
    queryFn: () => apiClient<Strategy[]>('/api/sc/command'),
  });
}

export function useAlarms() {
  return useQuery({
    queryKey: ['alarms'],
    queryFn: () => apiClient<Alarm[]>('/api/rtm/alarms'),
    placeholderData: [],
  });
}
