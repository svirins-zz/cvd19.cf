import React from "react";
import {
  VictoryChart,
  VictoryLegend,
  VictoryAxis,
  VictoryLabel,
  VictoryArea,
} from "victory";
import { PeriodSummary } from "@types";
import Theme from "styles/chartTheme";

const PandemicFreeChart = ({
  data,
  title,
}: {
  data: PeriodSummary[];
  title: string;
}) => (
  <VictoryChart theme={Theme} height={240} width={600} minDomain={{ y: 0 }}>
    <VictoryLegend
      x={325}
      y={20}
      itemsPerRow={1}
      orientation="horizontal"
      gutter={20}
      centerTitle
      style={{
        labels: {
          fontSize: 5,
          fontFamily: `"Open Sans", "Droid Sans Mono",
          "Liberation Mono", Menlo, Courier, monospace`,
        },
      }}
      data={[
        { name: "% With Cases or Deaths", symbol: { fill: "#f5222d" } },
        { name: "% Pandemic Free", symbol: { fill: "#52c41a" } },
      ]}
    />
    <VictoryAxis
      fixLabelOverlap
      style={{
        tickLabels: { fontSize: 6 },
      }}
    />
    <VictoryAxis
      dependentAxis
      style={{
        tickLabels: { fontSize: 6 },
      }}
    />
    <VictoryLabel
      text={title}
      x={50}
      y={25}
      style={{
        fontSize: 10,
        fontFamily: `"Open Sans", Consolas, "Roboto Mono", "Droid Sans Mono",
            "Liberation Mono", Menlo, Courier, monospace`,
        fontWeight: 600,
      }}
    />
    <VictoryLabel
      text="source: JHU & CSSE"
      x={50}
      y={35}
      style={{
        fontSize: 5.5,
        fontFamily: `"Open Sans", Consolas, "Roboto Mono", "Droid Sans Mono",
            "Liberation Mono", Menlo, Courier, monospace`,
        color: "Gray",
      }}
    />
    <VictoryArea
      data={data}
      interpolation="monotoneX"
      style={{
        data: {
          fill: "#f5222d",
          fillOpacity: 0.5,
          stroke: "#f5222d",
          strokeWidth: 0,
        },
      }}
      x="endDate"
      y={() => 100}
      y0="pandemicFree"
    />
    <VictoryArea
      data={data}
      interpolation="monotoneX"
      style={{
        data: {
          fill: "#52c41a",
          fillOpacity: 0.5,
          stroke: "#52c41a",
          strokeWidth: 2,
        },
      }}
      x="endDate"
      y="pandemicFree"
    />
  </VictoryChart>
);

export default PandemicFreeChart;
