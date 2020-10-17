import {
  Countries, CountryExt, Feature, Bounds,
} from 'types';
import getCountryExtData from './countryUtils';

const getMapData = (data: Countries | undefined) => {
  const features: Feature[] = [];
  data?.countries.forEach((e) => {
    // prepare data
    const { code, flag, geometry } = getCountryExtData(e.name);
    const { confirmed, deaths, recovered } = e.results[data.countries.length - 1];
    // construct feature object
    let bounds: Bounds;
    const properties: CountryExt = {
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
