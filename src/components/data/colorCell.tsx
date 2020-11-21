import { commafy, getColorByStatus } from "lib";

import { OutbreakStatus, TableType } from "@types";

export const ColorCell = (
  text: number,
  status: OutbreakStatus,
  field: TableType
) => {
  const cellValue = `${field === "growthRate" ? text : commafy(text)}`;
  return {
    props: {
      style: { background: `${getColorByStatus(status)}7a` },
    },
    children: cellValue,
  };
};
