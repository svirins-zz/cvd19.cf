/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Table } from 'antd';
import { Period } from '../../../utilities/types/data';

const ATable = ({ table }) => {
  const columns = [
    {
      title: 'Country',
      dataIndex: 'country',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.country - b.country,
    },
  ];



  return (
    <Table columns={columns} dataSource={data} onChange={handleChange} />
  );
};
export default ATable;
