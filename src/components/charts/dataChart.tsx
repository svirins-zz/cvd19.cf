import React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import PlaceholderChart from "./PlaceholderChart";
import { DataChartProps } from "@types";
import { makeDatum, getColorByCountryName } from "lib";
import { theme } from "../../styles/chartsTheme";

const Datachart = ({
  countries,
  selectedCountries,
  yValue,
  isStartAtDeaths,
}: DataChartProps) => {
  const chartData: Serie[] = [];
  const colors = selectedCountries!.map((country) => country.color);
  countries.map((e, i) => {
    if (
      e.name === undefined ||
      !selectedCountries?.find((country) => country.name === e.name) ||
      (e.name === "Global" &&
        !selectedCountries?.find((country) => country.name === e.name))
    ) {
      return undefined;
    }
    const periods = isStartAtDeaths
      ? e.periodsWithDeaths.slice(0)
      : e.periods.slice(0);
    const preparedPeriods = makeDatum(periods, yValue);
    chartData.push({
      id: e.name,
      key: e.name,
      data: preparedPeriods,
    });
  });
  if (chartData.length === 0) return <PlaceholderChart />;
  // TODO: change areaBaselineValue if yValue=growthRate
  return (
    <ResponsiveLine
      theme={theme}
      colors={colors}
      data={chartData}
      margin={{ top: 40, right: 10, bottom: 40, left: 55 }}
    />
  );
};

export default Datachart;
