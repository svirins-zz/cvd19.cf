import { Datum } from "@nivo/line";
import { COLORS, X_ASIS_TICKS_AMOUNT } from "const";
import { ChartInfo, OutbreakStatus, CountriesList, Country, Period } from "../@types";

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
  let menuItem = "";
  switch (title) {
    case "/": {
      menuItem = "main";
      break;
    }
    case "/data": {
      menuItem = "data";
      break;
    }
    case "/map": {
      menuItem = "map";
      break;
    }
    case "/about": {
      menuItem = "about";
      break;
    }
    default: {
      menuItem = "";
    }
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

export const getTagColor = (rate: OutbreakStatus): string => {
  let color = "none";
  switch (rate) {
    case "No Outbreak": {
      color = "grey";
      break;
    }
    case "Small Outbreak": {
      color = "pink";
      break;
    }
    case "Losing": {
      color = "red";
      break;
    }
    case "Flattening the Curve": {
      color = "volcano";
      break;
    }
    case "Crushing the Curve": {
      color = "orange";
      break;
    }
    case "Winning": {
      color = "cyan";
      break;
    }
    case "Won": {
      color = "green";
      break;
    }
    default: {
      color = "grey";
    }
  }
  return color;
};

export const getColor = (index: number): string => {
  const colorNum = index < 10 ? index : index % 10;
  return COLORS[colorNum];
};

export const getCountriesList = (countries: Country[]): CountriesList[] =>
  countries.map((country, index) => ({
    id: index,
    label: country.name ?? "",
  }));
export const makeDatum = (periods: Period[], yValue: string, multiplyer: number): Datum[] => {
  const thereshold = Math.floor(periods.length / (X_ASIS_TICKS_AMOUNT * multiplyer)) 
  const datum: Datum[] = periods.map((period, index) => {
    if (index === 0 || index === periods.length - 1
        || index % thereshold === 0) {
          return({"key": index, "x": period.endDate, "y": Number(period.[yValue])})
    } 
  }).filter((e) => e ).reverse();
  return datum;
}