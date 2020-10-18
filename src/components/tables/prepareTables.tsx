import React from 'react';
import {
  useTable, Column,
} from 'react-table';
import { Period, Country } from '@types';
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
  data, periodLength,
}: {
  data: Country[],
  periodLength: number
}) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [periodLength]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'name',
      },
      {
        Header: periodNames[5],
        accessor: 'periods[5]',
        Cell: ({ value }: { value: Period }) => value?.totalCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      },
      {
        Header: periodNames[4],
        accessor: 'periods[4]',
        Cell: ({ value }: { value: Period }) => value?.totalCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      },
      {
        Header: periodNames[3],
        accessor: 'periods[3]',
        Cell: ({ value }: { value: Period }) => value?.totalCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      },
      {
        Header: periodNames[2],
        accessor: 'periods[2]',
        Cell: ({ value }: { value: Period }) => value?.totalCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      },
      {
        Header: periodNames[1],
        accessor: 'periods[1]',
        Cell: ({ value }: { value: Period }) => value?.totalCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      },
      {
        Header: periodNames[0],
        accessor: 'periods[0]',
        Cell: ({ value }: { value: Period }) => value?.totalCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      },
    ],
    [periodNames],
  ) as Array<Column<Country>>;

  const preparedTableObject = useTable({ columns, data });
  return (
    <ATable5ColTotalCases table={preparedTableObject} order={false} />
  );
};

export const NewCasesTable = ({
  data, periodLength,
}: {
  data: Country[],
  periodLength: number
}) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [periodLength]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'name',
      },
      {
        Header: periodNames[5],
        accessor: 'periods[5]',
        Cell: ({ value }: { value: Period }) => value?.newCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      },
      {
        Header: periodNames[4],
        accessor: 'periods[4]',
        Cell: ({ value }: { value: Period }) => value?.newCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      },
      {
        Header: periodNames[3],
        accessor: 'periods[3]',
        Cell: ({ value }: { value: Period }) => value?.newCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      },
      {
        Header: periodNames[2],
        accessor: 'periods[2]',
        Cell: ({ value }: { value: Period }) => value?.newCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      },
      {
        Header: periodNames[1],
        accessor: 'periods[1]',
        Cell: ({ value }: { value: Period }) => value?.newCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      },
      {
        Header: periodNames[0],
        accessor: 'periods[0]',
        Cell: ({ value }: { value: Period }) => value?.newCases.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      },
    ],
    [periodNames],
  ) as Array<Column<Country>>;

  const preparedTableObject = useTable({ columns, data });
  return (
    <ATable5ColNewCases table={preparedTableObject} order={false} />
  );
};

export const TotalDeathsTable = ({
  data, periodLength,
}: {
  data: Country[],
  periodLength: number
}) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [periodLength]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'name',
      },
      {
        Header: periodNames[5],
        accessor: 'periods[5]',
        Cell: ({ value }: { value: Period }) => value?.totalDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
      },
      {
        Header: periodNames[4],
        accessor: 'periods[4]',
        Cell: ({ value }: { value: Period }) => value?.totalDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
      },
      {
        Header: periodNames[3],
        accessor: 'periods[3]',
        Cell: ({ value }: { value: Period }) => value?.totalDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
      },
      {
        Header: periodNames[2],
        accessor: 'periods[2]',
        Cell: ({ value }: { value: Period }) => value?.totalDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
      },
      {
        Header: periodNames[1],
        accessor: 'periods[1]',
        Cell: ({ value }: { value: Period }) => value?.totalDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
      },
      {
        Header: periodNames[0],
        accessor: 'periods[0]',
        Cell: ({ value }: { value: Period }) => value?.totalDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
      },
    ],
    [periodNames],
  ) as Array<Column<Country>>;

  const preparedTableObject = useTable({ columns, data });
  return (
    <ATable5ColTotalDeaths table={preparedTableObject} order={false} />
  );
};

export const NewDeathsTable = ({
  data, periodLength,
}: {
  data: Country[],
  periodLength: number
}) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [periodLength]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'name',
      },
      {
        Header: periodNames[5],
        accessor: 'periods[5]',
        Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
      },
      {
        Header: periodNames[4],
        accessor: 'periods[4]',
        Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
      },
      {
        Header: periodNames[3],
        accessor: 'periods[3]',
        Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
      },
      {
        Header: periodNames[2],
        accessor: 'periods[2]',
        Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
      },
      {
        Header: periodNames[1],
        accessor: 'periods[1]',
        Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
      },
      {
        Header: periodNames[0],
        accessor: 'periods[0]',
        Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) ?? '',
      },
    ],
    [periodNames],
  ) as Array<Column<Country>>;

  const preparedTableObject = useTable({ columns, data });
  return (
    <ATable5ColNewDeaths table={preparedTableObject} order />
  );
};

export const GrowthTable = ({
  data, periodLength,
}: {
  data: Country[],
  periodLength: number
}) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [periodLength]);
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
  return (
    <ATable5ColGrowth table={preparedTableObject} order={false} />
  );
};

export const GrowthSummaryTable = ({
  data,
  periodLength,
  desc,
}: {
  data: Country[],
  periodLength: number,
  desc: boolean,
}) => {
  const periodNames = React.useMemo(() => getPeriodNames(periodLength), [periodLength]);
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
          Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) ?? '',
        },
        {
          Header: periodNames[1],
          accessor: 'periods[1]',
          Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) ?? '',
        },
        {
          Header: periodNames[0],
          accessor: 'periods[0]',
          Cell: ({ value }: { value: Period }) => value?.newDeaths.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) ?? '',
        },
      ],
    ];
  }, [data.length, periodNames]) as Array<Column<Country>>;

  const preparedTableObject = useTable({ columns, data });

  return (
    <ATable3Col table={preparedTableObject} order={desc} />
  );
};
