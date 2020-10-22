/* eslint-disable react/require-default-props */
import React from 'react';
import { useTable, Column } from 'react-table';
import {
  Period, Country, SummaryTable5Columns, SummaryTable3Columns,
} from '@types';
import { getPeriodNames } from 'lib';
import {
  ATable3Col,
  ATable5ColGrowth,
  ATable5ColNewCases,
  ATable5ColTotalCases,
  ATable5ColTotalDeaths,
  ATable5ColNewDeaths,
} from './renderTables';

export const TotalCasesTable = ({
  data,
  periodLength,
}: SummaryTable5Columns) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [
    periodLength,
  ]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'name',
      },
      {
        Header: periodNames[5],
        accessor: 'periods[5]',
        Cell: ({ value }: { value: Period }) => value.totalCases,
      },
      {
        Header: periodNames[4],
        accessor: 'periods[4]',
        Cell: ({ value }: { value: Period }) => value.totalCases,
      },
      {
        Header: periodNames[3],
        accessor: 'periods[3]',
        Cell: ({ value }: { value: Period }) => value.totalCases,
      },
      {
        Header: periodNames[2],
        accessor: 'periods[2]',
        Cell: ({ value }: { value: Period }) => value.totalCases,
      },
      {
        Header: periodNames[1],
        accessor: 'periods[1]',
        Cell: ({ value }: { value: Period }) => value.totalCases,
      },
      {
        Header: periodNames[0],
        accessor: 'periods[0]',
        Cell: ({ value }: { value: Period }) => value.totalCases,
      },
    ],
    [periodNames],
  ) as Array<Column<Country>>;

  const preparedTableObject = useTable({ columns, data });
  return <ATable5ColTotalCases table={preparedTableObject} />;
};

export const NewCasesTable = ({
  data,
  periodLength,
}: SummaryTable5Columns) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [
    periodLength,
  ]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'name',
      },
      {
        Header: periodNames[5],
        accessor: 'periods[5]',
        Cell: ({ value }: { value: Period }) => value.newCases,
      },
      {
        Header: periodNames[4],
        accessor: 'periods[4]',
        Cell: ({ value }: { value: Period }) => value.newCases,
      },
      {
        Header: periodNames[3],
        accessor: 'periods[3]',
        Cell: ({ value }: { value: Period }) => value.newCases,
      },
      {
        Header: periodNames[2],
        accessor: 'periods[2]',
        Cell: ({ value }: { value: Period }) => value.newCases,
      },
      {
        Header: periodNames[1],
        accessor: 'periods[1]',
        Cell: ({ value }: { value: Period }) => value.newCases,
      },
      {
        Header: periodNames[0],
        accessor: 'periods[0]',
        Cell: ({ value }: { value: Period }) => value.newCases,
      },
    ],
    [periodNames],
  ) as Array<Column<Country>>;

  const preparedTableObject = useTable({ columns, data });
  return <ATable5ColNewCases table={preparedTableObject} />;
};

export const TotalDeathsTable = ({
  data,
  periodLength,
}: SummaryTable5Columns) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [
    periodLength,
  ]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'name',
      },
      {
        Header: periodNames[5],
        accessor: 'periods[5]',
        Cell: ({ value }: { value: Period }) => value.totalDeaths,
      },
      {
        Header: periodNames[4],
        accessor: 'periods[4]',
        Cell: ({ value }: { value: Period }) => value.totalDeaths,
      },
      {
        Header: periodNames[3],
        accessor: 'periods[3]',
        Cell: ({ value }: { value: Period }) => value.totalDeaths,
      },
      {
        Header: periodNames[2],
        accessor: 'periods[2]',
        Cell: ({ value }: { value: Period }) => value.totalDeaths,
      },
      {
        Header: periodNames[1],
        accessor: 'periods[1]',
        Cell: ({ value }: { value: Period }) => value.totalDeaths,
      },
      {
        Header: periodNames[0],
        accessor: 'periods[0]',
        Cell: ({ value }: { value: Period }) => value.totalDeaths,
      },
    ],
    [periodNames],
  ) as Array<Column<Country>>;

  const preparedTableObject = useTable({ columns, data });
  return <ATable5ColTotalDeaths table={preparedTableObject} />;
};

export const NewDeathsTable = ({
  data,
  periodLength,
}: SummaryTable5Columns) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [
    periodLength,
  ]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'name',
      },
      {
        Header: periodNames[5],
        accessor: 'periods[5]',
        Cell: ({ value }: { value: Period }) => value.newDeaths,
      },
      {
        Header: periodNames[4],
        accessor: 'periods[4]',
        Cell: ({ value }: { value: Period }) => value.newDeaths,
      },
      {
        Header: periodNames[3],
        accessor: 'periods[3]',
        Cell: ({ value }: { value: Period }) => value.newDeaths,
      },
      {
        Header: periodNames[2],
        accessor: 'periods[2]',
        Cell: ({ value }: { value: Period }) => value.newDeaths,
      },
      {
        Header: periodNames[1],
        accessor: 'periods[1]',
        Cell: ({ value }: { value: Period }) => value.newDeaths,
      },
      {
        Header: periodNames[0],
        accessor: 'periods[0]',
        Cell: ({ value }: { value: Period }) => value.newDeaths,
      },
    ],
    [periodNames],
  ) as Array<Column<Country>>;

  const preparedTableObject = useTable({ columns, data });
  return <ATable5ColNewDeaths table={preparedTableObject} />;
};

export const GrowthTable = ({
  data,
  periodLength,
}: SummaryTable5Columns) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [
    periodLength,
  ]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'name',
      },
      {
        Header: periodNames[5],
        accessor: 'periods[5]',
        Cell: ({ value }: { value: Period }) => value,
      },
      {
        Header: periodNames[4],
        accessor: 'periods[4]',
        Cell: ({ value }: { value: Period }) => value,
      },
      {
        Header: periodNames[3],
        accessor: 'periods[3]',
        Cell: ({ value }: { value: Period }) => value,
      },
      {
        Header: periodNames[2],
        accessor: 'periods[2]',
        Cell: ({ value }: { value: Period }) => value,
      },
      {
        Header: periodNames[1],
        accessor: 'periods[1]',
        Cell: ({ value }: { value: Period }) => value,
      },
      {
        Header: periodNames[0],
        accessor: 'periods[0]',
        Cell: ({ value }: { value: Period }) => value,
      },
    ],
    [periodNames],
  ) as Array<Column<Country>>;
  const preparedTableObject = useTable({ columns, data });
  return <ATable5ColGrowth table={preparedTableObject} />;
};

export const GrowthSummaryTable = ({
  data,
  periodLength,
  order = true,
}: SummaryTable3Columns) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [
    periodLength,
  ]);
  const columns = React.useMemo(() => {
    const country = data.length > 1
      ? [
        {
          Header: 'Country',
          accessor: 'name',
        },
      ]
      : [];
    return [
      ...country,
      ...[
        {
          Header: periodNames[2],
          accessor: 'periofalseds[2]',
          Cell: ({ value }: { value: Period }) => value.newDeaths,
        },
        {
          Header: periodNames[1],
          accessor: 'periods[1]',
          Cell: ({ value }: { value: Period }) => value.newDeaths,
        },
        {
          Header: periodNames[0],
          accessor: 'periods[0]',
          Cell: ({ value }: { value: Period }) => value.newDeaths,
        },
      ],
    ];
  }, [data.length, periodNames]) as Array<Column<Country>>;

  const preparedTableObject = useTable({ columns, data });

  return <ATable3Col table={preparedTableObject} order={order} />;
};
