import { ColorCell } from "components/ui";

import {
  Col,
  Column,
  ConstructedColumn,
  Country,
  Period,
  Sorter,
  TableIntersection,
  TableType,
} from "@types";

const alphabeticalSorter: Sorter = (a, b) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1;
  }
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  return 0;
};
// TODO: refactor to a shorter version. Must follow DRY!

export const constructColumns = (
  variation: "tight" | "wide",
  multiplyer: number,
  field: TableType,
  periodNames: string[]
): ConstructedColumn[] => {
  const head: ConstructedColumn[] = [
    {
      Header: "Country",
      accessor: "name",
    },
  ];
  let middle: ConstructedColumn[] = [];
  if (variation === "tight" || (variation === "wide" && multiplyer <= 0.75)) {
    middle = [];
  } else {
    middle = [
      {
        Header: periodNames[4],
        accessor: "periods[4]",
        Cell: ({ value }: { value: Period & "" }) => Number(value[field]),
      },
      {
        Header: periodNames[3],
        accessor: "periods[3]",
        Cell: ({ value }: { value: Period & "" }) => Number(value[field]),
      },
    ];
  }
  const tail: ConstructedColumn[] = [
    {
      Header: periodNames[2],
      accessor: "periods[2]",
      Cell: ({ value }: { value: Period & "" }) => Number(value[field]),
    },
    {
      Header: periodNames[1],
      accessor: "periods[1]",
      Cell: ({ value }: { value: Period & "" }) => Number(value[field]),
    },
    {
      Header: periodNames[0],
      accessor: "periods[0]",
      Cell: ({ value }: { value: Period & "" }) => Number(value[field]),
    },
  ];
  return [...head, ...middle, ...tail];
};
// TODO: refactor to a shorter version. Must follow DRY!
export const constructData = (
  tableData: Country[],
  tableСolumns: Col[],
  field: TableType,
  variation: "tight" | "wide",
  order: boolean,
  multiplyer: number
): { columnData: Column[]; preparedData: TableIntersection[] } => {
  const preparedData = tableData.map((e, i) => {
    if (variation === "tight" || (variation === "wide" && multiplyer <= 0.75)) {
      return {
        key: i,
        name: e.name,
        "periods[2]": e.periods[2][field],
        rate2: e.periods[2].status,
        "periods[1]": e.periods[1][field],
        rate1: e.periods[1].status,
        "periods[0]": e.periods[0][field],
        rate0: e.periods[0].status,
      };
    }
    return {
      key: i,
      name: e.name,
      "periods[4]": e.periods[4][field],
      rate4: e.periods[4].status,
      "periods[3]": e.periods[3][field],
      rate3: e.periods[3].status,
      "periods[2]": e.periods[2][field],
      rate2: e.periods[2].status,
      "periods[1]": e.periods[1][field],
      rate1: e.periods[1].status,
      "periods[0]": e.periods[0][field],
      rate0: e.periods[0].status,
    };
  });

  const head: Column[] = [
    {
      title: tableСolumns[0].Header,
      dataIndex: tableСolumns[0].id,
      sorter: alphabeticalSorter,
    },
  ];

  let tail: Column[] = [];
  if (variation === "tight" || (variation === "wide" && multiplyer <= 0.75)) {
    tail = [
      {
        title: tableСolumns[1].Header,
        dataIndex: "periods[2]",
        align: "center",
        render: (text, record) => ColorCell(text, record.rate2, TableType.NewDeaths),
        sorter: (a, b) => a["periods[2]"] - b["periods[2]"],
      },
      {
        title: tableСolumns[2].Header,
        dataIndex: "periods[1]",
        align: "center",
        render: (text, record) => ColorCell(text, record.rate1, TableType.NewDeaths),
        sorter: (a, b) => a["periods[1]"] - b["periods[1]"],
      },
      {
        title: tableСolumns[3].Header,
        dataIndex: "periods[0]",
        align: "center",
        render: (text, record) => ColorCell(text, record.rate0, TableType.NewDeaths),
        sorter: (a, b) => b["periods[0]"] - a["periods[0]"],
        defaultSortOrder: order ? "ascend" : "descend",
      },
    ];
  } else {
    // fallback undefined protection
    
    tail = [
      {
        title: tableСolumns[1].Header,
        dataIndex: "periods[4]",
        align: "center",
        render: (text, record) => ColorCell(text, record.rate4, field),
        sorter: (a, b) => a["periods[4]"] - b["periods[4]"],
      },
      {
        title: tableСolumns[2].Header,
        dataIndex: "periods[3]",
        align: "center",
        render: (text, record) => ColorCell(text, record.rate3, field),
        sorter: (a, b) => a["periods[3]"] - b["periods[3]"],
      },
      {
        title: tableСolumns[3].Header,
        dataIndex: "periods[2]",
        align: "center",
        render: (text, record) => ColorCell(text, record.rate2, field),
        sorter: (a, b) => a["periods[2]"] - b["periods[2]"],
      },
      {
        title: tableСolumns[4].Header,
        dataIndex: "periods[1]",
        align: "center",
        render: (text, record) => ColorCell(text, record.rate1, field),
        sorter: (a, b) => a["periods[1]"] - b["periods[1]"],
      },
      {
        title: tableСolumns[5].Header,
        dataIndex: "periods[0]",
        align: "center",
        render: (text, record) => ColorCell(text, record.rate0, field),
        sorter: (a, b) => b["periods[0]"] - a["periods[0]"],
        defaultSortOrder: order ? "ascend" : "descend",
      },
    ];
  }
  const columnData: Column[] = [...head, ...tail];
  return { columnData, preparedData };
};
