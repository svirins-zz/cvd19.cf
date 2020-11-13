import { ColorTag } from "components/data";
import { TableInstance } from "react-table";

import {
  Column,
  ConstructedColumn,
  Country,
  Period,
  Sorter,
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
) => {
  const head: ConstructedColumn[] = [
    {
      Header: "Country",
      accessor: "name",
      Cell: ({ value }: { value: Period & "" }) => undefined,
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
  table: TableInstance<Country>,
  field: TableType,
  variation: "tight" | "wide",
  order: boolean,
  multiplyer: number
) => {
  const preparedData = table.data.map((e, i) => {
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
      title: table.columns[0].Header,
      dataIndex: table.columns[0].id,
      sorter: alphabeticalSorter,
    },
  ];

  let tail: Column[] = [];
  if (variation === "tight" || (variation === "wide" && multiplyer <= 0.75)) {
    tail = [
      {
        title: table.columns[1].Header,
        dataIndex: "periods[2]",
        align: "center",
        render: (text, record) => ColorTag(text, record.rate2, "newDeaths"),
        sorter: (a, b) => a["periods[2]"] - b["periods[2]"],
      },
      {
        title: table.columns[2].Header,
        dataIndex: "periods[1]",
        align: "center",
        render: (text, record) => ColorTag(text, record.rate1, "newDeaths"),
        sorter: (a, b) => a["periods[1]"] - b["periods[1]"],
      },
      {
        title: table.columns[3].Header,
        dataIndex: "periods[0]",
        align: "center",
        render: (text, record) => ColorTag(text, record.rate0, "newDeaths"),
        sorter: (a, b) => b["periods[0]"] - a["periods[0]"],
        defaultSortOrder: order ? "ascend" : "descend",
      },
    ];
  } else {
    tail = [
      {
        title: table.columns[1].Header,
        dataIndex: "periods[4]",
        align: "center",
        render: (text, record) => ColorTag(text, record.rate4!, field),
        sorter: (a, b) => a["periods[4]"]! - b["periods[4]"]!,
      },
      {
        title: table.columns[2].Header,
        dataIndex: "periods[3]",
        align: "center",
        render: (text, record) => ColorTag(text, record.rate3!, field),
        sorter: (a, b) => a["periods[3]"]! - b["periods[3]"]!,
      },
      {
        title: table.columns[3].Header,
        dataIndex: "periods[2]",
        align: "center",
        render: (text, record) => ColorTag(text, record.rate2, field),
        sorter: (a, b) => a["periods[2]"] - b["periods[2]"],
      },
      {
        title: table.columns[4].Header,
        dataIndex: "periods[1]",
        align: "center",
        render: (text, record) => ColorTag(text, record.rate1, field),
        sorter: (a, b) => a["periods[1]"] - b["periods[1]"],
      },
      {
        title: table.columns[5].Header,
        dataIndex: "periods[0]",
        align: "center",
        render: (text, record) => ColorTag(text, record.rate0, field),
        sorter: (a, b) => b["periods[0]"] - a["periods[0]"],
        defaultSortOrder: order ? "ascend" : "descend",
      },
    ];
  }
  const columnData: Column[] = [...head, ...tail];
  return { columnData, preparedData };
};
