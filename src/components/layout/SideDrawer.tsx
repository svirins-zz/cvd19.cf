import React from 'react';
import { Typography, Table, Tag } from 'antd';
import { calcTagstyle } from 'lib';
import { OutbreakStatus } from '@types';

const { Paragraph } = Typography;

const SideDrawer = () => {
  const data = [
    {
      key: '1',
      status: 'No Outbreak',
      descr: 'There have been no deaths',
    },
    {
      key: '2',
      status: 'Small Outbreak',
      descr: 'There have been less than 10 deaths',
    },
    {
      key: '3',
      status: 'Losing',
      descr: 'Deaths rose by 100% or more or stayed above 1000',
    },
    {
      key: '4',
      status: 'Flattening the Curve',
      descr: ' Deaths did not double, but did increase or stay above 100',
    },
    {
      key: '5',
      status: 'Crushing the Curve',
      descr: 'Deaths decreased by 50% or more or to below 50',
    },
    {
      key: '6',
      status: 'Winning',
      descr: 'New deaths decreased to below 10',
    },
    {
      key: '7',
      status: 'Won',
      descr: 'We have had no new deaths for two periods',
    },
  ];
  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: OutbreakStatus, row: number, index: number) => (
        <Tag
          color={calcTagstyle(text)}
          key={index}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'descr',
      key: 'descr',
    },
  ];

  return (
    <>
      <Table
        showHeader={false}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <Paragraph>
        The items below all cover a single period, unless otherwise stated.
      </Paragraph>
      <Paragraph>
        A single period is 5-days by default, though you can set your own period.
      </Paragraph>
    </>
  );
};

export default SideDrawer;
