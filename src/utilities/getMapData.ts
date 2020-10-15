import {
  Countries, CountryExt, Feature, FeatureCollection,
} from '../types';
import getCountryExtData from './countryUtils';

const getMapData = (data: Countries | undefined): FeatureCollection => {
  const features: Feature[] = [];
  data?.countries.forEach((e) => {
    // prepare data
    const { code, flag, geometry } = getCountryExtData(e.name);
    const { confirmed, deaths, recovered } = e.results[data.countries.length - 1];
    // construct feature object
    const properties: CountryExt = {
      name: e.name,
      code,
      flag,
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
