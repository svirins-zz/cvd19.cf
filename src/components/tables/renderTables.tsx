import React from 'react';
import { Table, Tag } from 'antd';
import { Country } from '@types';
import { TableInstance, Column } from 'react-table';
import { calcTagstyle, commafy, sortOptions, textSorter } from 'lib';

// TODO: Refactor everythin to ForEach ?? is it possbible

export const ATable3Col = ({ table }: { table: TableInstance<Country> }, order: boolean )  => {
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
          color={calcTagstyle(preparedData[index].rate2)}
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
          color={calcTagstyle(preparedData[index].rate1)}
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
          color={calcTagstyle(preparedData[index].rate0)}
          key={index}
        >
          {commafy(text)}
        </Tag>
      ),
      // TODO: Set 1-st table default sortin to ascend
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
// TODO: implement constructData

// const constructDara = (table: TableInstance<Country>, field: string, tableType: '3col' | '5col' ) => {
//   const gr='growthRate'
//   return table.data.map((e, i) => ({
//     key: i,
//     name: e.name,
//     'periods[5]': e.periods[5][gr],
//     rate5: e.periods[5].status,
//     'periods[4]': e.periods[4][gr],
//     rate4: e.periods[4].status,
//     'periods[3]': e.periods[3][gr],
//     rate3: e.periods[3].status,
//     'periods[2]': e.periods[2][gr],
//     rate2: e.periods[2].status,
//     'periods[1]': e.periods[1][gr],
//     rate1: e.periods[1].status,
//     'periods[0]': e.periods[0][gr],
//     rate0: e.periods[0].status,
//   }))
// }


export const ATable5ColGrowth = ({ table }: {table: TableInstance<Country>}, order: boolean ) => {
  // const preparedData = constructTable(table)
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
          color={calcTagstyle(preparedData[index].rate5)}
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
          color={calcTagstyle(preparedData[index].rate4)}
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
          color={calcTagstyle(preparedData[index].rate3)}
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
          color={calcTagstyle(preparedData[index].rate2)}
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
          color={calcTagstyle(preparedData[index].rate1)}
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
          color={calcTagstyle(preparedData[index].rate0)}
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
export const ATable5ColNewCases = ({ table }: {table: TableInstance<Country>}, order: boolean ) => {
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
          color={calcTagstyle(preparedData[index].rate5)}
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
          color={calcTagstyle(preparedData[index].rate4)}
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
          color={calcTagstyle(preparedData[index].rate3)}
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
          color={calcTagstyle(preparedData[index].rate2)}
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
          color={calcTagstyle(preparedData[index].rate1)}
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
          color={calcTagstyle(preparedData[index].rate0)}
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
export const ATable5ColTotalCases = ({ table }: {table: TableInstance<Country>}, order: boolean ) => {
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
          color={calcTagstyle(preparedData[index].rate5)}
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
          color={calcTagstyle(preparedData[index].rate4)}
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
          color={calcTagstyle(preparedData[index].rate3)}
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
          color={calcTagstyle(preparedData[index].rate2)}
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
          color={calcTagstyle(preparedData[index].rate1)}
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
          color={calcTagstyle(preparedData[index].rate0)}
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
export const ATable5ColTotalDeaths = ({ table }: {table: TableInstance<Country>}, order: boolean ) => {
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
          color={calcTagstyle(preparedData[index].rate5)}
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
          color={calcTagstyle(preparedData[index].rate4)}
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
          color={calcTagstyle(preparedData[index].rate3)}
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
          color={calcTagstyle(preparedData[index].rate2)}
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
          color={calcTagstyle(preparedData[index].rate1)}
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
          color={calcTagstyle(preparedData[index].rate0)}
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
export const ATable5ColNewDeaths = ({ table }: {table: TableInstance<Country>}, order: boolean ) => {
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
          color={calcTagstyle(preparedData[index].rate5)}
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
          color={calcTagstyle(preparedData[index].rate4)}
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
          color={calcTagstyle(preparedData[index].rate3)}
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
          color={calcTagstyle(preparedData[index].rate2)}
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
          color={calcTagstyle(preparedData[index].rate1)}
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
          color={calcTagstyle(preparedData[index].rate0)}
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

