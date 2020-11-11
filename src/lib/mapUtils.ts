import vessel from "assets/vessel.png";
import {
  ALL_COUNTRIES_DATA,
  MISSING_COUNTRIES,
  SVG_MARKERS,
  VESSELS_CURRENT_COORDS
} from "const";
import { getCode } from "country-list";
import { LatLngExpression } from "leaflet";

import { CodeFlagGeo, Countries, Feature, Geometry, Properties } from "@types";

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
const getCoords = (code: string, name: string): LatLngExpression => {
  if (name === "MS Zaandam" || name === "Diamond Princess") {
    return VESSELS_CURRENT_COORDS[name] as LatLngExpression;
  }
  const element = ALL_COUNTRIES_DATA.find((e) => e.country_code === code);
  return [Number(element!.latlng[0]), Number(element!.latlng[1])];
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
export const getSvgMarkerDetails = (totalCases: number) => {
  if (totalCases < 99) {
    return SVG_MARKERS[0];
  }
  if (totalCases < 9999 && totalCases > 99) {
    return SVG_MARKERS[1];
  }
  if (totalCases < 99999 && totalCases > 9999) {
    return SVG_MARKERS[2];
  }
  if (totalCases < 999999 && totalCases > 99999) {
    return SVG_MARKERS[3];
  }
  if (totalCases > 999999) {
    return SVG_MARKERS[4];
  }
  return SVG_MARKERS[1];
};

/**
 * construct FeatureCollection object
 *
 * @param {(Countries | undefined)} data
 * @return {*}
 */
export const getFeatures = (data: Countries | undefined) => {
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
