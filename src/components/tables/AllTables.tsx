import React from 'react';
import { useTable, Column } from 'react-table';
import { Table } from 'antd';
import { Country, SummaryTable } from '@types';
import {
  getPeriodNames, construct6Col, construct4Col, constructData6Col,
  constructData4Col,
} from 'lib';
// TODO: refactor everything
export const TotalCasesTable = ({
  data,
  periodLength,
}: SummaryTable) => {
  const periodNames = getPeriodNames(periodLength);
  const columns = construct6Col('totalCases', periodNames) as Array<Column<Country>>;
  const table = useTable({ columns, data });
  const { columnData, preparedData } = constructData6Col(table, 'totalCases', true);
  console.log(columnData, preparedData);
  return (
    <Table
      columns={columnData}
      bordered
      dataSource={preparedData}
      size="small"
      pagination={{ pageSize: 50 }}
      scroll={{ y: 600 }}
    />
  );
};

export const NewCasesTable = ({
  data,
  periodLength,
}: SummaryTable) => {
  const periodNames = getPeriodNames(periodLength);
  const columns = construct6Col('newCases', periodNames) as Array<Column<Country>>;
  const table = useTable({ columns, data });
  const { columnData, preparedData } = constructData6Col(table, 'newCases', true);
  return (
    <Table
      columns={columnData}
      bordered
      dataSource={preparedData}
      size="small"
      pagination={{ pageSize: 50 }}
      scroll={{ y: 600 }}
    />
  );
};

export const TotalDeathsTable = ({
  data,
  periodLength,
}: SummaryTable) => {
  const periodNames = getPeriodNames(periodLength);
  const columns = construct6Col('totalDeaths', periodNames) as Array<Column<Country>>;
  const table = useTable({ columns, data });
  const { columnData, preparedData } = constructData6Col(table, 'totalDeaths', true);
  return (
    <Table
      columns={columnData}
      bordered
      dataSource={preparedData}
      size="small"
      pagination={{ pageSize: 50 }}
      scroll={{ y: 600 }}
    />
  );
};

export const NewDeathsTable = ({
  data,
  periodLength,
}: SummaryTable) => {
  const periodNames = getPeriodNames(periodLength);
  const columns = construct6Col('newDeaths', periodNames) as Array<Column<Country>>;
  const table = useTable({ columns, data });
  const { columnData, preparedData } = constructData6Col(table, 'newDeaths', true);
  return (
    <Table
      columns={columnData}
      bordered
      dataSource={preparedData}
      size="small"
      pagination={{ pageSize: 50 }}
      scroll={{ y: 600 }}
    />
  );
};

export const GrowthTable = ({
  data,
  periodLength,
}: SummaryTable) => {
  const periodNames = getPeriodNames(periodLength);
  const columns = construct6Col('growthRate', periodNames) as Array<Column<Country>>;
  const table = useTable({ columns, data });
  const { columnData, preparedData } = constructData6Col(table, 'growthRate', true);
  return (
    <Table
      columns={columnData}
      bordered
      dataSource={preparedData}
      size="small"
      pagination={{ pageSize: 50 }}
      scroll={{ y: 600 }}
    />
  );
};

export const GrowthSummaryTable = ({
  data,
  periodLength,
  order = true,
}: SummaryTable) => {
  const periodNames = getPeriodNames(periodLength);
  const columns = construct4Col('newDeaths', periodNames) as Array<Column<Country>>;
  const table = useTable({ columns, data });
  const { columnData, preparedData } = constructData4Col(table, 'newDeaths', order);
  return (
    <Table
      columns={columnData}
      bordered
      dataSource={preparedData}
      size="small"
      pagination={{ pageSize: 30 }}
      scroll={{ y: 550 }}
    />
  );
};
