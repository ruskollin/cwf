import { useEffect } from "react";
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import "../App.css";

interface MarkerStation {
  x: number;
  y: number;
  name: string;
}

interface Props {
  selectedStation: MarkerStation;
}

const Map = ({ selectedStation }: Props) => {
  const apiKey: any = process.env.api_key;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  return (
    <div className="mapPage">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={{ lat: selectedStation.y, lng: selectedStation.x  }}
          zoom={10}
        >
          <MarkerF
            position={{ lat: selectedStation.y, lng: selectedStation.x }}
          >
            <InfoWindow
              position={{ lat: selectedStation.x, lng: selectedStation.y }}
            >
              <h2>{selectedStation.name}</h2>
            </InfoWindow>
          </MarkerF>
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
