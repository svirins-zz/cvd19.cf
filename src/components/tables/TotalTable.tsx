import React from "react";
import { useTable, Column } from "react-table";
import { Table } from "antd";
import { Country, SummaryTable } from "@types";
import {
  getPeriodNames,
  construct6Col,
  construct4Col,
  constructData6Col,
  constructData4Col,
} from "lib";
// TODO: Totalcases 6 col table does not fit/ consider country column to be float
const TotalTable = ({
  data,
  periodLength,
  kind,
  order,
  size,
}: SummaryTable) => {
  const periodNames = getPeriodNames(periodLength);
  const columns =
    size === 6
      ? construct6Col("totalCases", periodNames)
      : construct4Col("newDeaths", periodNames);
  const table = useTable({ columns, data });
  const { columnData, preparedData } =
    size === 6
      ? constructData6Col(table, kind)
      : constructData4Col(table, kind, order);
  return (
    <Table
      columns={columnData}
      bordered={true}
      dataSource={preparedData}
      size="small"
      pagination={{ pageSize: 50 }}
      scroll={{ y: 600 }}
    />
  );
};

export default TotalTable;
