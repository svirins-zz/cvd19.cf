import { LatLngExpression } from "leaflet";
import { ReactChild, ReactChildren } from "react";

// charts and tables types
export interface ChartInfo {
  x: string;
  y: string;
  title: string;
}
export interface DataChartProps {
  countries: Country[];
  selectedCountries: SelectedCountries[];
  isStartAtDeaths: boolean;
  yValue: string;
  multiplyer: number;
}
export interface SummaryTable {
  data: Country[];
  periodLength: number;
  kind: TableType;
  variation: "tight" | "wide";
  order?: boolean;
  multiplyer?: number;
}
export interface CalculatedSummary {
  stats: GlobalStats;
  trend: OutbreakStatus;
}
export type ConstructedColumn = {
  Header: string;
  accessor: string | "periodsWithDeaths" | "periods" | "results" | "name";
  Cell?: ({ value }: { value: Period & "" }) => number | undefined;
};
export interface Column {
  title: string ;
  dataIndex: string;
  align?: string;
  render?: Render;
  sorter?: Sorter;
  defaultSortOrder?: "descend" | "ascend" | null;
  sortDirections?: [string, string];
}
export interface Prepared {
  key: number;
  name: string;
  "periods[4]"?: number;
  rate4?: OutbreakStatus;
  "periods[3]"?: number;
  rate3?: OutbreakStatus;
  "periods[2]": number;
  rate2: OutbreakStatus;
  "periods[1]": number;
  rate1: OutbreakStatus;
  "periods[0]": number;
  rate0: OutbreakStatus;
}
export type Sorter = (a: Prepared, b: Prepared) => number;
export type Render = (text: number, record: Prepared) => RenderReturn;
export interface RenderReturn {
  props: { style: { background: string } };
  children: string;
}
export interface Col {
  Header: string;
  id: string;
}
// Enums
export enum TableType {
  Growth = "growthRate",
  Deaths = "totalDeaths",
  NewDeaths= "newDeaths",
  TotalCases = "totalCases",
  NewCases = "newCases",
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
// page states
export interface SelectedCountries {
  name: string;
  color: string;
}
export interface FiltersState {
  periodLength: number;
  selectedTable: TableType;
  selectedCountries: SelectedCountries[];
  startAtDeaths: boolean;
}
export interface IndexPageState {
  stats: GlobalStats;
  trends: Trends[];
  loseTableData: Country[];
  winTableData: Country[];
}
export type CountriesList = {
  id: string | number;
  label: string;
};
export interface DataPageState {
  countriesList: CountriesList[];
  preparedCountries: Country[];
}
// ui-related states
export type SideDrawerColumn = {
  title: string;
  dataIndex: string;
  render?: (text: OutbreakStatus, row: unknown, index: number) => JSX.Element;
  key: string;
};
export type ContextProps = {
  choice: { key: string };
  visible: { isVisible: boolean };
  width: { multiplyer: number };
  handleSelect: (info: { selectedKeys?: React.Key[] | React.Key }) => void;
  onClose: () => void;
  showDrawer: () => void;
};
// meta props 
export interface SeoProps {
  description: string;
  title: string;
  pathname: string;
}
export interface AuxProps {
  children: ReactChild | ReactChildren;
}
// map-related types
export interface MissingCountries {
  longName: string;
  shortName: string;
}
export interface Geometry {
  type: "Point";
  coordinates: LatLngExpression;
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
export interface Properties {
  name: string;
  code: string;
  flag: string;
  bounds?: LatLngExpression & { type: "Point" };
  confirmed: number;
  deaths: number;
  recovered: number;
}
// common types
export interface Country {
  name: string;
  results: Result[];
  periods: Period[];
  periodsWithDeaths: Period[];
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
export type GlobalStats = {
  confirmed: number;
  deaths: number;
  recovered: number;
  countries: number;
  days: number;
  trend: OutbreakStatus;
};
export interface Trends {
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

// possibly unused

// export interface RenderProps {
//   label: string | number | React.ReactNode;
//   value: string | number | React.ReactNode;
//   disabled: boolean;
//   onClose: (
//     event?: React.MouseEvent<HTMLElement, MouseEvent> | undefined
//   ) => void;
//   closable?: boolean;
// }