import React from "react";
import { ResponsiveLine, Serie, Datum } from "@nivo/line"
import { DataChartProps, Selected } from "@types";
import { getColorByCountryName, hexToHsl } from "lib";
import { X_ASIS_TICKS_AMOUNT } from 'const';

const NivoGlobal = ({
  countries,
  colors,
  selectedCountries,
  x,
  y,
  startAtDeaths,
  title,
}: DataChartProps) => {
  const selected: Selected = {};
  selectedCountries.forEach((tag) => {
    selected[tag] = getColorByCountryName(tag, colors);
  });
  const chartData: Serie[] = [] 
  console.log(countries)
  countries.map((e, i) => {
    if (
      e.name === undefined ||
      !Object.keys(selected).includes(e.name) ||
      (e.name === "Global" &&
        !Object.keys(selected).includes(e.name))
    ) {
      return undefined;
    }
    const periods = startAtDeaths
      ? e.periodsWithDeaths.slice(0)
      : e.periods.slice(0)
      console.log("periods: ", periods);
    // fill array with first and last values
    const thereshold = Math.floor(periods.length / X_ASIS_TICKS_AMOUNT -2)
    console.log("thereshold", thereshold)
    const preparedPeriods: Datum[] = []
    periods.map((period, index) => {
      if (index === 0 || index === periods.length - 1
          || index % (periods.length % thereshold) === 0) {
            preparedPeriods.push({"x": period.endDate, "y": period.[y]})
      } 
      console.log("preparedPeriods: ", preparedPeriods);
      chartData.push({
        "id": e.name,
        "key": i,
        "data": preparedPeriods,
      }) 
    });
  })
  console.log(chartData)
  return (
  //   <ResponsiveLine
  //     data={chartData}
  //     margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      
  // />
  <p>df</p> 
  )
}

export default NivoGlobal