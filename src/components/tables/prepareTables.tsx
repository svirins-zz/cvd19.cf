import React from 'react';
import { useTable, Column } from 'react-table';
import { Country, SummaryTable } from '@types';
import { getPeriodNames, constructColumns, constructColumnsSm } from 'lib';
import {
  ATable3Col,
  ATable5ColGrowth,
  ATable5ColNewCases,
  ATable5ColTotalCases,
  ATable5ColTotalDeaths,
  ATable5ColNewDeaths,
} from './renderTables';
// refactor everything table-related to 1 file
export const TotalCasesTable = ({
  data,
  periodLength,
}: SummaryTable) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength),
    [periodLength]);
  const columns = React.useMemo(() => constructColumns('totalCases', periodNames),
    [periodNames]) as Array<Column<Country>>;
  const preparedTableObject = useTable({ columns, data });
  return <ATable5ColTotalCases table={preparedTableObject} />;
};

export const NewCasesTable = ({
  data,
  periodLength,
}: SummaryTable) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength),
    [periodLength]);
  const columns = React.useMemo(() => constructColumns('newCases', periodNames),
    [periodNames]) as Array<Column<Country>>;
  const preparedTableObject = useTable({ columns, data });
  return <ATable5ColNewCases table={preparedTableObject} />;
};

export const TotalDeathsTable = ({
  data,
  periodLength,
}: SummaryTable) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength),
    [periodLength]);
  const columns = React.useMemo(() => constructColumns('totalDeaths', periodNames),
    [periodNames]) as Array<Column<Country>>;
  const preparedTableObject = useTable({ columns, data });
  return <ATable5ColTotalDeaths table={preparedTableObject} />;
};

export const NewDeathsTable = ({
  data,
  periodLength,
}: SummaryTable) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength),
    [periodLength]);
  const columns = React.useMemo(() => constructColumns('newDeaths', periodNames),
    [periodNames]) as Array<Column<Country>>;
  const preparedTableObject = useTable({ columns, data });
  return <ATable5ColNewDeaths table={preparedTableObject} />;
};

export const GrowthTable = ({
  data,
  periodLength,
}: SummaryTable) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength),
    [periodLength]);
  const columns = React.useMemo(() => constructColumns('growthRate', periodNames),
    [periodNames]) as Array<Column<Country>>;
  const preparedTableObject = useTable({ columns, data });
  return <ATable5ColGrowth table={preparedTableObject} />;
};

export const GrowthSummaryTable = ({
  data,
  periodLength,
}: SummaryTable) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [
    periodLength,
  ]);
  const columns = React.useMemo(() => constructColumnsSm('newDeaths', periodNames),
    [periodNames]) as Array<Column<Country>>;
  const preparedTableObject = useTable({ columns, data });
  return <ATable3Col table={preparedTableObject} />;
};
