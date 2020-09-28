/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Table, Tag } from 'antd';
import calcTagColor from '../../../utilities/calcTagcolor'
// TODO: play with multiple sorters - hierarchy
const ATable = ({ table }) => {
  const columns = [
    {
      title: table.columns[0].Header,
      dataIndex: table.columns[0].id,
      // defaultSortOrder: 'descend',
      sorter: (a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
      },
    },
    {
      title: table.columns[1].Header,
      dataIndex: 'periods[2]',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.newDeaths - b.newDeaths,
      // TODO: color tagging based on deatRate value
      // render: num => (<Tag color={calcTagColor(num)}>{num}</Tag>),
    },
    {
      title: table.columns[2].Header,
      dataIndex: 'periods[1]',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.newDeaths - b.newDeaths,
    },
    {
      title: table.columns[3].Header,
      dataIndex: 'periods[0]',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.newDeaths - b.newDeaths,
    },
  ];
  const slicedData = table.data.slice(0, 20);
  const preparedData = slicedData.map((e, i) => ({
    key: i,
    name: e.name,
    'periods[0]': e.periods[0].newDeaths,
    'periods[1]': e.periods[1].newDeaths,
    'periods[2]': e.periods[2].newDeaths,
  }));
  return (
    <Table
      columns={columns}
      dataSource={preparedData}
      size="small"
      pagination={false}
    />
  );
};
export default ATable;
