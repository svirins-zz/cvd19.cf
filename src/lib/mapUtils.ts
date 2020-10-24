import L, { LatLngTuple, LatLngBoundsLiteral } from 'leaflet';
import {
  Properties, Feature, Geometry, CodeFlagGeo, Countries,
} from '@types';
import { getCode } from 'country-list';
import { MISSING_COUNTRIES, ALL_COUNTRIES_DATA, VESSELS_CURRENT_COORDS } from '../const';
import vessel from '../assets/vessel.png';

const getClassByCases = (totalCases: number) => {
  if (totalCases < 99) { return 'icon-marker-small'; }
  if (totalCases < 9999 && totalCases > 99) { return 'icon-marker-normal'; }
  if (totalCases < 99999 && totalCases > 9999) { return 'icon-marker-large'; }
  if (totalCases < 999999 && totalCases > 99999) { return 'icon-marker-extra-large'; }
  if (totalCases > 999999) { return 'icon-marker-super-large'; }
  return '';
};

export function pointToLayerMarkerCreator({ featureToHtml, onClick } = {}) {
  return function (feature: Feature, latlng: LatLngTuple) {
    let html = '<span class="icon-marker"></span>';
    if (typeof featureToHtml === 'function') {
      html = featureToHtml(feature);
    }

    function onMarkerClick(e) {
      if (typeof onClick === 'function') {
        onClick(
          {
            feature,
            latlng,
          },
          e,
        );
      }
    }

    return L.marker(latlng, {
      icon: L.divIcon({
        className: 'icon',
        html,
      }),
      riseOnHover: true,
    }).on('click', onMarkerClick);
  };
}
export function promiseToFlyTo(map: L.Map, { zoom, center }: {zoom: number, center: LatLngTuple}) {
  return new Promise((resolve, reject) => {
    const baseError = 'Failed to fly to area';
    if (!map.flyTo) {
      reject(`${baseError}: no flyTo method on map`);
    }
    const mapCenter = center || map.getCenter();
    const mapZoom = zoom || map.getZoom();
    map.flyTo(mapCenter, mapZoom, {
      duration: 1,
    });

    map.once('moveend', () => {
      resolve();
    });
  });
}

export function trackerFeatureToHtmlMarker({ properties }: {properties: Properties}) {
  const {
    name, flag, confirmed, deaths, recovered,
  } = properties;
  let header = name;
  header = `<img src="${flag}" name="flag"><div>${header}</div>`;
  const stats = [
    {
      label: 'Confirmed',
      value: confirmed,
      type: 'number',
    },
    {
      label: 'Deaths',
      value: deaths,
      type: 'number',
    },
    {
      label: 'Recovered',
      value: recovered,
      type: 'number',
    },
  ];

  let statsString = '';

  stats.forEach(({ label, value }) => {
    statsString = `
      ${statsString}
      <li><strong>${label}:</strong> ${value}</li>
    `;
  });

  const casesString = stats.find(({ label }) => label === 'Confirmed')?.value;
  const iconClass = getClassByCases(confirmed);
  return `
    <span class="icon-marker ${iconClass}">
      <span class="icon-marker-tooltip">
        <h2>${header}</h2>
        <ul>${statsString}</ul>
      </span>
      ${casesString}
    </span>
  `;
}

export function geoJsonToMarkers(geoJson: L.GeoJSON, options:L.GeoJSONOptions) {
  return new L.GeoJSON(geoJson, {
    pointToLayer: pointToLayerMarkerCreator(options),
  });
}

const getMissingCode = (countryName: String): string => {
  const element = MISSING_COUNTRIES.find((el) => el.longName === countryName);
  return element!.shortName;
};

const getCoords = (code: string, name: string): LatLngTuple => {
  if (name === 'MS Zaandam' || name === 'Diamond Princess') { return VESSELS_CURRENT_COORDS[name]; }
  const element = ALL_COUNTRIES_DATA.find((e) => e.country_code === code);
  return [Number(element!.latlng[1]), Number(element!.latlng[0])];
};

export const getCountryExtData = (countryName: string): CodeFlagGeo => {
  const code = !getCode(countryName) ? getMissingCode(countryName) : getCode(countryName);
  const flag: string = code === 'VESSEL'
    ? vessel
    : `https://www.countryflags.io/${code?.toLowerCase()}/flat/64.png`;
  const geometry: Geometry = {
    type: 'Point',
    coordinates: getCoords(code ?? '', countryName),
  };
  return { code, flag, geometry };
};

export const getMapData = (data: Countries | undefined) => {
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
