import * as React from "react";
import { withLeaflet } from "react-leaflet";
import * as LeafletTemp from "leaflet";
import "leaflet.markercluster";
const L = LeafletTemp as any;

export interface State {}

export interface Options {
  showCoverageOnHover?: boolean;
  maxClusterRadius?: number;
  iconCreateFunction?: (cluster: any) => any;
  createClusterCustomIcon?: (cluster: any) => any;
}

export interface Props {
  markers: any[];
  leaflet: any;
  options: Options;
}

class _LeafletMarkerCluster extends React.Component<Props, {}> {
  markers: any;

  static defaultProps = {
    options: {}
  };

  addClusterLayer = () => {
    const { map } = this.props.leaflet;
    this.markers = L.markerClusterGroup(this.props.options);
    this.props.markers.forEach((marker: any) => {
      let leafletMarker: any = null;
      let markerOptions = {};
      if (marker.options) {
        markerOptions = marker.options;
      }
      leafletMarker = L.marker(marker.position, markerOptions);
      if (marker.tooltip) {
        leafletMarker.bindTooltip(marker.tooltip, { opacity: 1 }).openTooltip();
      }
      if (marker.onclick) {
        leafletMarker.on("click", marker.onclick);
      }
      this.markers.addLayer(leafletMarker);
    });
    map.addLayer(this.markers);
  };

  componentDidMount() {
    this.addClusterLayer();
  }

  componentDidUpdate(prevProps: Props) {
    const { map } = this.props.leaflet;
    map.removeLayer(this.markers);
    this.addClusterLayer();
  }

  componentWillUnmount() {
    const { map } = this.props.leaflet;
    map.removeLayer(this.markers);
  }

  render() {
    return null;
  }
}

export default withLeaflet(_LeafletMarkerCluster);
