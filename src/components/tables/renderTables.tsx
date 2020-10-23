import React from 'react';
import { Table, Tag } from 'antd';
import { Country } from '@types';
import { TableInstance } from 'react-table';
import { 
  getTagColor,
  commafy,
  sortOptions,
  textSorter,
  constructData6C,
  constructData4C,
  constructRenderColumns
} from 'lib';

export const ATable3Col = ({ table }: { table: TableInstance<Country> })  => {
  const order = true;
  const preparedData = constructData4C(table, 'newDeaths')
  const columns = [
    {
      title: table.columns[0].Header,
      dataIndex: table.columns[0].id,
      sorter: textSorter,
    },
    {
      title: table.columns[1].Header,
      dataIndex: 'periods[2]',
      align: "center",
      render: ( text, row, index ) => (
        <Tag
          color={getTagColor(preparedData[index].rate2)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
    },
    {
      title: table.columns[2].Header,
      dataIndex: 'periods[1]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate1)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
    },
    {
      title: table.columns[3].Header,
      dataIndex: 'periods[0]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate0)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a['periods[0]'] - b['periods[0]'],
      ...sortOptions(order)
    },
  ];
  return (
    <Table
      columns={columns}
      bordered
      dataSource={preparedData}
      size="small"
      pagination={{ pageSize: 30 }}
      scroll={{ y: 550 }}
    />
  );
};

export const ATable5ColGrowth = ({ table }: {table: TableInstance<Country>}) => {
  const order = true;
  const preparedData = constructData6C(table, 'growthRate');
  const columns = constructRenderColumns(table, preparedData, order);
  return (
    <Table
      columns={columns}
      bordered
      dataSource={preparedData}
      size="small"
      pagination={{ pageSize: 50 }}
      scroll={{ y: 600 }}
    />
  );
};
export const ATable5ColNewCases = ({ table }: {table: TableInstance<Country>}) => {
  const order = true;
  const preparedData = constructData6C(table, 'newCases')
  const columns = constructRenderColumns(table, preparedData, order);
  return (
    <Table
      columns={columns}
      bordered
      dataSource={preparedData}
      size="small"
      pagination={{ pageSize: 50 }}
      scroll={{ y: 600 }}
    />
  );
};
export const ATable5ColTotalCases = ({ table }: {table: TableInstance<Country>}) => {
  const order = true;
  const preparedData = constructData6C(table, 'totalCases')
  const columns = constructRenderColumns(table, preparedData, order);
  return (
    <Table
      columns={columns}
      bordered
      dataSource={preparedData}
      size="small"
      pagination={{ pageSize: 50 }}
      scroll={{ y: 600 }}
    />
  );
};
export const ATable5ColTotalDeaths = ({ table }: {table: TableInstance<Country>}) => {
  const order = true;
  const preparedData = constructData6C(table, 'totalDeaths')
  const columns = constructRenderColumns(table, preparedData, order);
  return (
    <Table
      columns={columns}
      bordered
      dataSource={preparedData}
      size="small"
      pagination={{ pageSize: 50 }}
      scroll={{ y: 600 }}
    />
  );
};
export const ATable5ColNewDeaths = ({ table }: {table: TableInstance<Country>}) => {
  const order = true;
  const preparedData = constructData6C(table, 'newDeaths')
  const columns = constructRenderColumns(table, preparedData, order);
  return (
    <Table
      columns={columns}
      bordered
      dataSource={preparedData}
      size="small"
      pagination={{ pageSize: 50 }}
      scroll={{ y: 600 }}
    />
  );
};
