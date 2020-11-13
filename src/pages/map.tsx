import "leaflet/dist/leaflet.css";

import { Page, SEO } from "components/layout";
import { ATTRIBUTION_STRING } from "const";
import { DivIcon } from "leaflet";
import { commafy, getFeatures, getMarkerDetails, isDomAvailable } from "lib";
import React from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import { Countries } from "@types";

const Map = ({ pageContext }: { pageContext: GatsbyTypes.SitePageContext }) => {
  // get build-time data
  const data = pageContext.data;

  // maker markers/popups layer
  const { features } = getFeatures(data as Countries);
  const countriesMarkers = features.map((feature, index) => {
    if (!isDomAvailable()) {
      return <p>No DOM - no Map</p>;
    }
    const { name, flag, confirmed, deaths, recovered } = feature.properties;
    // TODO: don't forget to cleanup after force markers work
    getMarkerDetails(confirmed);
    const icon = new DivIcon({
      html: `<div class="icon-marker ${getMarkerDetails(confirmed)}">
        <p className="markerText">${commafy(confirmed)}</p>
      </div>`,
    });
    return (
      <Marker
        key={index}
        position={feature.geometry.coordinates}
        icon={icon}
        eventHandlers={{
          click: () => {
            // process fly to
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
          minZoom={2.5}
          maxZoom={14}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          easeLinearity={0.35}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer name="Stadia.Dark">
              <TileLayer
                attribution={ATTRIBUTION_STRING}
                url={process.env.GATSBY_STADIA_DARK_STATIC_TILES_ENDPOINT!}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Stadia.Smooth">
              <TileLayer
                attribution={ATTRIBUTION_STRING}
                url={process.env.GATSBY_STADIA_STATIC_TILES_ENDPOINT!}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked={true} name="OpenStreetMap">
              <TileLayer
                attribution={ATTRIBUTION_STRING}
                url={process.env.GATSBY_OPENSTREETMAP_STATIC_TILES_ENDPOINT!}
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
