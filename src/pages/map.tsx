import "leaflet/dist/leaflet.css";

import { Page, SEO } from "components/layout";
import { ATTRIBUTION_STRING, MAP_CENTER } from "const";
import { myContext } from "context";
import { DivIcon } from "leaflet";
import {
  commafy,
  getCurrentZoom,
  getFeatures,
  getMarkerDetails,
  isDomAvailable,
} from "lib";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import { Countries } from "@types";

// function DisplayPosition() {
//   const map = useMap();
//   const [position, setPosition] = useState(map.getCenter());
//   const onMove = useCallback(() => {
//     setPosition(map.getCenter());
//   }, [map]);

//   useEffect(() => {
//     map.on("move", onMove);
//     return () => {
//       map.off("move", onMove);
//     };
//   }, [map, onMove]);
//   return null
// }

const Map = ({ pageContext }: { pageContext: GatsbyTypes.SitePageContext }) => {
  const data = pageContext.data;
  if (!isDomAvailable()) {
    return <p>No DOM - no Map</p>;
  }
  // const map = useMap()
  const { width } = useContext(myContext);
  const zoomValue = getCurrentZoom(width?.multiplyer);
  const { features } = getFeatures(data as Countries);
  const markers = features
    .sort((a, b) => b.properties.confirmed - a.properties.confirmed)
    .map((feature, index) => {
      const { name, flag, confirmed, deaths, recovered } = feature.properties;
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
              // DisplayPosition(map);
              // flyto
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
  const displayMap = useMemo(
    () => (
      <MapContainer
        center={MAP_CENTER}
        zoom={zoomValue}
        minZoom={2.5}
        maxZoom={14}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked={true} name="ArcGis.Dark">
            <TileLayer
              attribution={ATTRIBUTION_STRING}
              url={process.env.GATSBY_ARCGISONLINE_STATIC_TILES_ENDPOINT!}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap">
            <TileLayer
              attribution={ATTRIBUTION_STRING}
              url={process.env.GATSBY_OPENSTREETMAP_STATIC_TILES_ENDPOINT!}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <LayerGroup>{markers}</LayerGroup>
        {/* <DisplayPosition /> */}
      </MapContainer>
    ),
    []
  );

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
