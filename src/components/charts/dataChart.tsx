import { makeDatum, slicePeriods } from "lib";
import React from "react";
import { theme } from "styles/chartsTheme";

import { ResponsiveLine, Serie } from "@nivo/line";
import { DataChartProps } from "@types";

import { PlaceholderChart } from "./placeholderChart";

export const DataChart = ({
  data,
  selectedCountries,
  yValue,
  isStartAtDeaths,
  isstartAtLast90Days,
  periodLength,
  multiplyer
}: DataChartProps): JSX.Element => {
  console.log("Datachart renders ___________________________________________________________________")
  console.log(  "data: ", data,
    "selectedCountries: ", selectedCountries,
    "yValue: ", yValue,
    "isStartAtDeaths: ", isStartAtDeaths,
    "isstartAtLast90Days", isstartAtLast90Days,
    "periodLength: ", periodLength,
    "multiplyer:", multiplyer)
  const chartData: Serie[] = [];
  // filter and equalize data
  const filtered = data
  .filter((country) => selectedCountries
    .find((selected) => selected.name === country.name))
  const slicedPeriods = slicePeriods(filtered, isStartAtDeaths, isstartAtLast90Days, periodLength)  
  // prepare serie
  slicedPeriods.map((e) => {
    const preparedPeriods = makeDatum(e.periods, yValue, multiplyer, isstartAtLast90Days);
    chartData.push({
      id: e.name,
      key: e.name,
      data: preparedPeriods.reverse(),
    });
  });
  // prepare colors, sord chart data by selectedcountries
  const colors = selectedCountries.map((country) => country.color)
  const sorting = selectedCountries.map((country) => country.name)
  chartData.sort(function(a, b){  
    return sorting.indexOf(a.id.toString()) - sorting.indexOf(b.id.toString());
  });

  if (chartData.length === 0) return <PlaceholderChart />;
  return (
    <ResponsiveLine
      theme={theme}
      colors={colors}
      curve="monotoneX"
      yScale={{ type: "linear", min: "auto", max: "auto" }}
      data={chartData}
      margin={{ top: 55, right: 55, bottom: 55, left: 55 }}
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
