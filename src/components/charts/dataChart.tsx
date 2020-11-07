import React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";

import { PlaceholderChart } from "./placeholderChart";
import { DataChartProps, Selected } from "@types";
import { makeDatum } from "lib";
import { theme } from "../../styles/chartsTheme";

export const DataChart = ({
  countries,
  selectedCountries,
  yValue,
  isStartAtDeaths,
  multiplyer,
}: DataChartProps) => {
  const chartData: Serie[] = [];
  const colors = selectedCountries!.map((country) => country.color);
  countries.map((e, i) => {
    const isSelectedcountry: Selected | undefined = selectedCountries?.find(
      (country) => country.name === e.name
    );
    if (
      e.name === undefined ||
      !isSelectedcountry ||
      (e.name === "Global" && !isSelectedcountry)
    ) {
      return undefined;
    }
    const periods = isStartAtDeaths
      ? e.periodsWithDeaths.slice(0)
      : e.periods.slice(0);
    const preparedPeriods = makeDatum(periods, yValue, multiplyer);
    chartData.push({
      id: e.name,
      key: e.name,
      data: preparedPeriods.reverse(),
    });
  });
  if (chartData.length === 0) return <PlaceholderChart />;
  return (
    <ResponsiveLine
      theme={theme}
      colors={colors}
      curve="monotoneX"
      yScale={{ type: "linear", min: "auto", max: "auto" }}
      data={chartData}
      margin={{ top: 60, right: 10, bottom: 60, left: 55 }}
      useMesh={true}
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          justify: false,
          translateX: 10,
          translateY: 10,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
          
        },
      ]}
    />
  );
};
