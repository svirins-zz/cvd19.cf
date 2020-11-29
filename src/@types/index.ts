import { LatLngExpression } from "leaflet";
import { ReactChild, ReactChildren } from "react";

// charts and tables types
export interface ChartInfo {
  x: string;
  y: string;
  title: string;
}
export interface DataChartProps {
  data: Country[];
  selectedCountries: SelectedCountries[];
  isStartAtDeaths: boolean;
  isstartAtLast90Days: boolean
  yValue: string;
  periodLength: number;
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
type AccessorType = "name" | "periods[4]" | "periods[3]" | "periods[2]" | "periods[1]" |"periods[0]" | "periods" | "results";
export type ConstructedColumn = {
  Header: string;
  accessor: AccessorType;
  Cell?: ({ value }: { value: Period & "" }) => number | undefined;
};
type SortOrder = "descend" | "ascend" | null;
type AlignType = "left" | "center" | "right"
export interface Column {
  title: string ;
  dataIndex: string;
  align?: AlignType;
  render?: Render;
  sorter: Sorter;
  defaultSortOrder?: SortOrder;
  sortDirections?: [SortOrder, SortOrder];
}
export interface LongTable {
  key: number;
  name: string;
  "periods[4]": number;
  rate4: OutbreakStatus;
  "periods[3]": number;
  rate3: OutbreakStatus;
  "periods[2]": number;
  rate2: OutbreakStatus;
  "periods[1]": number;
  rate1: OutbreakStatus;
  "periods[0]": number;
  rate0: OutbreakStatus;
}
export interface ShortTable {
  key: number;
  name: string;
  "periods[2]": number;
  rate2: OutbreakStatus;
  "periods[1]": number;
  rate1: OutbreakStatus;
  "periods[0]": number;
  rate0: OutbreakStatus;
}
export type Sorter = (a: LongTable & ShortTable, b: LongTable & ShortTable) => number;
export type Render = (text: number, record: LongTable & ShortTable) => RenderReturn;
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
export interface IndexPageState {
  stats: GlobalStats;
  trends: Period[];
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
export interface TagRenderProps {
  label: string | number | React.ReactNode;
  value: string | number | React.ReactNode;
  disabled: boolean;
  onClose: (
    event?: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => void;
  closable?: boolean;
}
export interface FiltersState {
  periodLength: number;
  selectedTable: TableType;
  selectedCountries: SelectedCountries[];
  startAtDeaths: boolean;
  startAtLast90Days: boolean;
  isSliderDisabled: boolean;
  oldPeriodsValue: number;
}
export type SideDrawerColumn = {
  title: string;
  dataIndex: string;
  render?: (text: OutbreakStatus, row: unknown, index: number) => JSX.Element;
  key: string;
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
export type ContextProps = {
  choice: ContextState;
  visible: { isVisible: boolean };
  width: { multiplyer: number };
  handleSelect: (info: { selectedKeys?: MenuKey }) => void;
  onClose: () => void;
  showDrawer: () => void;
};
export type MenuKey = string | number | (string | number)[] | undefined
export interface ContextState {
  key: MenuKey
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

export type GlobalStats = {
  confirmed: number;
  deaths: number;
  recovered: number;
  countries: number;
  days: number;
  trend: OutbreakStatus;
};
export interface Period {
  [key: string]: number | string | OutbreakStatus;
}