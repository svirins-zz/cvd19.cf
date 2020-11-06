import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Table } from "antd";
import { SummaryTable } from "@types";
import { getPeriodNames, constructData, constructColumns } from "lib";
const TotalTable = ({
  data,
  periodLength,
  kind,
  order = true,
  variation,
  multiplyer = 1,
}: SummaryTable) => {
  if (!data) {
    return null;
  }
  const periodNames = useMemo(() => getPeriodNames(periodLength), [
    periodLength,
  ]);
  const columns = useMemo(
    () => constructColumns(variation, multiplyer, kind, periodNames),
    [kind, periodNames, variation, multiplyer]
  );

  const table = useTable({ columns, data });
  const { columnData, preparedData } = constructData(
    table,
    kind,
    variation,
    order,
    multiplyer
  );
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
