import { TableInstance } from 'react-table';
import { TableType, Country, Period } from '@types';

export const sortOptions = (order?: boolean) => ({
  defaultSortOrder: order ? 'acsend' : 'descend',
  sortDirections: ['ascend', 'descend'],
});
export const textSorter = (a, b) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
  if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
  return 0;
};

export const constructData6C = (
  table: TableInstance<Country>,
  field: TableType,
) => table.data.map((e, i) => ({
  key: i,
  name: e.name,
  'periods[5]': e.periods[5][field],
  rate5: e.periods[5].status,
  'periods[4]': e.periods[4][field],
  rate4: e.periods[4].status,
  'periods[3]': e.periods[3][field],
  rate3: e.periods[3].status,
  'periods[2]': e.periods[2][field],
  rate2: e.periods[2].status,
  'periods[1]': e.periods[1][field],
  rate1: e.periods[1].status,
  'periods[0]': e.periods[0][field],
  rate0: e.periods[0].status,
}));

export const constructData4C = (
  table: TableInstance<Country>,
  field: TableType,
) => table.data.map((e, i) => ({
  key: i,
  name: e.name,
  'periods[2]': e.periods[2][field],
  rate2: e.periods[2].status,
  'periods[1]': e.periods[1][field],
  rate1: e.periods[1].status,
  'periods[0]': e.periods[0][field],
  rate0: e.periods[0].status,
}));

export const constructColumns = (
  field: TableType,
  periodNames: string[],
) => ([
  {
    Header: 'Country',
    accessor: 'name',
  },
  {
    Header: periodNames[5],
    accessor: 'periods[5]',
    Cell: ({ value }: { value: Period & '' }) => value[field],
  },
  {
    Header: periodNames[4],
    accessor: 'periods[4]',
    Cell: ({ value }: { value: Period & ''}) => value[field],
  },
  {
    Header: periodNames[3],
    accessor: 'periods[3]',
    Cell: ({ value }: { value: Period & ''}) => value[field],
  },
  {
    Header: periodNames[2],
    accessor: 'periods[2]',
    Cell: ({ value }: { value: Period & ''}) => value[field],
  },
  {
    Header: periodNames[1],
    accessor: 'periods[1]',
    Cell: ({ value }: { value: Period & ''}) => value[field],
  },
  {
    Header: periodNames[0],
    accessor: 'periods[0]',
    Cell: ({ value }: { value: Period & ''}) => value[field],
  },
]);

export const constructColumnsSm = (
  field: TableType,
  periodNames: string[],
) => ([
  {
    Header: 'Country',
    accessor: 'name',
  },
  {
    Header: periodNames[2],
    accessor: 'periods[2]',
    Cell: ({ value }: { value: Period & ''}) => value[field],
  },
  {
    Header: periodNames[1],
    accessor: 'periods[1]',
    Cell: ({ value }: { value: Period & ''}) => value[field],
  },
  {
    Header: periodNames[0],
    accessor: 'periods[0]',
    Cell: ({ value }: { value: Period & ''}) => value[field],
  },
]);