import React, {useRef, useEffect} from 'react';

import './Map.css';

const Map = props => {

  const {center, zoom} = props; 

  const mapRef = useRef();

  useEffect(() => {
    // METHOD 1
    const map = new window.google.maps.Map(mapRef.current, {
      center, zoom
    });
    new window.google.maps.Marker({position: center, map: map});

    //METHOD 2
    // new window.ol.Map({
    //   target: mapRef.current.id,
    //   layers: [
    //     new window.ol.layer.Tile({
    //       source: new window.ol.source.OSM()
    //     })
    //   ],
    //   view: new window.ol.View({
    //     center: window.ol.proj.fromLonLat([center.lng, center.lat]),
    //     zoom: zoom
    //   })
    // });

  }, [center, zoom]);

  return (
    <div 
      id="map"
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    >
    </div>
  );
}

export default Map;