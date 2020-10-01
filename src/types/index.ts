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

export enum OutbreakStatus {
  None = 'No Outbreak',
  Small = 'Small Outbreak',
  Losing = 'Losing',
  Flattening = 'Flattening the Curve',
  Crushing = 'Crushing the Curve',
  Winning = 'Winning',
  Won = 'Won',
}
