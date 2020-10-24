import React from 'react';
import { Tag } from 'antd';
import { TableInstance } from 'react-table';
import {
  TableType, Country, Period, Prepared, Prepared6Col, Column,
} from '@types';
import { getTagColor, commafy } from 'lib';

const alphabeticalSorter = (a: Prepared, b: Prepared) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
  if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
  return 0;
};

// TODO: !!incorrect color tagging ???

export const construct6Col = (
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

export const construct4Col = (
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

export const constructData6Col = (
  table: TableInstance<Country>,
  field: TableType,
  order: true,
) => {
  const preparedData: Prepared6Col[] = table.data.map((e, i) => ({
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
  const columnData = [
    {
      title: table.columns[0].Header,
      dataIndex: table.columns[0].id,
      sorter: (a: Prepared6Col, b: Prepared6Col) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
      },
    },
    {
      title: table.columns[1].Header,
      dataIndex: 'periods[5]',
      align: 'center',
      render: (text: number, row: any, index: number) => (
        <Tag
          color={getTagColor(preparedData[index].rate5)}
          key={index}
        >
          {field === 'growthRate' ? text : commafy(text)}
          {field === 'growthRate' ? '%' : ''}
        </Tag>
      ),
      sorter: (a: Prepared6Col, b: Prepared6Col) => a['periods[5]'] - b['periods[5]'],
      defaultSortOrder: order ? 'descend' : 'ascend',
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: table.columns[2].Header,
      dataIndex: 'periods[4]',
      align: 'center',
      render: (text: number, row: any, index: number) => (
        <Tag
          color={getTagColor(preparedData[index].rate4)}
          key={index}
        >
          {field === 'growthRate' ? text : commafy(text)}
          {field === 'growthRate' ? '%' : ''}
        </Tag>
      ),
      sorter: (a: Prepared6Col, b: Prepared6Col) => a['periods[4]'] - b['periods[4]'],
      defaultSortOrder: order ? 'descend' : 'ascend',
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: table.columns[3].Header,
      dataIndex: 'periods[3]',
      align: 'center',
      render: (text: number, row: any, index: number) => (
        <Tag
          color={getTagColor(preparedData[index].rate3)}
          key={index}
        >
          {field === 'growthRate' ? text : commafy(text)}
          {field === 'growthRate' ? '%' : ''}
        </Tag>
      ),
      sorter: (a: Prepared6Col, b: Prepared6Col) => a['periods[3]'] - b['periods[3]'],
      defaultSortOrder: order ? 'descend' : 'ascend',
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: table.columns[4].Header,
      dataIndex: 'periods[2]',
      align: 'center',
      render: (text: number, row: any, index: number) => (
        <Tag
          color={getTagColor(preparedData[index].rate2)}
          key={index}
        >
          {field === 'growthRate' ? text : commafy(text)}
          {field === 'growthRate' ? '%' : ''}
        </Tag>
      ),
      sorter: (a: Prepared6Col, b: Prepared6Col) => a['periods[2]'] - b['periods[2]'],
      defaultSortOrder: order ? 'descend' : 'ascend',
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: table.columns[5].Header,
      dataIndex: 'periods[1]',
      align: 'center',
      render: (text: number, row: any, index: number) => (
        <Tag
          color={getTagColor(preparedData[index].rate1)}
          key={index}
        >
          {field === 'growthRate' ? text : commafy(text)}
          {field === 'growthRate' ? '%' : ''}
        </Tag>
      ),
      sorter: (a: Prepared6Col, b: Prepared6Col) => a['periods[1]'] - b['periods[1]'],
      defaultSortOrder: order ? 'descend' : 'ascend',
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: table.columns[6].Header,
      dataIndex: 'periods[0]',
      align: 'center',
      render: (text: number, row: any, index: number) => (
        <Tag
          color={getTagColor(preparedData[index].rate0)}
          key={index}
        >
          {field === 'growthRate' ? text : commafy(text)}
          {field === 'growthRate' ? '%' : ''}
        </Tag>
      ),
      sorter: (a: Prepared6Col, b: Prepared6Col) => a['periods[0]'] - b['periods[0]'],
      defaultSortOrder: order ? 'descend' : 'ascend',
      sortDirections: ['ascend', 'descend'],
    },
  ];
  return { columnData, preparedData };
};

export const constructData4Col = (
  table: TableInstance<Country>,
  field: TableType,
  order: boolean,
) => {
  const preparedData: Prepared[] = table.data.map((e, i) => ({
    key: i,
    name: e.name,
    'periods[2]': e.periods[2][field],
    rate2: e.periods[2].status,
    'periods[1]': e.periods[1][field],
    rate1: e.periods[1].status,
    'periods[0]': e.periods[0][field],
    rate0: e.periods[0].status,
  }));

  const columnData = [
    {
      title: table.columns[0].Header,
      dataIndex: table.columns[0].id,
      sorter: alphabeticalSorter,
    },
    {
      title: table.columns[1].Header,
      dataIndex: 'periods[2]',
      align: 'center',
      render: (text: number, record: Prepared) => (
        <Tag
          color={getTagColor(record.rate2)}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a: Prepared, b: Prepared) => a['periods[2]'] - b['periods[2]'],
    },
    {
      title: table.columns[2].Header,
      dataIndex: 'periods[1]',
      align: 'center',
      render: (text: number, record: Prepared) => (
        <Tag
          color={getTagColor(record.rate1)}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a: Prepared, b:Prepared) => a['periods[1]'] - b['periods[1]'],
    },
    {
      title: table.columns[3].Header,
      dataIndex: 'periods[0]',
      align: 'center',
      render: (text: number, record: Prepared) => (
        <Tag
          color={getTagColor(record.rate0)}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a: Prepared, b: Prepared) => b['periods[0]'] - a['periods[0]'],
      defaultSortOrder: order ? 'ascend' : 'descend',
    },
  ];
  return { columnData, preparedData };
};
