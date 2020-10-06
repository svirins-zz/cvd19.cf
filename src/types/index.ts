import { TableInstance } from 'react-table';

export interface Countries {
  countries?: Country[];
}

export interface Country {
  name?: string
  results?: Result[]
  periods: Period[]
  periodsWithDeaths: Period[]
}

export interface Result {
  date?: string
  deaths?: number
  confirmed?: number
}

export interface Counts {
  deaths: number
  cases: number
}

export interface Periods {
  periods: Period[]
  periodsWithDeaths: Period[]
}

export interface Period {
  endDate: string
  totalDeaths: number
  newDeaths: number
  growthRate: number
  totalCases: number
  newCases: number
  status: OutbreakStatus | undefined
}

export interface PeriodSummary {
  endDate: string
  none: number
  small: number
  losing: number
  flattening: number
  crushing: number
  winning: number
  won: number
  pandemicFree: number
  underControl: number
}

export interface AllPeriodsResult {
  totalGlobalCases: Number
  totalGlobalDeaths: Number
  totalGlobalRecovered: Number
  totalGlobalCountries: Number
}

export interface TableTColumn {
  key?: String
  title: String
  dataIndex: String
  sorter?: Function
  defaultSortOrder?: String
  sortOrder?: String
  render?: Function
}

export interface TableT {
  table: TableInstance<Country>
}

export enum OutbreakStatus {
  None = 'No Outbreak',
  Small = 'Small Outbreak',
  Losing = 'Losing',
  Flattening = 'Flattening the Curve',
  Crushing = 'Crushing the Curve',
  Winning = 'Winning',
  Won = 'Won'
}

export interface TagT {
  id: string | number;
  name: string;
  disabled?: boolean;
}

export interface Tags {
  currentTags: TagT[]
  suggestedTags: TagT[]
}

export interface PeriodInfo {
  length: number
  value: string
}

export type Table =
  | 'growth'
  | 'totalDeaths'
  | 'newDeaths'
  | 'totalCases'
  | 'newCases';

export interface ChartInfo {
  x: string
  y: string
  title: string
}

export interface RenderedTable {
  table: TableT
  order: Boolean
}