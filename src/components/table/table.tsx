import { Table as AntTable } from "antd";
import { constructColumns, constructData, getPeriodNames } from "lib";
import React, { useMemo } from "react";
import { useTable } from "react-table";

import { SummaryTable } from "@types";

export const Table = ({
  data,
  periodLength,
  kind,
  order = true,
  variation,
  multiplyer = 1,
}: SummaryTable): JSX.Element => {
  const periodNames = useMemo(() => getPeriodNames(periodLength), [
    periodLength,
  ]);
  const columns = useMemo(
    () => constructColumns(variation, multiplyer, kind, periodNames),
    [kind, periodNames, variation, multiplyer]
  );
  const { data: tableData, columns: excessiveColumns } = useTable({ columns, data });
  const tableColumns  = excessiveColumns.map((e) => {
    return {
      Header: e.Header as string,
      id: e.id
    };
  });
  const { columnData, preparedData } = constructData(
    tableData,
    tableColumns,
    kind,
    variation,
    order,
    multiplyer
  );
  return (
    <AntTable
      columns={columnData}
      bordered={true}
      dataSource={preparedData}
      size="small"
      pagination={{ pageSize: 50 }}
      scroll={{ y: 600 }}
    />
  );
};
