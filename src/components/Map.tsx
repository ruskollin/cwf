import { useState, useEffect } from "react";
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
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
  });

  useEffect(() => {
    console.log(selectedStation);
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vh" }}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={{ lat: 60.1699, lng: 24.9384 }}
          zoom={15}
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

//working
// import { useState, useEffect } from "react";
// import {
//   GoogleMap,
//   MarkerF,
//   useLoadScript,
//   InfoWindow,
// } from "@react-google-maps/api";
// import { Station } from "../types";
// import "../App.css";

// interface Props {
//   stations: Station[];
// }

// const Map = ({ stations }: Props) => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "",
//   });

//   useEffect(() => {
//    console.log(stations)
//   }, []);

//   return (
//     <div style={{ height: "100vh", width: "100vh" }}>
//       {!isLoaded ? (
//         <h1>Loading...</h1>
//       ) : (
//         <GoogleMap
//           mapContainerClassName="map-container"
//           center={{ lat: 60.1699, lng: 24.9384 }}
//           zoom={14}
//         >
//           {stations.map((marker) => (
//             <MarkerF position={{lat: marker.y, lng: marker.x}}>
//               {/* <InfoWindow position={{lat: marker.x, lng: marker.y}}><h2>{marker.Nimi}</h2></InfoWindow> */}
//               </MarkerF>
//           ))}
//         </GoogleMap>
//       )}
//     </div>
//   );
// };

// export default Map;

// import { useEffect } from "react";

// export default function Map() {

//   useEffect(() => {
//     loadMap().then(() => {
//       initMap();
//     });
//   }, []);

//   const loadMap = () => {
//     return new Promise((resolve: any) => {
//       if (window.google) {
//         resolve();
//       } else {
//         const script = document.createElement("script");
//         script.src = `https://maps.googleapis.com/maps/api/js?key=`;
//         script.onload = () => {
//           resolve();
//         };
//         document.body.appendChild(script);
//       }
//     });
//   };

//   const initMap = () => {
//     let element: any = document.querySelector("#map");
//     const map = new window.google.maps.Map(element, {
//       center: { lat: 24.827467, lng: 60.171524 },
//       zoom: 8,
//     });
//   };

//   return (
//     <div style={{ height: "1000px", width: "1000px" }}>
//       <div id="map"></div>
//     </div>
//   );
// }
