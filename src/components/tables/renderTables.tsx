import React from 'react';
import { Table, Tag, Typography, Tooltip } from 'antd';
import { TableT, TableTColumn } from '../../types';
import calcTagstyle from '../../utilities/calCcolor';
import getCountry from '../../utilities/countryUtils';
import ReactCountryFlag from 'react-country-flag';
import vsvg from '../assets/vessel.svg';
import { isNonEmptyArray } from '@apollo/client/utilities';

{/* <Vessel className="vesselSize" />; */}

const {Text} = Typography;

// TODO: Add summary row to every table

export const ATable3Col = ({ table }: TableT, order: boolean) => {

  const preparedData = table.data.map((e, i) => ({
    key: i,
    name: e.name,
    countryCode: getCountry(e.name),
    'periods[2]': e.periods[2].newDeaths,
    rate2: e.periods[2].status,
    'periods[1]': e.periods[1].newDeaths,
    rate1: e.periods[1].status,
    'periods[0]': e.periods[0].newDeaths,
    rate0: e.periods[0].status,
  }));
  const columns: TableTColumn[] = [
    {
      title: table.columns[0].Header,
      dataIndex: table.columns[0].id,
      sorter: (a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
      },
      // render: (text, row, index) => (
      //   <>
      //   <ReactCountryFlag svg countryCode={preparedData[index].countryCode} />
      //   {text} 
      //   </>
      // ), 
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
export const ATable5ColGrowth = ({ table }: TableT, order: Boolean ) => {
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
  console.log(preparedData);
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
      scroll={{ y: 600 }}SWZ
    />
  );
};
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
export const ATable5ColTotalCases = ({ table }: TableT, order?: Boolean) => {
  const preparedData = table.data.map((e, i) => ({
    key: i,
    name: e.name,
    'periods[5]': e.periods[5].totalCases,
    rate5: e.periods[5].status,
    'periods[4]': e.periods[4].totalCases,
    rate4: e.periods[4].status,
    'periods[3]': e.periods[3].totalCases,
    rate3: e.periods[3].status,
    'periods[2]': e.periods[2].totalCases,
    rate2: e.periods[2].status,
    'periods[1]': e.periods[1].totalCases,
    rate1: e.periods[1].status,
    'periods[0]': e.periods[0].totalCases,
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
export const ATable5ColTotalDeaths = ({ table }: TableT, order?: Boolean) => {
  const preparedData = table.data.map((e, i) => ({
    key: i,
    name: e.name,
    'periods[5]': e.periods[5].totalDeaths,
    rate5: e.periods[5].status,
    'periods[4]': e.periods[4].totalDeaths,
    rate4: e.periods[4].status,
    'periods[3]': e.periods[3].totalDeaths,
    rate3: e.periods[3].status,
    'periods[2]': e.periods[2].totalDeaths,
    rate2: e.periods[2].status,
    'periods[1]': e.periods[1].totalDeaths,
    rate1: e.periods[1].status,
    'periods[0]': e.periods[0].totalDeaths,
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
export const ATable5ColNewDeaths = ({ table }: TableT, order?: Boolean) => {
  const preparedData = table.data.map((e, i) => ({
    key: i,
    name: e.name,
    'periods[5]': e.periods[5].newDeaths,
    rate5: e.periods[5].status,
    'periods[4]': e.periods[4].newDeaths,
    rate4: e.periods[4].status,
    'periods[3]': e.periods[3].newDeaths,
    rate3: e.periods[3].status,
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

export const ATable5Col = ({ table }: TableT, order?: Boolean, dataType: String) => {
  let percentSymbol: String = '';
  let preparedData;
  switch (dataType) {
  case "Growth": { 
      console.log(dataType)
      preparedData = table.data.map((e, i) => ({
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
    percentSymbol = ' %';
    break;
  }
  case "NewCases": { 
      console.log(dataType)
      preparedData = table.data.map((e, i) => ({
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
    break;
  }
  case "TotalCases": { 
      console.log(dataType)
      preparedData = table.data.map((e, i) => ({
      key: i,
      name: e.name,
      'periods[5]': e.periods[5].totalCases,
      rate5: e.periods[5].status,
      'periods[4]': e.periods[4].totalCases,
      rate4: e.periods[4].status,
      'periods[3]': e.periods[3].totalCases,
      rate3: e.periods[3].status,
      'periods[2]': e.periods[2].totalCases,
      rate2: e.periods[2].status,
      'periods[1]': e.periods[1].totalCases,
      rate1: e.periods[1].status,
      'periods[0]': e.periods[0].totalCases,
      rate0: e.periods[0].status,
    })); 
    break;
  }
  case "TotalDeaths": { 
      console.log(dataType)
      preparedData = table.data.map((e, i) => ({
      key: i,
      name: e.name,
      'periods[5]': e.periods[5].totalDeaths,
      rate5: e.periods[5].status,
      'periods[4]': e.periods[4].totalDeaths,
      rate4: e.periods[4].status,
      'periods[3]': e.periods[3].totalDeaths,
      rate3: e.periods[3].status,
      'periods[2]': e.periods[2].totalDeaths,
      rate2: e.periods[2].status,
      'periods[1]': e.periods[1].totalDeaths,
      rate1: e.periods[1].status,
      'periods[0]': e.periods[0].totalDeaths,
      rate0: e.periods[0].status,
    })); 
    break;
  }
  case "NewDeaths": { 
      console.log(dataType)
      preparedData = table.data.map((e, i) => ({
      key: i,
      name: e.name,
      'periods[5]': e.periods[5].newDeaths,
      rate5: e.periods[5].status,
      'periods[4]': e.periods[4].newDeaths,
      rate4: e.periods[4].status,
      'periods[3]': e.periods[3].newDeaths,
      rate3: e.periods[3].status,
      'periods[2]': e.periods[2].newDeaths,
      rate2: e.periods[2].status,
      'periods[1]': e.periods[1].newDeaths,
      rate1: e.periods[1].status,
      'periods[0]': e.periods[0].newDeaths,
      rate0: e.periods[0].status,
    })); 
    break;
  }
  default: {
    preparedData = []
  }
}

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
          {text}{percentSymbol}
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
          {text}{percentSymbol}
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
          {text}{percentSymbol}
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
          {text}{percentSymbol}
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
          {text}{percentSymbol}
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
