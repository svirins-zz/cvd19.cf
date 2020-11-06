import React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import { makeDatum } from "lib";
import { PlaceholderChart } from "./placeholderChart";
import { SummaryChartProps } from "@types";
import { theme } from "../../styles/chartsTheme";

export const AreaChart = ({ periods, multiplyer, type }: SummaryChartProps) => (

        { name: "% Flattening / Losing", symbol: { fill: "#f5222d" } },
        {
          name: "% None / Small / Crushing / Winning / Won",#52c41a
          symbol: { fill: "#52c41a" },
        },
        { name: "% With Cases or Deaths", symbol: { fill: "#f5222d" } },
        { name: "% Pandemic Free", symbol: { fill: "#52c41a" } },