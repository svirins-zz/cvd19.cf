/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Table, Tag } from 'antd';
import { TableT, TableTColumn } from '../../../types';
import calcTagstyle from '../../../utilities/calCcolor';

// TODO: Add summary row to every table
export const ATable3ColData = ({ table }: TableT, order: Boolean) => {
  const preparedData = table.data.map((e, i) => ({
    key: i,
    name: e.name,
    'periods[2]': e.periods[2].newDeaths,
    rate2: e.periods[2].status,
    'periods[1]': e.periods[1].newDeaths,
    rate1: e.periods[1].status,
    'periods[0]': e.periods[0].newDeaths,
    rate0: e.periods[0].status,
  }));
  // console.log(table, order);
  const columns: TableTColumn[] = [
    {
      title: table.columns[0].Header,
      dataIndex: table.columns[0].id,
      // defaultSortOrder: 'ascend',
      sorter: (a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
      },
    },
    {
      title: table.columns[1].Header,
      dataIndex: 'periods[2]',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(preparedData[index].rate2)}
          key={index}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: table.columns[2].Header,
      dataIndex: 'periods[1]',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(preparedData[index].rate1)}
          key={index}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: table.columns[3].Header,
      dataIndex: 'periods[0]',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(preparedData[index].rate0)}
          key={index}
        >
          {text}
        </Tag>
      ),
      // TODO: Set 1-st table default sortin to ascend
      defaultSortOrder	: order ? 'acsend' : 'descend',
      sortDirections : ['ascend', 'descend'],
      sorter: (a, b) => a.['periods[0]'] - b.['periods[0]'],
    },
  ];
  return (
    <Table
      columns={columns}
      bordered
      dataSource={preparedData}
      size="small"
      pagination={{ pageSize: 30 }}
      scroll={{ y: 480 }}
    />
  );
};

export const ATable5ColChange = ({ table }: TableT, order: Boolean) => {
  const preparedData = table.data.map((e, i) => ({
    key: i,
    name: e.name,
    'periods[5]': e.periods[5].growthRate,
    rate5: e.periods[5].status,
    'periods[4]': e.periods[4].growthRate,
    rate4: e.periods[4].status,
    'periods[3]': e.periods[3].growthRate,
    rate3: e.periods[3].status,
    'periods[2]': e.periods[2].growthRate,
    rate2: e.periods[2].status,
    'periods[1]': e.periods[1].growthRate,
    rate1: e.periods[1].status,
    'periods[0]': e.periods[0].growthRate,
    rate0: e.periods[0].status,
  }));
  // console.log(table, order);
  const columns: TableTColumn[] = [
    {
      title: table.columns[0].Header,
      dataIndex: table.columns[0].id,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
      },
    },
    {
      title: table.columns[1].Header,
      dataIndex: 'periods[5]',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(preparedData[index].rate5)}
          key={index}
        >
          {text}{'%'}
        </Tag>
      ),
      defaultSortOrder  : order ? 'acsend' : 'descend',
      sortDirections : ['ascend', 'descend'],
      sorter: (a, b) => a.['periods[5]'] - b.['periods[5]'],
    },
    {
      title: table.columns[2].Header,
      dataIndex: 'periods[4]',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(preparedData[index].rate4)}
          key={index}
        >
          {text}{'%'}
        </Tag>
      ),
      defaultSortOrder  : order ? 'acsend' : 'descend',
      sortDirections : ['ascend', 'descend'],
      sorter: (a, b) => a.['periods[4]'] - b.['periods[4]'],
    },
    {
      title: table.columns[3].Header,
      dataIndex: 'periods[3]',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(preparedData[index].rate3)}
          key={index}
        >
          {text}{'%'}
        </Tag>
      ),
      defaultSortOrder  : order ? 'acsend' : 'descend',
      sortDirections : ['ascend', 'descend'],
      sorter: (a, b) => a.['periods[3]'] - b.['periods[3]'],
    },
    ,
    {
      title: table.columns[4].Header,
      dataIndex: 'periods[2]',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(preparedData[index].rate2)}
          key={index}
        >
          {text}{'%'}
        </Tag>
      ),
      defaultSortOrder  : order ? 'acsend' : 'descend',
      sortDirections : ['ascend', 'descend'],
      sorter: (a, b) => a.['periods[2]'] - b.['periods[2]'],
    },
    {
      title: table.columns[5].Header,
      dataIndex: 'periods[1]',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(preparedData[index].rate1)}
          key={index}
        >
          {text}{'%'}
        </Tag>
      ),
      defaultSortOrder  : order ? 'acsend' : 'descend',
      sortDirections : ['ascend', 'descend'],
      sorter: (a, b) => a.['periods[1]'] - b.['periods[1]'],
    },,
    {
      title: table.columns[6].Header,
      dataIndex: 'periods[0]',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(preparedData[index].rate0)}
          key={index}
        >
          {text}{'%'}
        </Tag>
      ),
      defaultSortOrder  : order ? 'acsend' : 'descend',
      sortDirections : ['ascend', 'descend'],
      sorter: (a, b) => a.['periods[0]'] - b.['periods[0]'],
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
//
export const ATable5ColNewCases = ({ table }: TableT, order: Boolean) => {
  const preparedData = table.data.map((e, i) => ({
    key: i,
    name: e.name,
    'periods[5]': e.periods[5].newCases,
    rate5: e.periods[5].status,
    'periods[4]': e.periods[4].newCases,
    rate4: e.periods[4].status,
    'periods[3]': e.periods[3].newCases,
    rate3: e.periods[3].status,
    'periods[2]': e.periods[2].newCases,
    rate2: e.periods[2].status,
    'periods[1]': e.periods[1].newCases,
    rate1: e.periods[1].status,
    'periods[0]': e.periods[0].newCases,
    rate0: e.periods[0].status,
  }));
  // console.log(table, order);
  const columns: TableTColumn[] = [
    {
      title: table.columns[0].Header,
      dataIndex: table.columns[0].id,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
      },
    },
    {
      title: table.columns[1].Header,
      dataIndex: 'periods[5]',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(preparedData[index].rate5)}
          key={index}
        >
          {text}
        </Tag>
      ),
      defaultSortOrder  : order ? 'acsend' : 'descend',
      sortDirections : ['ascend', 'descend'],
      sorter: (a, b) => a.['periods[5]'] - b.['periods[5]'],
    },
    {
      title: table.columns[2].Header,
      dataIndex: 'periods[4]',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(preparedData[index].rate4)}
          key={index}
        >
          {text}
        </Tag>
      ),
      defaultSortOrder  : order ? 'acsend' : 'descend',
      sortDirections : ['ascend', 'descend'],
      sorter: (a, b) => a.['periods[4]'] - b.['periods[4]'],
    },
    {
      title: table.columns[3].Header,
      dataIndex: 'periods[3]',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(preparedData[index].rate3)}
          key={index}
        >
          {text}
        </Tag>
      ),
      defaultSortOrder  : order ? 'acsend' : 'descend',
      sortDirections : ['ascend', 'descend'],
      sorter: (a, b) => a.['periods[3]'] - b.['periods[3]'],
    },
    ,
    {
      title: table.columns[4].Header,
      dataIndex: 'periods[2]',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(preparedData[index].rate2)}
          key={index}
        >
          {text}
        </Tag>
      ),
      defaultSortOrder  : order ? 'acsend' : 'descend',
      sortDirections : ['ascend', 'descend'],
      sorter: (a, b) => a.['periods[2]'] - b.['periods[2]'],
    },
    {
      title: table.columns[5].Header,
      dataIndex: 'periods[1]',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(preparedData[index].rate1)}
          key={index}
        >
          {text}
        </Tag>
      ),
      defaultSortOrder  : order ? 'acsend' : 'descend',
      sortDirections : ['ascend', 'descend'],
      sorter: (a, b) => a.['periods[1]'] - b.['periods[1]'],
    },,
    {
      title: table.columns[6].Header,
      dataIndex: 'periods[0]',
      render: (text, row, index) => (
        <Tag
          color={calcTagstyle(preparedData[index].rate0)}
          key={index}
        >
          {text}
        </Tag>
      ),
      defaultSortOrder  : order ? 'acsend' : 'descend',
      sortDirections : ['ascend', 'descend'],
      sorter: (a, b) => a.['periods[0]'] - b.['periods[0]'],
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