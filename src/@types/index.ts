import { LatLngBoundsLiteral, LatLngTuple } from "leaflet";
import { ReactChild, ReactChildren } from "react";

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
  [key: string]: number | string | OutbreakStatus;
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

export type CountriesList = {
  id: string | number;
  label: string;
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
  variation: "tight" | "wide";
  order?: boolean;
  multiplyer?: number;
}
export interface DataChartProps {
  countries?: Country[];
  periods?: Period[];
  selectedCountries?: Selected[];
  isStartAtDeaths: boolean;
  yValue: string;
  multiplyer: number;
}

export interface Selected {
  name: string;
  color: string;
}

export interface ColorMap {
  name: string;
  color: string;
}

export interface SelectedCountries {
  countries?: Selected[];
}

export type GlobalStats = {
  confirmed: number;
  deaths: number;
  recovered: number;
  countries: number;
  days: number;
  trend: OutbreakStatus;
};

export interface CalculatedSummary {
  stats: GlobalStats;
  trend: OutbreakStatus;
}

export interface MissingCountries {
  longName: string;
  shortName: string;
}

export type MenuSelectfunction = (info: {
  selectedKeys?: React.Key[] | React.Key;
}) => void;

export type ContextProps = {
  choice: { key: string };
  visible: { isVisible: boolean };
  width: { multiplyer: number };
  handleSelect: MenuSelectfunction;
  onClose: () => void;
  showDrawer: () => void;
};

export interface AuxProps {
  children: ReactChild | ReactChildren;
}
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

export interface RenderProps {
  label: string | number;
  value: string | number;
  disabled: boolean;
  onClose: (
    event?: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => void;
  closable?: boolean;
}

export type ConstructedColumn = {
  Header: string;
  accessor: string;
  Cell: ({ value }: { value: Period & "" }) => number | undefined;
};

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

export type SideDrawerColumn = {
  title: string;
  dataIndex: string;
  render?: (text: OutbreakStatus, row: unknown, index: number) => JSX.Element;
  key: string;
};
