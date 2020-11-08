import React from "react";
import useSWR from "swr";
import { divIcon } from "leaflet";

import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  LayerGroup,
} from "react-leaflet";
import { fetcher } from "api";
import { getFeatures, getClassNameByCase, commafy } from "lib";
import { ATTRIBUTION_STRING } from "const";
import { COUNTRY_QUERY } from "queries";
import { Countries } from "@types";
import { Page, Loading, Error, SEO } from "components/layout";
import "leaflet/dist/leaflet.css";
import { AutoComplete } from "antd";

const Map = () => {
  // fetch countries
  const { data, error } = useSWR<Countries, Error>(COUNTRY_QUERY, fetcher);
  if (!error && !data) return <Loading />;
  if (error) return <Error error={error} />;

  // maker markers/popups layer
  const { features } = getFeatures(data);
  const countriesMarkers = features.map((feature, index) => {
    const { name, flag, confirmed, deaths, recovered } = feature.properties;
    const markerIcon = new divIcon({
      html: `<p class="markerText">${commafy(confirmed)}</p>`,
      className: `${getClassNameByCase(confirmed)} icon-marker`,
    });
    return (
      <Marker
        key={index}
        position={feature.geometry.coordinates.reverse()}
        icon={markerIcon}
        eventHandlers={{
          click: () => {
            // process fly to
            console.log("marker clicked");
          },
        }}
      >
        <Popup key={index}>
          <span>
            <img src={flag} alt="name" />
            <h2 className="title">{name}</h2>
            <ul className="marker-list">
              <li>Confirmed:&nbsp;{commafy(confirmed)}</li>
              <li>Deaths:&nbsp;{commafy(deaths)}</li>
              <li>Recovered:&nbsp;{commafy(recovered)}</li>
            </ul>
          </span>
        </Popup>
      </Marker>
    );
  });

  // TODO: memoize map, when ready
  return (
    <Page>
      <SEO title="World Map" />
      <div className="leaflet-container">
        <MapContainer
          center={[20, 10]}
          zoom={2.9}
          scrollWheelZoom={false}
          minZoom={2.5}
          maxzoom={14}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked={true} name="Stadia.Smooth">
              <TileLayer
                attribution={ATTRIBUTION_STRING}
                url={process.env.GATSBY_STADIA_STATIC_TILES_ENDPOINT}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="OpenStreetMap">
              <TileLayer
                attribution={ATTRIBUTION_STRING}
                url={process.env.GATSBY_OPENSTREETMAP_STATIC_TILES_ENDPOINT}
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          <LayerGroup>{countriesMarkers}</LayerGroup>
        </MapContainer>
      </div>
    </Page>
  );
};

export default Map;
