import React from "react";
import useSWR from "swr";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  LayerGroup,
} from "react-leaflet";
import { fetcher } from "api";
import { makeFeatures, getDataFromProperties } from "lib";
import { ATTRIBUTION_STRING } from "const";
import COUNTRY_QUERY from "queries";
import { Countries } from "@types";
import { Page, Loading, Error, SEO } from "components/layout";

import "leaflet/dist/leaflet.css";

export const Map = () => {
  // fetch countries
  const { data, error } = useSWR<Countries>(COUNTRY_QUERY, fetcher);
  if (!error && !data) return <Loading />;
  if (error) return <Error error={error} />;
  const { features } = makeFeatures(data);
  const countriesMarkers = features.map((feature, index) => {
    const {
      header,
      statsString,
      casesString,
      iconClass,
    } = getDataFromProperties(feature.properties);
    console.log(header, statsString);
    return (
      <Marker position={feature.geometry.coordinates.reverse()} key={index}>
        <Popup key={index}>
          <span className="icon-marker-tooltip">
            <h2>{header}</h2>
            <ul>{statsString}</ul>
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
          center={[0, 0]}
          zoom={3.0}
          scrollWheelZoom={false}
          minZoom={3}
          maxzoom={14}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked={true} name="Stadia">
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
