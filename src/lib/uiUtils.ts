import { COLORS } from "const";
import { ChartInfo, OutbreakStatus, Tags, Country } from "../@types";

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
  const colorNum = index < 7 ? index : index % 7;
  return COLORS[colorNum];
};

// TODO: double check refactoring find -> filter
export const getColorByCountryName = (
  countryName: string,
  countriesArray: Tags[]
): string => countriesArray.filter((e) => e.label === countryName)[0].value;

export const getTags = (countries: Country[]): Tags[] =>
  countries.map((country, index) => ({
    id: index,
    label: country.name ?? "",
    value: getColor(index),
  }));

/**
 * Converts hex color string to hsl object
 * @param color color string in hex representation
 */
export const hexToHsl = (color: string): string => {
  const red = parseInt(color.substr(1, 2), 16) / 255;
  const green = parseInt(color.substr(3, 2), 16) / 255;
  const blue = parseInt(color.substr(5, 2), 16) / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  const delta = max - min;

  let hue;
  if (delta === 0) {
    hue = 0;
  } else if (max === red) {
    hue = 60 * (((green - blue) / delta) % 6);
  } else if (max === green) {
    hue = 60 * ((green - blue) / delta + 2);
  } else if (max === blue) {
    hue = 60 * ((green - blue) / delta + 4);
  }

  const luminance = (max + min) / 2;
  const saturation =
    delta === 0 ? 0 : delta / (1 - Math.abs(2 * luminance - 1));

  return `hsl(${hue}, ${saturation}%, ${luminance}%)`;
};
