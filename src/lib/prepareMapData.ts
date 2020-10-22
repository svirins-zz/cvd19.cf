import { LatLngBoundsLiteral } from 'leaflet';
import {
  Countries, Properties, Feature,
} from '../@types';
import getCountryExtData from './calcCountry';

const getMapData = (data: Countries | undefined) => {
  const features: Feature[] = [];
  data?.countries.forEach((e) => {
    // prepare data
    const { code, flag, geometry } = getCountryExtData(e.name);
    const { confirmed, deaths, recovered } = e.results[data.countries.length - 1];
    // construct feature object
    const bounds: LatLngBoundsLiteral | undefined = undefined;
    const properties: Properties = {
      name: e.name,
      code,
      flag,
      bounds,
      confirmed,
      deaths,
      recovered,
    };
    features.push({
      type: 'Feature',
      properties,
      geometry,
    });
  });
  return {
    type: 'FeatureCollection',
    features,

  };
};

export default getMapData;
