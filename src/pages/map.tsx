import "leaflet/dist/leaflet.css";

import { MarkerWithPopup } from "components/data";
import { Page, SEO } from "components/layout";
import { ATTRIBUTION_STRING, MAP_CENTER } from "const";
import { myContext } from "context";
import { getCurrentZoom, getFeatures, isDomAvailable } from "lib";
import React, { useContext, useMemo } from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";

import { Countries } from "@types";

const Map = ({ pageContext }: { pageContext: GatsbyTypes.SitePageContext }) => {
  const data = pageContext.data;
  if (!isDomAvailable()) {
    return <p>No DOM - no Map</p>;
  }
  const { width } = useContext(myContext);
  const zoomValue = getCurrentZoom(width?.multiplyer);
  const { features } = getFeatures(data as Countries);
  const markers = features.map((feature, index) => {
    console.log(feature, index)
    return <MarkerWithPopup feature={feature} index={index} key={index} />;
  });

  // TODO: refactor to bounds
  return (
    <Page>
      <SEO
        title="Covid-19 pandemic map"
        description="Global map data by countries"
        pathname="/map"
      />
      <div className="leaflet-container">
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
        </MapContainer>
      </div>
    </Page>
  );
};

export default Map;
