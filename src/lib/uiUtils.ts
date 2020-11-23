import { COLORS, X_ASIS_TICKS_AMOUNT } from "const";

import { Datum } from "@nivo/line";

import {
  ChartInfo,
  CountriesList,
  Country,
  OutbreakStatus,
  Period,
} from "../@types";

export const getChartInfo = (
  selectedTable: string,
  period: number
): ChartInfo => {
  if (selectedTable === "growthRate") {
    return {
      x: "endDate",
      y: "growthRate",
      title: "Change in deaths between periods",
    };
  }
  if (selectedTable === "newDeaths") {
    return {
      x: "endDate",
      y: "newDeaths",
      title: `New deaths by ${period}-day period`,
    };
  }
  if (selectedTable === "totalDeaths") {
    return {
      x: "endDate",
      y: "totalDeaths",
      title: "Total deaths by date",
    };
  }
  if (selectedTable === "newCases") {
    return {
      x: "endDate",
      y: "newCases",
      title: `New cases by ${period}-day period`,
    };
  }
  if (selectedTable === "totalCases") {
    return {
      x: "endDate",
      y: "totalCases",
      title: "Total cases by date",
    };
  }
  return {
    x: "",
    y: "",
    title: "",
  };
};

export const menuInit = (title: string): string => {
  let menuItem = "main";
  if (title.includes("data")) {
    menuItem = "data";
  } else if (title.includes("map")) {
    menuItem = "map";
  } else if (title.includes("about")) {
    menuItem = "about";
  } else {
    menuItem = "main";
  }
  return menuItem;
};

export const commafy = (value: number): string => {
  const toStrValue = `${value}`;
  return toStrValue
    .split("")
    .reverse()
    .reduce((prev, current, index) => {
      const shouldComma =
        (index + 1) % 3 === 0 && index + 1 < toStrValue.length;
      let updatedValue = `${prev}${current}`;
      if (shouldComma) {
        updatedValue = `${updatedValue},`;
      }
      return updatedValue;
    }, "")
    .split("")
    .reverse()
    .join("");
};

export const getColorByStatus = (rate: OutbreakStatus): string => {
  let color = "none";
  switch (rate) {
    case "No Outbreak": {
      color = "#808080";
      break;
    }
    case "Small Outbreak": {
      color = "#eb2f96";
      break;
    }
    case "Losing": {
      color = "#f5222d";
      break;
    }
    case "Flattening the Curve": {
      color = "#fa541c";
      break;
    }
    case "Crushing the Curve": {
      color = "#fa8c16";
      break;
    }
    case "Winning": {
      color = "#13c2c2";
      break;
    }
    case "Won": {
      color = "#52c41a";
      break;
    }
    default: {
      color = "#808080";
    }
  }
  return color;
};

export const getColor = (index: number): string => {
  const colorNum = index < 10 ? index : index % 10;
  return COLORS[colorNum];
};

/**
 * prepare countries list to feed countries filter
 *
 * @param {Country[]} countries
 * @return {*}  {CountriesList[]}
 */

export const getCountriesList = (countries: Country[]): CountriesList[] =>
  countries.map((country, index) => ({
    id: index,
    label: country.name ?? "",
  }));


export const makeDatum = (
  periods: Period[],
  yValue: string,
  multiplyer: number
): Datum[] => {
  const thereshold = Math.floor(
    periods.length / (X_ASIS_TICKS_AMOUNT * multiplyer)
  );
  const datum: Datum[] = [];
  periods.forEach((period:  Period, index: number) => {
    if (
      index === 0 ||
      index === periods.length - 1 ||
      index % thereshold === 0
    ) {
      datum.push({
        key: index,
        x: period.endDate,
        y: Number(period[yValue]).toFixed(2),
      });
    }
  });
  return datum;
};
