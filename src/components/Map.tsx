import { useEffect } from "react";

export default function Map() {

//   useEffect(() => {
//     loadMap().then(() => {
//       initMap();
//     });
//   }, []);

  const loadMap = () => {
    return new Promise((resolve: any) => {
      if (window.google) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=`;
        script.onload = () => {
          resolve();
        };
        document.body.appendChild(script);
      }
    });
  };

  const initMap = () => {
    let element: any = document.querySelector("#map");
    const map = new window.google.maps.Map(element, {
      center: { lat: 24.827467, lng: 60.171524 },
      zoom: 8,
    });
  };

  return (
    <div style={{ height: "1000px", width: "1000px" }}>
      <div id="map"></div>
    </div>
  );
}
