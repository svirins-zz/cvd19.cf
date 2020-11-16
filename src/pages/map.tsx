import "leaflet/dist/leaflet.css";

import { Page, SEO } from "components/layout";
import { ATTRIBUTION_STRING } from "const";
import { myContext } from "context";
import { DivIcon } from "leaflet";
import {
  commafy,
  getCurrentZoom,
  getFeatures,
  getMarkerDetails,
  isDomAvailable,
} from "lib";
import React, { useContext, useMemo } from "react";
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

  // get zoom value, based on display width
  const { width } = useContext(myContext);
  const zoomValue = getCurrentZoom(width?.multiplyer);
  // maker markers/popups layer
  const { features } = getFeatures(data as Countries);
  const countriesMarkers = features.map((feature, index) => {
    if (!isDomAvailable()) {
      return <p>No DOM - no Map</p>;
    }
    const { name, flag, confirmed, deaths, recovered } = feature.properties;
    getMarkerDetails(confirmed);
    const icon = new DivIcon({
      html: `<div class="icon-marker ${getMarkerDetails(confirmed)}">
        <p class="marker-text">${commafy(confirmed)}</p>
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
  const displayMap = useMemo(() => {
    return (
      <MapContainer
        center={[20, 34]}
        zoom={zoomValue}
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
          {/* <LayersControl.BaseLayer checked={true} name="Stadia.Dark">
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
          </LayersControl.BaseLayer> */}
          <LayersControl.BaseLayer checked={true} name="OpenStreetMap">
            <TileLayer
              attribution={ATTRIBUTION_STRING}
              url={process.env.GATSBY_OPENSTREETMAP_STATIC_TILES_ENDPOINT!}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <LayerGroup>{countriesMarkers}</LayerGroup>
      </MapContainer>
    );
  }, [zoomValue]);

  // TODO: refactor to bounds
  return (
    <Page>
      <SEO
        title="Covid-19 pandemic map"
        description="Global map data by countries"
        pathname="/map"
      />
      <div className="leaflet-container">{displayMap}</div>
    </Page>
  );
};

export default Map;
