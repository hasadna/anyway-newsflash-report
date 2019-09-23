import React from 'react';
import styles from './Map.module.css';
import { Map } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LeafletMarkerCluster from '../leafletClusterMarker';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import htmlToImage from 'html-to-image';
import fileSaver from 'file-saver';
import Button from 'reactstrap/lib/Button';
import jsPDF from 'jspdf';
import { height } from '@material-ui/system';

/* This code is needed to properly load the images in the Leaflet CSS */
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

interface Props {
  newsFlashesMarkers: any[];
  leafletRef: React.Ref<any>;
}

interface State {
  mapRef: React.RefObject<HTMLInputElement>;
}

const position = [32.0461, 34.8516] as [number, number];

class TempAnywayMap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { mapRef: React.createRef() };
  }

  saveMapImage = (mapNode: any) => {
    htmlToImage
      .toPng(mapNode)
      .then(dataURL => {
        console.log(dataURL, 'fdsafsdfaasd');
        fileSaver.saveAs(dataURL, 'mapImage.png');
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div
        style={{ height: 'calc(100vh - 64px)', marginTop: '64px' }}
        ref={this.state.mapRef}
      >
        <Map
          className={styles.mapContainer}
          style={{ height: 'calc(100vh - 109px)' }}
          center={position}
          zoom={12}
          maxZoom={30}
          preferCanvas={true}
          zoomControl={false}
          ref={this.props.leafletRef}
        >
          <ReactLeafletGoogleLayer
            googleMapsLoaderConf={{
              KEY: 'AIzaSyDUIWsBLkvIUwzLHMHos9qFebyJ63hEG2M',
              VERSION: '3.37'
            }}
          />
          <LeafletMarkerCluster
            options={{ maxClusterRadius: 20, showCoverageOnHover: false }}
            markers={this.props.newsFlashesMarkers}
          />
        </Map>
        <div style={{ backgroundColor: '#3F3F3F', height: '45px' }}>
          <Button
            style={{ margin: 3 }}
            color="link"
            onClick={this.saveMapImage.bind(this, this.state.mapRef.current)}
          >
            Download as PNG
          </Button>{' '}
        </div>
      </div>
    );
  }
}

const AnywayMap = React.forwardRef((props: any, ref) => (
  <TempAnywayMap leafletRef={ref} {...props} />
));

export default AnywayMap;
