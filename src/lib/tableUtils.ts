import { TableInstance } from 'react-table';
import { TableType, Country, Period, RenderColumns } from '@types';
import TableTag from '../components/data/TableTag'

export const sortOptions = (order?: boolean) => ({
  defaultSortOrder: order ? 'acsend' : 'descend',
  sortDirections: ['ascend', 'descend'],
});
export const textSorter = (a: { name: { toLowerCase: () => number; }; }, b: { name: { toLowerCase: () => number; }; }) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
  if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
  return 0;
};
// TODO: Refactor to forEach iterator
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

export const constructRenderColumns = (
  table: TableInstance<Country>,
  preparedData: RenderColumns[],
  order: boolean
  ) => ([
    {
      title: table.columns[0].Header,
      dataIndex: table.columns[0].id,
      sorter: textSorter,
    },
    {
      title: table.columns[1].Header,
      dataIndex: 'periods[5]',
      align: "center",
      render: (text: number, row: any, index: number) => (TableTag(preparedData[index].rate5, text, index)),
      ...sortOptions(order)
    },
    {
      title: table.columns[2].Header,
      dataIndex: 'periods[4]',
      align: "center",
      render: (text: number, row: any, index: number) => (TableTag(preparedData[index].rate4, text, index)),
      ...sortOptions(order)
    },
    {
      title: table.columns[3].Header,
      dataIndex: 'periods[3]',
      align: "center",
      render: (text: number, row: any, index: number) => (TableTag(preparedData[index].rate3, text, index)),
      ...sortOptions(order)
    },
    ,
    {
      title: table.columns[4].Header,
      dataIndex: 'periods[2]',
      align: "center",
      render: (text: number, row: any, index: number) => (TableTag(preparedData[index].rate2, text, index)),
      ...sortOptions(order)
    },
    {
      title: table.columns[5].Header,
      dataIndex: 'periods[1]',
      align: "center",
      render: (text: number, row: any, index: number) => (TableTag(preparedData[index].rate1, text, index)),
      ...sortOptions(order)
    },,
    {
      title: table.columns[6].Header,
      dataIndex: 'periods[0]',
      align: "center",
      render: (text: number, row: any, index: number) => (TableTag(preparedData[index].rate0, text, index)),
      sorter: (a, b) => a.['periods[0]'] - b.['periods[0]'],
      ...sortOptions(order)
    },
  ]);
