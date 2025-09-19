export interface AxisConfig {
  key: string;
  label: string;
  unit?: string;
  color?: string;
}

export interface TrendPoint {
  ts: string;
  [key: string]: number | string;
}

export interface TrendChartProps {
  data: TrendPoint[];
  series: AxisConfig[];
  yAxes: AxisConfig[];
  height?: number;
  isLoading?: boolean;
  onBrushChange?: (range: { startIndex: number; endIndex: number }) => void;
}

export interface BarCompareProps {
  data: Array<{ category: string; valueA: number; valueB: number }>;
  labels: { a: string; b: string };
  height?: number;
  isLoading?: boolean;
}

export interface PieShareSlice {
  name: string;
  value: number;
}

export interface PieShareProps {
  data: PieShareSlice[];
  innerRadius?: number;
  outerRadius?: number;
  isLoading?: boolean;
}

export interface HeatmapDatum {
  time: string;
  zone: string;
  value: number;
}

export interface HeatmapProps {
  data: HeatmapDatum[];
  thresholds?: number[];
  isLoading?: boolean;
}

export interface WaterfallStep {
  name: string;
  value: number;
}

export interface WaterfallBillingProps {
  steps: WaterfallStep[];
  currency?: string;
  isLoading?: boolean;
}

export interface RadarMetric {
  label: string;
  value: number;
  target: number;
}

export interface RadarSavingProps {
  metrics: RadarMetric[];
  isLoading?: boolean;
}
