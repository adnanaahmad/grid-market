import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { powerlineMapStyles } from './mapStyles';

export default function PowerlineMap({
  address,
  buildingId,
  centroid,
  power_line
}) {
  const history = useNavigate();
  const map = useRef(null);
  useEffect(() => {
    if (power_line) {
      const powerlineMap = new google.maps.Map(map.current, {
        center: {
          lat: centroid.lat,
          lng: centroid.lon
        },
        disableDefaultUI: true,
        fullscreenControl: true,
        gestureHandling: 'cooperative',
        styles: powerlineMapStyles,
        zoom: 18,
        zoomControl: true
      });

      const fitBounds = () => {
        const bounds = new google.maps.LatLngBounds().extend({
          lat: centroid.lat,
          lng: centroid.lon
        });
        if (power_line.power_line_closest_point) {
          bounds.extend({
            lat: power_line.power_line_closest_point[1],
            lng: power_line.power_line_closest_point[0]
          });
        }
        powerlineMap.fitBounds(bounds);
      };

      fitBounds();
      powerlineMap.data.addGeoJson({
        type: 'Feature',
        geometry: power_line.power_line_geometry,
        properties: {
          id: power_line.power_line_id,
          type: 'powerline'
        }
      });

      if (power_line.power_plant_geometry) {
        powerlineMap.data.addGeoJson({
          type: 'Feature',
          geometry: power_line.power_plant_geometry,
          properties: {
            type: 'powerplant'
          }
        });
      }

      const icon = {
        path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
        fillColor: '#55b045',
        fillOpacity: 0.9,
        anchor: new google.maps.Point(0, 0),
        labelOrigin: new google.maps.Point(0, 50),
        strokeWeight: 0,
        scale: 0.3
      };

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(centroid.lat, centroid.lon),
        map: powerlineMap,
        icon,
        zIndex: 50,
        optimized: false,
        id: buildingId,
        label: {
          color: '#333',
          fontWeight: 'bold',
          fontSize: '9px',
          text: address
        },
        labelOrigin: new google.maps.Point(29, 9)
      });
      marker.isClicked = false;

      marker.addListener('click', () => {
        if (marker.isClicked) {
          fitBounds();
        } else {
          powerlineMap.setCenter({
            lat: centroid.lat,
            lng: centroid.lon
          });
          powerlineMap.setZoom(19);
        }

        marker.isClicked = !marker.isClicked;
      });

      powerlineMap.data.addListener('click', event => {
        const { feature } = event;
        const id = feature.getProperty('id');
        history.push(`/details/${id}`);
      });

      powerlineMap.data.addListener('mouseover', event => {
        const { feature } = event;
        const type = feature.getProperty('type');
        if (type === 'building') {
          powerlineMap.data.overrideStyle(feature, {
            fillOpacity: 0.8
            // fillColor: '#00A3FF'
          });
        }
      });

      powerlineMap.data.addListener('mouseout', () => {
        powerlineMap.data.revertStyle();
      });
      if (power_line.power_line_closest_point) {
        const powerlineMarker = new google.maps.Marker({
          position: {
            lat: power_line.power_line_closest_point[1],
            lng: power_line.power_line_closest_point[0]
          },
          map: powerlineMap,
          icon,
          zIndex: 50,
          optimized: false,
          id: buildingId,
          label: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: '9px',
            text: 'Nearest Powerline'
          },
          labelOrigin: new google.maps.Point(29, 9)
        });
        powerlineMarker.isClicked = false;

        powerlineMarker.addListener('click', () => {
          if (marker.isClicked) {
            fitBounds();
          } else {
            powerlineMap.setCenter({
              lat: power_line.power_line_closest_point[1],
              lng: power_line.power_line_closest_point[0]
            });
            powerlineMap.setZoom(19);
          }

          marker.isClicked = !marker.isClicked;
        });
      }

      powerlineMap.data.setStyle(feature => {
        const id = feature.getProperty('id');
        const type = feature.getProperty('type');
        const subType = feature.getProperty('sub_type');

        const style = {
          fillColor: '#DDD',
          strokeWeight: 0,
          fillOpacity: 0.3,
          strokeOpacity: 0.3,
          clickable: true
        };

        if (id === buildingId) {
          style.fillColor = '#00A3FF';
          style.fillOpacity = 0.6;
        }

        if (type === 'powerplant') {
          style.fillColor = '#0070FF';
          style.fillOpacity = 1;
        }

        if (type === 'powerline') {
          style.strokeColor = '#04D747';
          style.fillOpacity = 1;
          style.strokeWeight = 1;
          style.fillColor = '#04D747';
          style.strokeColor = '#04D747';
          style.isClickable = false;
          style.cursor = 'initial';
          style.fillOpacity = 0;
          style.strokeOpacity = 0.6;
          style.strokeWeight = 2;

          if (id === power_line.power_line_id) {
            style.strokeOpacity = 1;
          }

          if (subType === 'minor_line') {
            style.strokeWeight = 1;
          }
        }

        return style;
      });
    }
  }, [address, buildingId, centroid, power_line]);

  return (
    <div className="details-map-container">
      <div ref={map} style={{ height: '250px', width: '100%' }} />
    </div>
  );
}
