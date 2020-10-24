import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from "victory";
import { DataChartProps, Selected } from "@types";
import Theme from "styles/chartTheme";
import { getColorByCountryName } from "lib";

const GlobalDataChart = ({
  countries,
  countriesT,
  selectedCountries,
  x,
  y,
  startAtDeaths,
  title,
}: DataChartProps) => {
  const selected: Selected = {};
  selectedCountries.forEach((tag) => {
    selected[tag] = getColorByCountryName(tag, countriesT);
  });
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
        {countries.map((country) => {
          if (
            country.name === undefined ||
            !Object.keys(selected).includes(country.name) ||
            (country.name === "Global" &&
              !Object.keys(selected).includes(country.name))
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
              x={startAtDeaths ? "" : x}
              y={y}
            />
          );
        })}
      </VictoryChart>
    </>
  );
};

export default GlobalDataChart;
