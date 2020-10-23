import React from 'react';
import { Table, Tag } from 'antd';
import { Country } from '@types';
import { TableInstance } from 'react-table';
import { getTagColor, commafy, sortOptions, textSorter, constructData6C, constructData4C } from 'lib';

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
  const preparedData = constructData6C(table, 'growthRate')
  const columns = [
    {
      title: table.columns[0].Header,
      dataIndex: table.columns[0].id,
      defaultSortOrder: 'ascend',
      sorter: textSorter,
    },
    {
      title: table.columns[1].Header,
      dataIndex: 'periods[5]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate5)}
          key={index}
        >
          {text}{'%'}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[5]'] - b.['periods[5]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[2].Header,
      dataIndex: 'periods[4]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate4)}
          key={index}
        >
          {text}{'%'}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[4]'] - b.['periods[4]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[3].Header,
      dataIndex: 'periods[3]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate3)}
          key={index}
        >
          {commafy(text)}{'%'}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[3]'] - b.['periods[3]'],
      ...sortOptions(order)
    },
    ,
    {
      title: table.columns[4].Header,
      dataIndex: 'periods[2]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate2)}
          key={index}
        >
          {text}{'%'}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[2]'] - b.['periods[2]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[5].Header,
      dataIndex: 'periods[1]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate1)}
          key={index}
        >
          {text}{'%'}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[1]'] - b.['periods[1]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[6].Header,
      dataIndex: 'periods[0]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate0)}
          key={index}
        >
          {text}{'%'}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[0]'] - b.['periods[0]'],
      ...sortOptions(order)
    },
  ];
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
  const columns = [
    {
      title: table.columns[0].Header,
      dataIndex: table.columns[0].id,
      defaultSortOrder: 'ascend',
      textSorter,
    },
    {
      title: table.columns[1].Header,
      dataIndex: 'periods[5]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate5)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[5]'] - b.['periods[5]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[2].Header,
      dataIndex: 'periods[4]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate4)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[4]'] - b.['periods[4]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[3].Header,
      dataIndex: 'periods[3]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate3)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[3]'] - b.['periods[3]'],
      ...sortOptions(order)
    },
    ,
    {
      title: table.columns[4].Header,
      dataIndex: 'periods[2]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate2)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[2]'] - b.['periods[2]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[5].Header,
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
      sorter: (a, b) => a.['periods[1]'] - b.['periods[1]'],
      ...sortOptions(order)
    },,
    {
      title: table.columns[6].Header,
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
      sorter: (a, b) => a.['periods[0]'] - b.['periods[0]'],
      ...sortOptions(order)
    },
  ];

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
  const columns = [
    {
      title: table.columns[0].Header,
      dataIndex: table.columns[0].id,
      defaultSortOrder: 'ascend',
      sorter: textSorter,
    },
    {
      title: table.columns[1].Header,
      dataIndex: 'periods[5]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate5)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[5]'] - b.['periods[5]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[2].Header,
      dataIndex: 'periods[4]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate4)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[4]'] - b.['periods[4]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[3].Header,
      dataIndex: 'periods[3]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate3)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[3]'] - b.['periods[3]'],
      ...sortOptions(order)
    },
    ,
    {
      title: table.columns[4].Header,
      dataIndex: 'periods[2]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate2)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[2]'] - b.['periods[2]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[5].Header,
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
      sorter: (a, b) => a.['periods[1]'] - b.['periods[1]'],
      ...sortOptions(order)
    },,
    {
      title: table.columns[6].Header,
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
      sorter: (a, b) => a.['periods[0]'] - b.['periods[0]'],
      ...sortOptions(order)
    },
  ];

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
  const columns = [
    {
      title: table.columns[0].Header,
      dataIndex: table.columns[0].id,
      defaultSortOrder: 'ascend',
      sorter: textSorter,
    },
    {
      title: table.columns[1].Header,
      dataIndex: 'periods[5]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate5)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[5]'] - b.['periods[5]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[2].Header,
      dataIndex: 'periods[4]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate4)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[4]'] - b.['periods[4]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[3].Header,
      dataIndex: 'periods[3]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate3)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[3]'] - b.['periods[3]'],
      ...sortOptions(order)
    },
    ,
    {
      title: table.columns[4].Header,
      dataIndex: 'periods[2]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate2)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[2]'] - b.['periods[2]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[5].Header,
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
      sorter: (a, b) => a.['periods[1]'] - b.['periods[1]'],
      ...sortOptions(order)
    },,
    {
      title: table.columns[6].Header,
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
      sorter: (a, b) => a.['periods[0]'] - b.['periods[0]'],
      ...sortOptions(order)
    },
  ];

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
  const columns = [
    {
      title: table.columns[0].Header,
      dataIndex: table.columns[0].id,
      defaultSortOrder: 'ascend',
      sorter: textSorter,
    },
    {
      title: table.columns[1].Header,
      dataIndex: 'periods[5]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate5)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[5]'] - b.['periods[5]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[2].Header,
      dataIndex: 'periods[4]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate4)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[4]'] - b.['periods[4]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[3].Header,
      dataIndex: 'periods[3]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate3)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[3]'] - b.['periods[3]'],
      ...sortOptions(order)
    },
    ,
    {
      title: table.columns[4].Header,
      dataIndex: 'periods[2]',
      align: "center",
      render: (text, row, index) => (
        <Tag
          color={getTagColor(preparedData[index].rate2)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      sorter: (a, b) => a.['periods[2]'] - b.['periods[2]'],
      ...sortOptions(order)
    },
    {
      title: table.columns[5].Header,
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
      sorter: (a, b) => a.['periods[1]'] - b.['periods[1]'],
      ...sortOptions(order)
    },,
    {
      title: table.columns[6].Header,
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
      sorter: (a, b) => a.['periods[0]'] - b.['periods[0]'],
      ...sortOptions(order)
    },
  ];

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

