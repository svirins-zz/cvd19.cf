import { Properties, Feature, Geometry, CodeFlagGeo, Countries } from "@types";
import { getCode } from "country-list";
import {
  MISSING_COUNTRIES,
  ALL_COUNTRIES_DATA,
  VESSELS_CURRENT_COORDS,
} from "const";
import vessel from "assets/vessel.png";

/**
 * add missing countries names
 *
 * @param {string} countryName
 * @return {*}  {string}
 */
const getMissingCode = (countryName: string): string => {
  const element = MISSING_COUNTRIES.find((el) => el.longName === countryName);
  return element!.shortName;
};

/**
 * get center point per country
 *
 * @param {string} code
 * @param {string} name
 * @return {*}
 */
const getCoords = (code: string, name: string) => {
  if (name === "MS Zaandam" || name === "Diamond Princess") {
    return VESSELS_CURRENT_COORDS[name];
  }
  const element = ALL_COUNTRIES_DATA.find((e) => e.country_code === code);
  return [Number(element!.latlng[1]), Number(element!.latlng[0])];
};
/**
 * get country properties
 *
 * @param {string} countryName
 * @return {*}  {CodeFlagGeo}
 */
export const getCountryExtData = (countryName: string): CodeFlagGeo => {
  const code = !getCode(countryName)
    ? getMissingCode(countryName)
    : getCode(countryName) ?? "";
  const flag: string =
    code === "VESSEL"
      ? vessel
      : `https://www.countryflags.io/${code?.toLowerCase()}/flat/64.png`;
  const geometry: Geometry = {
    type: "Point",
    coordinates: getCoords(code ?? "", countryName),
  };
  return { code, flag, geometry };
};

/**
 * get marker size and color based on confirmed cases
 *
 * @param {number} totalCases
 * @return {*}
 */
export const getClassNameByCases = (totalCases: number) => {
  if (totalCases < 99) {
    return "icon-marker-small";
  }
  if (totalCases < 9999 && totalCases > 99) {
    return "icon-marker-normal";
  }
  if (totalCases < 99999 && totalCases > 9999) {
    return "icon-marker-large";
  }
  if (totalCases < 999999 && totalCases > 99999) {
    return "icon-marker-extra-large";
  }
  if (totalCases > 999999) {
    return "icon-marker-super-large";
  }
  return "icon-marker-normal";
};

/**
 * construct FeatureCollection object
 *
 * @param {(Countries | undefined)} data
 * @return {*}
 */
export const makeFeatures = (data: Countries | undefined) => {
  const features: Feature[] = [];
  data!.countries.forEach((country) => {
    const { code, flag, geometry } = getCountryExtData(country.name);
    const { confirmed, deaths, recovered } = country.results[
      data!.countries.length - 1
    ];
    const bounds = undefined;
    const properties: Properties = {
      flag,
      bounds,
      confirmed,
      deaths,
      recovered,
      code,
      name: country.name,
    };
    features.push({
      properties,
      geometry,
      type: "Feature",
    });
  });
  return {
    features,
    type: "FeatureCollection",
  };
};
/**
 * extract Marker and Popup properties from feature.properties
 *
 * @param {Properties} properties
 * @return {*} 
 */
export const getDataFromProperties = (properties: Properties) => {
  const { name, flag, confirmed, deaths, recovered } = properties;
  const header = `<img src="${flag}" name="flag"><div>${name}</div>`;
  const stats = [
    {
      label: "Confirmed",
      value: confirmed,
      type: "number",
    },
    {
      label: "Deaths",
      value: deaths,
      type: "number",
    },
    {
      label: "Recovered",
      value: recovered,
      type: "number",
    },
  ];
  let statsString = "";
  stats.forEach(({ label, value }) => {
    statsString = `
      ${statsString}
      <li><strong>${label}:</strong> ${value}</li>
    `;
  });
  const casesString = stats.find(({ label }) => label === "Confirmed")?.value;
  const iconClass = getClassNameByCases(confirmed);

  return { header, statsString, casesString, iconClass };
};
