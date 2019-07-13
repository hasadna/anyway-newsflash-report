import React from "react";
import styles from "./Map.module.css";
import { Map } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LeafletMarkerCluster from "../leafletClusterMarker";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
/* This code is needed to properly load the images in the Leaflet CSS */
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

interface Props {
  newsFlashesMarkers: any[];
  leafletRef: React.Ref<any>;
}

const TempAnywayMap = (props: Props) => {
  const position = [32.0461, 34.8516] as [number, number];

  return (
    <div className={styles.mapContainer}>
      <Map
        style={{ height: "calc(100vh - 64px)", marginTop: "64px" }}
        center={position}
        zoom={12}
        maxZoom={30}
        preferCanvas={true}
        zoomControl={false}
        ref={props.leafletRef}
      >
        <ReactLeafletGoogleLayer
          googleMapsLoaderConf={{
            KEY: "AIzaSyBpOmft-UskZsAQth9vNl0fN6EXaRR6dZc",
            VERSION: "3.37"
          }}
        />
        <LeafletMarkerCluster
          options={{ maxClusterRadius: 20, showCoverageOnHover: false }}
          markers={props.newsFlashesMarkers}
        />
      </Map>
    </div>
  );
};

const AnywayMap = React.forwardRef((props: any, ref) => (
  <TempAnywayMap leafletRef={ref} {...props} />
));

export default AnywayMap;
