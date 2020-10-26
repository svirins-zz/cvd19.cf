import { ReactChildren, ReactChild } from "react";
import { ApolloError } from "@apollo/client";
import { LatLngTuple, LatLngBoundsLiteral } from "leaflet";

export interface Countries {
  countries: Country[];
}

export interface Country {
  name: string;
  results: Result[];
  periods: Period[];
  periodsWithDeaths: Period[];
}

export interface Properties {
  name: string;
  code: string;
  flag: string;
  bounds?: LatLngBoundsLiteral & { type: "Point" };
  confirmed: number;
  deaths: number;
  recovered: number;
}

export interface Result {
  date: string;
  deaths: number;
  confirmed: number;
  recovered: number;
}

export interface Counts {
  deaths: number;
  cases: number;
}

export interface Periods {
  periods: Period[];
  periodsWithDeaths: Period[];
}

export interface Period {
  endDate: string;
  totalDeaths: number;
  newDeaths: number;
  growthRate: number;
  totalCases: number;
  newCases: number;
  status: OutbreakStatus;
}

export interface PeriodSummary {
  endDate: string;
  none: number;
  small: number;
  losing: number;
  flattening: number;
  crushing: number;
  winning: number;
  won: number;
  pandemicFree: number;
  underControl: number;
}

export enum OutbreakStatus {
  None = "No Outbreak",
  Small = "Small Outbreak",
  Losing = "Losing",
  Flattening = "Flattening the Curve",
  Crushing = "Crushing the Curve",
  Winning = "Winning",
  Won = "Won",
}

export type Tags = {
  id: string | number;
  label: string;
  value: string;
};

export type TableType =
  | "growthRate"
  | "totalDeaths"
  | "newDeaths"
  | "totalCases"
  | "newCases";

export interface ChartInfo {
  x: string;
  y: string;
  title: string;
}

export interface SummaryTable {
  data: Country[];
  periodLength: number;
  kind: TableType;
  size: 4 | 6;
  order?: boolean;
}

export interface DataChartProps {
  countries: Country[];
  countriesT: Tags[];
  selectedCountries: string[];
  x: string;
  y: string;
  startAtDeaths: boolean;
  title: string;
}

export interface Selected {
  [key: string]: string;
}

export type GlobalStats = {
  confirmed: number;
  deaths: number;
  recovered: number;
  countries: number;
  days: number;
};

export interface CalculatedSummary {
  stats: GlobalStats;
  trend: OutbreakStatus;
}

export interface MissingCountries {
  longName: string;
  shortName: string;
}

export type ContextProps = {
  choice: string;
  handleSelect: ({ key }: { key: string }) => void;
  visible: boolean;
  onClose: () => void;
  showDrawer: () => void;
};

export interface AuxProps {
  children: ReactChild | ReactChildren;
}
export type ErrorProps = {
  error?: ApolloError;
};

export interface Geometry {
  type: "Point";
  coordinates: LatLngTuple;
}

export type Feature = {
  type: "Feature";
  properties: Properties;
  geometry: Geometry;
};

export interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}

export interface CodeFlagGeo {
  code: string;
  flag: string;
  geometry: Geometry;
}

export interface Props {
  description?: string;
  lang?: string;
  meta?: {
    name?: string | undefined;
    content: string;
    property?: string | undefined;
  }[];
  title: string;
}

export interface SiteQuery {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      author: string;
    };
  };
}

export interface TagRenderProps {
  label: string;
  closable: boolean | undefined;
  onClose: (e: MouseEvent) => void;
}

export interface Column {
  title: string;
  dataIndex: string;
  align?: string;
  render?: () => JSX.Element;
  sorter?: () => boolean;
  defaultSortOrder?: "descend" | "ascend" | "null" | "undefined";
  sortDirections?: [string, string];
}
export interface PreparedExt extends Prepared {
  "periods[5]": number;
  rate5: OutbreakStatus;
  "periods[4]": number;
  rate4: OutbreakStatus;
  "periods[3]": number;
  rate3: OutbreakStatus;
}

export interface Prepared {
  key: number;
  name: string;
  "periods[2]": number;
  rate2: OutbreakStatus;
  "periods[1]": number;
  rate1: OutbreakStatus;
  "periods[0]": number;
  rate0: OutbreakStatus;
}

export interface TableState {
  table: "growthRate" | "totalDeaths" | "newDeaths" | "totalCases" | "newCases";
}

// export interface StartAtDeathState {
//   isStart: boolean;
// }

export interface CountriesState {
  countries: string[];
}

// export interface PeriodState {
//   length: number;
// }
