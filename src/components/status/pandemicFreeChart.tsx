import React from 'react';
import {
  VictoryChart, VictoryLegend, VictoryAxis, VictoryLabel, VictoryArea,
} from 'victory';
import { PeriodSummary } from '../../utilities/types/data';
import Theme from '../shared/layout/chartTheme';

const PandemicFreeChart = ({ data }: { data: PeriodSummary[] }) => (
  <VictoryChart
    theme={Theme}
    height={240}
    width={600}
    minDomain={{ y: 0 }}
  >
    <VictoryLegend
      x={220}
      y={20}
      orientation="horizontal"
      gutter={20}
      centerTitle
      style={{
        labels: {
          fontSize: 6,
          fontFamily: `"Ubuntu", "Droid Sans Mono",
          "Liberation Mono", Menlo, Courier, monospace`,
        },
      }}
      data={[
        { name: '% With Cases or Deaths', symbol: { fill: 'lightcoral' } },
        { name: '% Pandemic Free', symbol: { fill: 'lightgreen' } },
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
      text="source: JHU & CSSE"
      x={495}
      y={60}
      style={{
        fontSize: 6,
        fontFamily: `"Ubuntu", "Droid Sans Mono",
            "Liberation Mono", Menlo, Courier, monospace`,
      }}
    />
    <VictoryArea
      data={data}
      interpolation="monotoneX"
      style={{
        data: {
          fill: 'lightcoral',
          fillOpacity: 0.5,
          stroke: 'lightcoral',
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
          fill: 'lightgreen',
          fillOpacity: 0.5,
          stroke: 'lightgreen',
          strokeWidth: 2,
        },
      }}
      x="endDate"
      y="pandemicFree"
    />
  </VictoryChart>
);

export default PandemicFreeChart;
