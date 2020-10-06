import React from 'react';
import {
  VictoryChart, VictoryLine, VictoryAxis, VictoryLabel,
} from 'victory';
import { DataChartProps, Selected } from '../../types';
import Theme from '../../styles/chartTheme';

const selectedColors = [
  '#cccccc',
  '#eb2f96',
  '#fa8c16',
  '#fadb14',
  '#13c2c2',
  '#52c41a',
];

const AllDataChart = ({
  countries, x, y, tags, showAll, startAtDeaths,
}: DataChartProps) => {
  const selected: Selected = {};
  // TODO: consider colors below
  tags.forEach(
    (tag, index) => {
      selected[tag.name] = selectedColors[index];
    },
  );
  return (
    <>
      <VictoryChart
        theme={Theme}
        height={240}
        width={600}
        domainPadding={{ x: [0, -4], y: [0, 1] }}
        minDomain={{ y: 0 }}
      >
        <VictoryAxis fixLabelOverlap />
        <VictoryAxis dependentAxis />
        <VictoryLabel
          text="source: JHU & CSSE"
          x={80}
          y={60}
          style={{
            fontSize: 6,
            fontFamily: `"Open Sans", Consolas, "Roboto Mono", "Droid Sans Mono",
            "Liberation Mono", Menlo, Courier, monospace`,
          }}
        />
        {countries.map((country) => {
          if (
            country.name === undefined
            || (!showAll && !Object.keys(selected).includes(country.name))
            || (country.name === 'Global' && !Object.keys(selected).includes(country.name))
          ) {
            return undefined;
          }
          const data = Object.keys(selected).includes(country.name)
            ? {
              stroke: selected[country.name],
              strokeWidth: 1.8,
            }
            : {
              strokeWidth: 1,
            };
          const periods = startAtDeaths
            ? country.periodsWithDeaths.slice(0).reverse()
            : country.periods.slice(0).reverse();
          return (
            <VictoryLine
              key={country.name}
              data={periods}
              interpolation="monotoneX"
              style={{ data }}
              x={startAtDeaths
                ? ''
                : x}
              y={y}
            />
          );
        })}
      </VictoryChart>
    </>
  );
};

export default AllDataChart;
